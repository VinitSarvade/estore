import {
  CartItem as PrismaCartItem,
  Product as PrismaProduct,
  ProductGroup,
  ProductSizes,
} from '@prisma/client';

export interface UserCart {
  id: number;
  userId: string;
  items: CartItem[];
  subtotal: number;
}

export interface CartItem
  extends Omit<PrismaCartItem, 'createdAt' | 'updatedAt'> {
  product: Product;
  itemTotal: number;
}

interface Product extends Pick<PrismaProduct, 'id' | 'name' | 'price'> {
  image: string;
  productGroup: Pick<ProductGroup, 'name'>;
  size: Pick<ProductSizes, 'id' | 'sizeCode' | 'size' | 'name'>;
}
