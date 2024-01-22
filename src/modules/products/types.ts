import {
  Product as PrismaProduct,
  ProductAttributes as PrismaProductAttributes,
  ProductGroup as PrismaProductGroup,
  ProductImage as PrismaProductImage,
} from '@prisma/client';

export namespace ProductListing {
  export type Products = ProductGroup[];

  export type ProductGroup = Pick<
    PrismaProductGroup,
    'id' | 'code' | 'name'
  > & { Products: Product[] };
  export type Product = Pick<PrismaProduct, 'code' | 'price' | 'salePrice'> & {
    ProductImages: ProductImage[];
    ProductAttributes: ProductAttributes[];
  };
  export type ProductImage = Pick<
    PrismaProductImage,
    'id' | 'thumbnail' | 'image'
  >;

  export type ProductAttributes = Pick<
    PrismaProductAttributes,
    'id' | 'name' | 'value'
  >;
}
