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
