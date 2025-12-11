
export interface CommitteeMember {
  name: string;
  role: string;
  description: string;
  image: string;
  isSpecial?: boolean;
}

export interface FishSpecies {
  name: string;
  scientificName: string;
  baits: string;
  minSize: string;
  maxSize?: string;
  bagLimit: string;
  image: string;
  common?: boolean;
  category: 'Estuary' | 'Reef' | 'Beach';
}

export interface ClubEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Competition' | 'Social' | 'Meeting';
  description: string;
  month: string;
  day: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  memberPrice: number;
  image: string;
  badge?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
