export type CompanyRequest = {
  id: number;
  name: string;
  imageId: number;
};

export type Company = {
  id: number;
  name: string;
  imageUrl: string
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
  id: string,
  title : string,
  imageUrl: string
}
export type Group = {
  id: number,
  name: string,
  company: Company,
  bannerImageUrl : string
  logoImageUrl: string,
  members: Artist[],
  eras : Era[]
}