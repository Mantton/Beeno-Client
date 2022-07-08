export type CompanyRequest = {
  id: number;
  name: string;
  imageId: number;
};

export type Company = {
  id: number;
  name: string;
  imageUrl: string;
};

export type IUseState<T> = Dispatch<SetStateAction<T>>;

export type Rarity = {
  id: number;
  label: string;
  points: number;
};
export type Artist = {
  id: number;
  name: string;
  imageUrl: string;
};
export type CardSet = {
  id: number;
  rarity: Rarity;
  imageUrl: string;
  created: Date;
  artists: Artist[];
};

export type Era = {
  id: number;
  title: string;
  imageUrl: string;
  group?: Group;
  collections: Collection[];
};
export type Group = {
  id: number;
  name: string;
  company: Company;
  bannerImageUrl: string;
  logoImageUrl: string;
  members: Artist[];
  eras?: Era[];
};

export type Card = {
  id: number;
  created: Date;
  rarity: Rarity;
  imageUrl: string;
  artists: Artist[];
  collectionId: number;
};

export type Collection = {
  id: number;
  title: string;
  cards: Card[];
};

export interface CardExcerpt {
  id: number;
  imageUrl: string;
  artists: Artist[];
  rarity: {
    id: number;
    label: string;
    points: number;
  };
  favorites: number;
  items: {
    total: number;
    onTradeHub: number;
    inTreasury: number;
    owned: number;
  };
}

// NEW

export interface SingleEraResponse {
  id: number;
  title: string;
  startDate: Date | null;
  group: GroupExcerpt | null;
  artist: ArtistExcerpt | null;

  imageUrl: string;
  sets: SetExcerpt[];
  cards: CardExcerpt[];
}

interface SetExcerpt {
  id: number;
  title: string;
}
export interface ArtistExcerpt {
  id: number;
  name: string;
  imageUrl: string;
}

export interface GroupExcerpt {
  id: number;
  name: string;
  logoImageUrl: string;
  bannerImageUrl: string | null;
  members: ArtistExcerpt[];
}

export interface CardExcerpt {
  id: number;
  imageUrl: string;
  artists: ArtistExcerpt[];
  rarity: Rarity;
  favorites: number;
  created: Date;
  items: {
    total: number;
    onTradeHub: number;
    inTreasury: number;
    owned: number;
  };
}
