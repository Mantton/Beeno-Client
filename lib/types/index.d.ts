export type CompanyRequest = {
  id: number;
  name: string;
  imageId: number;
};

export type Company = {
  id: number;
  name: string;
  image: {
    base: string;
  };
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
  artistIds: number[];
};
