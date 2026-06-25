export type ProductSpecification = {
  label: string;
  value: string;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  price: number;
  specs: ProductSpecification[];
};
