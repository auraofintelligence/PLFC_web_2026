
import { FishSpecies, CommitteeMember, ClubEvent, Product, GalleryItem } from './types';

export const COMMITTEE_MEMBERS: CommitteeMember[] = [
  {
    name: "Tom 'Snapper'",
    role: "President",
    description: "Founding member with 30 years of local fishing experience.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXRpEkcBCR2IqkxTqEo147SzCLJJrccw25JXEd3ckifnjpXK0snEq-PY7nF0o9k8uxcYW_C_Z9-wMpnz3YIEFidiXXzY0aB99hvYKHviXmPn-OdCtOwosIULbvcMrquanViFGHZkJwckJcfl17IM16elUTvFq_LNXJbGZyR7mJrv9hDH_LU53BEfkIZ_SdMEebEd15BDxVSQ1vL7QJG3f3QIcfPV6RxrAQeS4h0OG0t7ABj2YGDbeC_z_hv_Yk5mST4VZIOp0tIrk",
    isSpecial: true
  },
  {
    name: "Sarah Jenkins",
    role: "Vice President",
    description: "Focuses on strategic planning and community outreach programs.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwruGxW8OivVsmDQqLa7cv_tXqlcrKZ4K2frmSXt_bHTnmYh02XF58494Ze9Zoy1hAw5DeW6Y7ERdWTQlQLR8sos4jNyGEcWG4lb0U47Z3fKANZsTpekUJZyFvp3HI12YEi1IrXqp0LuUfphz8oApAYurJYj5g1XVEcFjALtBQ0oBCR6rQ0vyTgaRp04JrnXKS835EBOx0QZy6xqdacFyyx2E0pwO_x_Vuxrpux2vgfh8jdn8AdxfmWSnTy1W55n0va2LNEF55e8I",
  },
  {
    name: "Mike Ross",
    role: "Treasurer",
    description: "Ensures financial transparency and manages club assets.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWg-JzRMTK4xQKsqegrZKG3H112Z4I0N2EDxYkA46ly6S67eVCRVrsgjWHQkTI16FFbqMuISO2WnskxsOmEZ_NF_yAtIZFe94gMKW_oSF5S_-JfZZJ9lMMFExD89jdSPJiUbpucV8F1yxg8VRgRdqTNNdI_RR2kOjAgPhX40Ca84Y9lYutWS3-NSACI5fFyP6NXG315EDj2tGjuKvdUelN_J6buwBrNosbYJN1IhZvQ48xqXdNjM9yJNYhJb4PPpXZ0iXwAmYkAQ8",
  },
  {
    name: "Emma Lee",
    role: "Secretary",
    description: "Handles correspondence, meeting minutes, and regulatory filings.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBu1jrZJY6in3zhwcLAA2sWfXIPRjn5EAK6ZEXRyVXO2sM1gxI2Tmoo_YSVYbrHM3nWMUliJHQbV0mqC9qyrX917nsFyAUPkwepFFWGT_ZTeeLEBX4gw62X2-OE_KSsPOF1uGEkzCbsl-lQmZyIlxD0sPAeAZ5tMCD7gcg72vCeX0tYDFH2mUvTqPTH4G9_n9cg00TcUhcPKL1zR3h-YQ0ZlBdhlZ8VDyIuBCe9FvhXpY8jdWh3LoYvxdsqnXRDWFAxhmaXoVNsg34",
  }
];

export const FISH_SPECIES: FishSpecies[] = [
  {
    name: "Yellowfin Bream",
    scientificName: "Acanthopagrus australis",
    baits: "Prawns, Yabbies, Mullet",
    minSize: "25cm",
    bagLimit: "30",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfL1Da4zUDBAapogV7rxaFCXFLMMVPhRYyweF5uBgWacW2_dlSxr-Reagb6QBN-iywsMRwz4Ku-p9PP_DPtRdrhhms8lzupVNCtUq0-UF9QStKNnNF0d5uowb916R0fOrFAaMOK0MBmj6KCsMD1E8scC236nSdvDYWMS3ldGfm8RiZ08zOj0G4O0zNwtL22EBGANGemDz-ZfBSArSRF-7ai5VK9TBCWQwcC6fTh_4jmqHgfs5GSpOZiLk1RbTyZE7iBccmqMF_dDE",
    common: true,
    category: "Estuary"
  },
  {
    name: "Dusky Flathead",
    scientificName: "Platycephalus fuscus",
    baits: "Soft plastics, Pilchards",
    minSize: "40cm",
    maxSize: "75cm",
    bagLimit: "5",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzdzZR_m4Q0Lz39z-uT3KpydO8fF5KtE3CG3vCC_DAkJRnG-JaeC2wbbCaAL_J5ZFdrlx8-RvAplQfqBaQOgV3T-E6DR4sZ2RLKv4BkL42bv6ZVeHkFSpKBE-QkmB7qB9n-UX3kwOmtnHtj1bNBUjJxIJmOBNRIa_fB3KRk7AUP9SnvVAEJqzJBY45YO_ZwgxS1hhrwk_v31WiPU3dAW25Ud9XFchuazlfMvvURedg8npD4eaXoA8IHQ3K64PET1iUyweFONYuVUk",
    category: "Estuary"
  },
  {
    name: "Sand Whiting",
    scientificName: "Sillago ciliata",
    baits: "Bloodworms, Yabbies",
    minSize: "23cm",
    bagLimit: "30",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ9tLQWVXXW-Xxp2nrjgjNgUF6mKbV40JzCMM0Z4T7buB9slddbyPplDrASD-EqvU8kCGSSbpQ5rwGk0YG1KSTj6T1amaWKmuRIo-FZ19UuH4FhhuPLHTuHfmYtKw59ftJ9pbGFo97XZoS05PdAcysvJ6M-AJl2wTrsRilJNCmFL27r8gvv8GPn3g3KdAjwvlLfOI1KcRUW1oNKPWOQLFvp9UqxnxTmhobqFWlB21TJaPmRjym670NC_B5Yt85UZrVqhZgLXQIOnk",
    category: "Beach"
  },
  {
    name: "Tailor",
    scientificName: "Pomatomus saltatrix",
    baits: "Pilchards, Metal Lures",
    minSize: "35cm",
    bagLimit: "20",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAV6Gjow6r8X2TThKnaOuS8XGQKFy1_MLoQQPnytPimOOLAufCldoJA9GB4JauU4W5YtQMDzcLN6IXa7Npp9yyFDZ_wHLio3eoTw31jRYqwpDNg8EjYxI-nBLYr8sWgFuYUrrnsYWQBlCTdUXgF5gj6iUcrKfQNyosSNDSK3vLWks_uuwIA3S2vTJ6UA1L44cEty16DGCuf6scQhAkJtXiMvbcv7x_dLa1VuPMio80AsJrEMzLSasmFZu1Q69vUf3YOrE8Hvxx7lIo",
    category: "Beach"
  }
];

export const EVENTS: ClubEvent[] = [
  {
    id: "1",
    title: "Straddie Classic Fishing Comp",
    date: "2024-10-14",
    time: "6:00 AM - 4:00 PM",
    location: "Point Lookout Boat Ramp",
    category: "Competition",
    description: "Targeted species: Snapper, Mackerel. Major Prizes!",
    month: "Oct",
    day: "14-15"
  },
  {
    id: "2",
    title: "Monthly Club General Meeting",
    date: "2024-10-25",
    time: "7:00 PM - 8:30 PM",
    location: "Clubhouse, Cylinder Beach",
    category: "Meeting",
    description: "Discussing upcoming summer events and maintenance.",
    month: "Oct",
    day: "25"
  },
  {
    id: "3",
    title: "Beach BBQ & Bonfire Social",
    date: "2024-11-11",
    time: "5:00 PM - 9:00 PM",
    location: "Main Beach, Point Lookout",
    category: "Social",
    description: "Family-friendly evening, bring a plate!",
    month: "Nov",
    day: "11"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Classic Club Tee",
    category: "Apparel",
    price: 29.99,
    memberPrice: 24.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAluWRdrFW0CRLRF44H5n7pIOcxTU6-6NKcnzik7LXe4qVvMYxPZpwbAKo3IWDIJp_7CMCOTK1t7V2yxk6U0FSmC2fEjp2nuT288b0HLDkHlZvpIFA_NsDagZdkc7NsbCl73YBSthgk3GsrKfnO7MzYWAeyP0GCPBYij8iArj5iO65yiw3VPIFp8dMHkkgMRL48FOp9nrTSi3lyQwU_gmFp66HtVBg4zRql4vQtn3tH5WI9kC-pfWjqdBICpqr1zpTEu7-YU7Qn9jI",
    badge: "Best Seller"
  },
  {
    id: "p2",
    name: "Logo Hoodie",
    category: "Apparel",
    price: 59.99,
    memberPrice: 49.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQOAiSbbR1hM8dB411J6WIk_2jAsLYdfhu_jnqia698WMVgwwRG9fPRNBFkGe1cTP2M_XlV69IqHSQJgLk9PAL6zKxvPFpVcNBjlFukA_Pf5Cg1Kllh1N1up_tfdm6SWVqIw7CvkQ8nsVOT8F3DgZHBO2maaY31fevtfDeefu8y1j47iRNhg9jw1KcQn_OCms1RPwperzW4WaoJpWal_1hgjginJV-c4X3Ni4c_hXHQHF5zVmEAXlWMWJz6b0MyssfHSzej6Y8gUs"
  },
  {
    id: "p3",
    name: "Performance Shade Hat",
    category: "Headwear",
    price: 34.99,
    memberPrice: 29.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC5L4919xtpLlKI9QpIrhANsPFoWA7gi-hJ89h1Ix0ao6vj-Gu_krm7FnsbKWRyaD_yu1EcbseEIMFiysJ_ChV-gaTPTbA2-O9VnpvCkm3i-tYwlVF2-SMCbjN1wAk5FEpKTYfaHeX-kfvv9tKIBaHzcbfuXLFeoCBcl19q1-SjQQQQH655TQTNLXaospqGeLxjwKf4O_EDFA3vTI6lKFSfIJKc4eAxNdZNAe3z-jj-LBp2jRGLNN7Klc95DeDiHO0VUImJR3nJKc",
    badge: "Low Stock"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g1", title: "Annual Reef Competition 2023", category: "Competitions", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyy1THcr4xUjsxdOHNAc1Feu-TFQ5s11oc--MXCu13ORat5z5Dfu1U5lc0o5snU5PTps8t3193z2zj4QrnkTrFEru7AbJTEuyjagZpypjDKXvzGDK6gS09Q9EgQ9b2IvcAG0TudmSTEgyblm0peM7qijcU9l0hrGFekBbORAb3iGoGBqQtlfkhiDjr9PiQH3jRg5h6co7xFkneIW_ywlIy3BIngrxO0RqvD3jltV7BDJRGFkoaxjTWFM6khQw8_Dm0uwyPqwZO8qY" },
  { id: "g2", title: "Family BBQ Day", category: "Social Events", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZi-ySg52U30Hoi5qZTxoTV5z2-y1cUL3R584JnBc_HCLqAPuP5XyTXXI09_JAdeTOD_8Ywgrp9ef_aK1ARGR-wCUT4Juk2L8D93XJUdjfp3XzSZAYBWQ2Fsa9gqwWJEH22RomF3T3un_5mWRQRtxeeFyiYwkFmLwtj7BFnKr_d1_UBA-cQSFM27d4UynoWe8yHscbSUvaaemmIQfZF2Z4BF0BaNldr7CyBNeyqx_AaaTffwLojtoSC_kfKRh4imkzd4HUaeE5hIo" },
  { id: "g3", title: "Monster Snapper - NSI", category: "Fish Catches", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcrsOJ_8ArwW80Ig1DsVNH-JZcNIRP_JG9EzECqwdMl8lhgE7qp1F8tSeEzOB1mgWAPRjckTns8OZCO1bA-U5L99WUTGlzBdtFqYpDVgNNYGKkF4Pz1uM3t-7ar1IolSOjXDlM0pcFBl7N4ehe63l-t_3saoTVL8Hd2_49_tyu8bu_9fHFOjomo8ZeijFDFWneMcDbzUzRvgBi8DYR-XIPmVwUjTXbUV9DcxJcxvxSQs6bYGS20udYuICmpMAUX4XOriG_okEULxY" }
];
