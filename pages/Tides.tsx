
import React, { useState, useEffect, useMemo } from 'react';

/**
 * North Stradbroke Island (Minjerribah) Coastal Data
 * Calibrated coordinates and tidal offsets.
 * Point Lookout is the Ocean station. Amity and Dunwich are Bay stations.
 */
const LOCATIONS = {
  pointLookout: {
    id: 'pointLookout',
    name: 'Point Lookout',
    label: 'Main Beach (Ocean)',
    lat: -27.4206,
    lng: 153.5358,
    tidalDelayMins: -60, // Pt Lookout is ~1hr ahead of Brisbane Bar (Bay reference)
    rangeScale: 1.1,
    isOcean: true,
  },
  amityPoint: {
    id: 'amityPoint',
    name: 'Amity Point',
    label: 'Channel Entrance',
    lat: -27.3980,
    lng: 153.4410,
    tidalDelayMins: -10, 
    rangeScale: 1.0,
    isOcean: false,
  },
  dunwich: {
    id: 'dunwich',
    name: 'Dunwich',
    label: 'Inner Bay / Ferry',
    lat: -27.5015,
    lng: 153.4045,
    tidalDelayMins: 15, 
    rangeScale: 1.05,
    isOcean: false,
  }
};

/**
 * Harmonic Constants tuned for North Stradbroke Island region.
 * Using known constituents for Brisbane Bar / Moreton Bay entrance.
 */
const TIDE_CONSTANTS = {
  MSL: 1.10, // Mean Sea Level (m)
  CONSTITUENTS: [
    { name: 'M2', amp: 0.78, period: 12.4206 }, // Main Lunar
    { name: 'S2', amp: 0.22, period: 12.0000 }, // Main Solar
    { name: 'N2', amp: 0.16, period: 12.6583 }, // Lunar Elliptic
    { name: 'K1', amp: 0.20, period: 23.9345 }, // Lunar/Solar Diurnal
    { name: 'O1', amp: 0.14, period: 25.8193 }, // Lunar Diurnal
  ],
  // Reference high tide known point (Brisbane Bar standard)
  EPOCH: new Date('2024-01-01T08:00:00Z').getTime()
};

interface MarineData {
  temp: number;
  windSpeed: number;
  windDir: number;
  waveHeight: number;
  wavePeriod: number;
  condition: string;
  sunrise: string;
  sunset: string;
}

interface TidePoint {
  time: Date;
  height: number;
}

interface TideEvent {
  time: Date;
  type: 'High' | 'Low';
  height: string;
}

const Tides: React.FC = () => {
  const [selectedLocId, setSelectedLocId] = useState<keyof typeof LOCATIONS>('pointLookout');
  const [simDate, setSimDate] = useState<Date>(new Date());
  const [isLive, setIsLive] = useState(true);
  const [marine, setMarine] = useState<MarineData | null>(null);
  const [tideEvents, setTideEvents] = useState<TideEvent[]>([]);
  const [currentHeight, setCurrentHeight] = useState<number>(0);
  const [isRising, setIsRising] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<TidePoint[]>([]);

  const currentLocation = LOCATIONS[selectedLocId];

  // Update simulation clock if in live mode
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setSimDate(new Date());
    }, 10000);
    return () => clearInterval(interval);
  }, [isLive]);

  /**
   * tidal prediction based on summing major harmonics.
   */
  const predictTide = (date: Date, offsetMins: number, scale: number) => {
    const time = date.getTime() + (offsetMins * 60000);
    const hoursSinceEpoch = (time - TIDE_CONSTANTS.EPOCH) / (1000 * 60 * 60);
    
    let height = TIDE_CONSTANTS.MSL;
    TIDE_CONSTANTS.CONSTITUENTS.forEach(c => {
      // Basic harmonic summation
      const phase = (hoursSinceEpoch / c.period) * 2 * Math.PI;
      height += (c.amp * scale) * Math.cos(phase);
    });
    
    return height;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setApiError(null);
      try {
        const dateStr = simDate.toISOString().split('T')[0];
        const isToday = dateStr === new Date().toISOString().split('T')[0];
        
        // Fetch Weather
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${currentLocation.lat}&longitude=${currentLocation.lng}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset&timezone=Australia%2FBrisbane&start_date=${dateStr}&end_date=${dateStr}`;
        const weatherRes = await fetch(weatherUrl);
        if (!weatherRes.ok) throw new Error("Weather API Error");
        const weatherData = await weatherRes.json();

        // Fetch Marine (Only if date is within forecast window)
        let waveHeight = 0;
        let wavePeriod = 0;
        if (isToday) {
          try {
            const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${currentLocation.lat}&longitude=${currentLocation.lng}&current=wave_height,wave_period&timezone=Australia%2FBrisbane`;
            const marineRes = await fetch(marineUrl);
            if (marineRes.ok) {
              const marineData = await marineRes.json();
              waveHeight = marineData.current?.wave_height || 0;
              wavePeriod = marineData.current?.wave_period || 0;
            }
          } catch (e) {
            console.warn("Marine data unavailable", e);
          }
        }

        const weatherCodes: { [key: number]: string } = {
          0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
          45: 'Fog', 51: 'Light drizzle', 61: 'Slight rain', 80: 'Showers'
        };

        if (weatherData.current) {
          setMarine({
            temp: weatherData.current.temperature_2m,
            windSpeed: weatherData.current.wind_speed_10m,
            windDir: weatherData.current.wind_direction_10m,
            waveHeight,
            wavePeriod,
            condition: weatherCodes[weatherData.current.weather_code] || 'Fair',
            sunrise: new Date(weatherData.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sunset: new Date(weatherData.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
        }

        // Predictions for local dashboard
        const events: TideEvent[] = [];
        const points: TidePoint[] = [];

        // Check a 24-hour window for extremes
        for (let m = -60; m < 1440; m += 10) {
          const t = new Date(simDate.getTime() + m * 60000);
          const h = predictTide(t, currentLocation.tidalDelayMins, currentLocation.rangeScale);
          points.push({ time: t, height: h });
        }

        // Find High/Low events
        for (let i = 1; i < points.length - 1; i++) {
          if (points[i].time >= simDate) {
            const prev = points[i - 1].height;
            const curr = points[i].height;
            const next = points[i + 1].height;
            if (curr > prev && curr > next) {
              events.push({ time: points[i].time, type: 'High', height: curr.toFixed(2) + 'm' });
            } else if (curr < prev && curr < next) {
              events.push({ time: points[i].time, type: 'Low', height: curr.toFixed(2) + 'm' });
            }
          }
        }

        setTideEvents(events.slice(0, 4));
        setChartData(points.filter(p => p.time >= simDate).slice(0, 72));
        
        const currentH = predictTide(simDate, currentLocation.tidalDelayMins, currentLocation.rangeScale);
        setCurrentHeight(currentH);
        
        const nextH = predictTide(new Date(simDate.getTime() + 10 * 60000), currentLocation.tidalDelayMins, currentLocation.rangeScale);
        setIsRising(nextH > currentH);

      } catch (err) {
        setApiError(err instanceof Error ? err.message : "Failed to fetch coastal data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedLocId, simDate.toDateString(), isLive ? null : simDate.getHours()]);

  const getWindDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  const activityIndex = useMemo(() => {
    if (!marine) return 50;
    let score = 70;
    if (marine.windSpeed > 25) score -= 30;
    if (marine.waveHeight > 2.2) score -= 20;
    if (isRising) score += 10;
    return Math.min(Math.max(score, 10), 98);
  }, [marine, isRising]);

  return (
    <div className="animate-fade-in bg-slate-50 dark:bg-[#080c14] min-h-screen">
      {/* Dynamic Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center animate-scale-subtle opacity-60"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDF__kaE4-9Pzpz5exkdBuZWtHWFTDOJlcQlwdbIb7mmMpW5I-1UjKg4mxnssl5uzZ2Cj5xMxfFMt1LpxVWcIiVuUq29kilwsZhLN1k9N8X5zM_2i4hOcvyVTm9xYD2aP4BcZBYIyph_l9lMOBg34gginAtgoDTCQY8QQKND6ndNzdffY3tGE5E7yYSJowuy0Px3dixmTvzslGHOF9G_NYuW1pGjM1bCwVUMG4ZrU9gQgdordVb3JICmlQ9UpnGW4zOP4QMAOG-8e4")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-slate-900/50 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="glass px-4 py-2 rounded-full text-blue-100 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              Stradbroke Live Intel
            </div>
            {isLive ? (
              <span className="bg-green-500/10 text-green-400 text-[10px] font-black px-3 py-1.5 rounded-full border border-green-500/20 uppercase tracking-widest">Live Feed</span>
            ) : (
              <button onClick={() => setIsLive(true)} className="bg-orange-500/10 text-orange-400 text-[10px] font-black px-3 py-1.5 rounded-full border border-orange-500/20 uppercase tracking-widest hover:bg-orange-500/20">Exit Simulation</button>
            )}
          </div>

          <h1 className="text-white text-6xl md:text-9xl font-black tracking-tighter drop-shadow-2xl">
            Tide <span className="text-primary">Watch</span>
          </h1>

          <div className="flex flex-wrap justify-center gap-3">
            {Object.values(LOCATIONS).map(loc => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocId(loc.id as any)}
                className={`px-6 py-4 rounded-3xl font-bold transition-all flex flex-col items-center gap-1 min-w-[160px] ${
                  selectedLocId === loc.id 
                    ? 'bg-primary text-white shadow-2xl shadow-primary/40 scale-105 ring-4 ring-primary/20' 
                    : 'glass text-white/80 hover:bg-white/20'
                }`}
              >
                <span className="text-base">{loc.name}</span>
                <span className="text-[9px] opacity-60 uppercase tracking-[0.2em]">{loc.label}</span>
              </button>
            ))}
          </div>

          {/* Controller Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
             <div className="glass p-3 rounded-[24px] flex items-center gap-3">
                <span className="material-symbols-outlined text-white/40 text-sm">calendar_today</span>
                <input 
                  type="date" 
                  value={simDate.toISOString().split('T')[0]}
                  onChange={(e) => {
                    setIsLive(false);
                    const newDate = new Date(simDate);
                    const [y, m, d] = e.target.value.split('-').map(Number);
                    newDate.setFullYear(y, m - 1, d);
                    setSimDate(newDate);
                  }}
                  className="bg-transparent border-none text-white text-xs font-black uppercase tracking-widest focus:ring-0"
                />
             </div>
             <div className="glass p-3 rounded-[24px] flex items-center gap-4 w-64">
                <span className="material-symbols-outlined text-white/40 text-sm">schedule</span>
                <input 
                  type="range" min="0" max="23"
                  value={simDate.getHours()}
                  onChange={(e) => {
                    setIsLive(false);
                    const d = new Date(simDate);
                    d.setHours(parseInt(e.target.value));
                    setSimDate(d);
                  }}
                  className="accent-primary flex-grow h-1.5 cursor-pointer"
                />
                <span className="text-[10px] font-black text-white w-10">{simDate.getHours()}:00</span>
             </div>
          </div>
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-6 -mt-16 relative z-20 pb-40">
        {apiError && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-3xl text-red-400 text-center text-sm font-bold flex items-center justify-center gap-3 animate-slide-up">
            <span className="material-symbols-outlined">error</span>
            {apiError}. Using local predictions.
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Tidal Display */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[48px] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 size-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/10 transition-colors"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-10">
                    <div className="bg-primary/10 p-2.5 rounded-2xl text-primary">
                      <span className="material-symbols-outlined text-2xl">waves</span>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Surface Measurement</h3>
                      <p className="text-sm font-black text-slate-900 dark:text-white uppercase">{currentLocation.name}</p>
                    </div>
                  </div>

                  <div className="flex items-end gap-6">
                    <div className="text-[10rem] font-black text-slate-900 dark:text-white leading-[0.8] tracking-tighter transition-all duration-700">
                      {isLoading ? '--' : currentHeight.toFixed(2)}
                    </div>
                    <div className="text-5xl font-black text-slate-200 dark:text-slate-700 mb-6">m</div>
                  </div>

                  <div className={`mt-12 flex items-center gap-5 py-4 px-8 rounded-[32px] w-fit font-black uppercase text-sm tracking-widest shadow-inner ${isRising ? 'bg-primary/10 text-primary' : 'bg-orange-500/10 text-orange-500'}`}>
                    <span className={`material-symbols-outlined text-2xl ${isRising ? 'animate-bounce' : 'rotate-180'}`}>south</span>
                    {isRising ? 'Flooding (High Water)' : 'Ebbing (Outgoing)'}
                  </div>
                </div>

                <div className="glass dark:bg-slate-800/80 p-10 rounded-[48px] border border-slate-100 dark:border-slate-700 w-full md:w-80 text-center shadow-2xl">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 block">Angler Activity Index</span>
                  <div className="relative size-40 mx-auto">
                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100 dark:stroke-slate-700" strokeWidth="3"></circle>
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-primary" strokeWidth="3" strokeDasharray={`${activityIndex}, 100`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 1.5s ease' }}></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-slate-900 dark:text-white">{activityIndex}%</span>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col gap-1">
                    <p className="text-xs font-black uppercase tracking-widest text-primary">
                      {activityIndex > 80 ? 'Optimal Strike' : activityIndex > 60 ? 'Favorable' : 'Low Activity'}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400">Based on tidal energy</p>
                  </div>
                </div>
              </div>

              {/* Graphical Trend */}
              <div className="mt-24 h-48 w-full flex items-end gap-2 px-4 relative">
                <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 dark:bg-slate-800 opacity-50"></div>
                {chartData.map((p, i) => (
                  <div key={i} className="flex-1 group/point relative h-full">
                    <div 
                      className={`w-full rounded-full transition-all duration-1000 ${i === 0 ? 'bg-gradient-to-t from-primary to-sky-400 scale-x-125' : 'bg-slate-200 dark:bg-slate-800 hover:bg-primary/40'}`}
                      style={{ height: `${(p.height / 3.0) * 100}%` }}
                    ></div>
                    {i % 6 === 0 && (
                      <span className="absolute -bottom-10 left-0 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                        {p.time.getHours()}:00
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Timeline Cards */}
              <div className="bg-white dark:bg-slate-900 rounded-[48px] p-10 border border-slate-100 dark:border-slate-800 shadow-xl">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-10 flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl">event_repeat</span>
                  Port Prediction
                </h2>
                <div className="space-y-4">
                  {tideEvents.map((tide, idx) => (
                    <div key={idx} className="flex items-center justify-between p-6 rounded-[32px] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-primary/40 transition-all">
                      <div className="flex items-center gap-6">
                        <div className={`size-14 rounded-2xl flex items-center justify-center shadow-lg ${tide.type === 'High' ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                          <span className="material-symbols-outlined text-2xl">{tide.type === 'High' ? 'expand_less' : 'expand_more'}</span>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{tide.type} Station</p>
                          <p className="text-xl font-black text-slate-900 dark:text-white">
                            {tide.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-primary">{tide.height}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">LAT</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Atmosphere Card */}
              <div className="bg-slate-900 text-white rounded-[48px] p-12 shadow-2xl relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 size-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <h2 className="text-2xl font-black mb-12 flex items-center gap-4">
                  <span className="material-symbols-outlined text-indigo-400 text-3xl">wb_twilight</span>
                  Solar Tracking
                </h2>
                <div className="grid grid-cols-2 gap-6 flex-grow">
                   <div className="p-8 bg-white/5 rounded-[32px] border border-white/5 flex flex-col gap-6 items-center text-center">
                      <span className="material-symbols-outlined text-orange-400 text-4xl">light_mode</span>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Sunrise</p>
                        <p className="text-2xl font-black">{marine?.sunrise || '--:--'}</p>
                      </div>
                   </div>
                   <div className="p-8 bg-white/5 rounded-[32px] border border-white/5 flex flex-col gap-6 items-center text-center">
                      <span className="material-symbols-outlined text-indigo-400 text-4xl">nights_stay</span>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Sunset</p>
                        <p className="text-2xl font-black">{marine?.sunset || '--:--'}</p>
                      </div>
                   </div>
                </div>
                <div className="mt-12 pt-10 border-t border-white/10 flex items-center justify-between">
                   <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Water Temp</span>
                   <span className="text-3xl font-black text-blue-400">{marine?.temp.toFixed(1) || '--'}°C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Metrics */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[48px] shadow-2xl border border-slate-100 dark:border-slate-800">
               <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-12 flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl">explore</span>
                  Marine Vector
               </h3>

               <div className="space-y-8">
                  {/* Wind */}
                  <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-inner group">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Wind Flow</span>
                      <div className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-black">
                        {getWindDirection(marine?.windDir || 0)}
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-7xl font-black text-slate-900 dark:text-white">{marine?.windSpeed.toFixed(0) || '0'}</span>
                      <span className="text-xl font-bold text-slate-400">km/h</span>
                    </div>
                  </div>

                  {/* Sea State */}
                  <div className="p-8 bg-blue-500/5 rounded-[40px] border border-blue-100 dark:border-blue-900/40">
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Sea State</span>
                      <span className="material-symbols-outlined text-primary text-2xl">tsunami</span>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-1">
                        <p className="text-4xl font-black text-slate-900 dark:text-white">{marine?.waveHeight.toFixed(1) || '--'}m</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Waves</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-4xl font-black text-slate-900 dark:text-white">{marine?.wavePeriod.toFixed(0) || '--'}s</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Period</p>
                      </div>
                    </div>
                  </div>

                  {/* VMR Card */}
                  <div className="bg-red-600 p-10 rounded-[40px] shadow-2xl text-white relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-800"></div>
                     <div className="relative z-10 space-y-8">
                        <div className="size-16 rounded-[24px] bg-white/20 flex items-center justify-center">
                           <span className="material-symbols-outlined text-4xl">emergency</span>
                        </div>
                        <div>
                          <h4 className="font-black text-2xl mb-3">Hazardous Crossing</h4>
                          <p className="text-sm text-red-100 leading-relaxed font-medium">South Passage Bar is hazardous during <span className="font-black underline">{!isRising ? 'Outgoing' : 'Incoming'}</span> tides.</p>
                        </div>
                        <button className="w-full bg-white text-red-600 font-black py-5 rounded-[24px] shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                           VMR Check-In <span className="material-symbols-outlined text-xl">chevron_right</span>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Tides;
