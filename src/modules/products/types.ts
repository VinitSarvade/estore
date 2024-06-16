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

  export type Product = Pick<
    PrismaProduct,
    'code' | 'name' | 'price' | 'salePrice'
  > & {
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

export enum ErrorType {
  AUTH_ERROR = 'AUTH_ERROR',
  CART_NOT_FOUND = 'CART_NOT_FOUND',
}
