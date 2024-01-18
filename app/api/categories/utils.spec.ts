import { Category } from '@prisma/client';
import { describe, expect, it } from 'vitest';

import { buildNestedStructure } from './utils';

describe('buildNestedStructure', () => {
  it('should build nested structure correctly', () => {
    const categories = [
      {
        name: 'Women',
        value: 'ladies',
        path: 'ladies',
      },
      {
        name: 'New Arrivals',
        value: 'new-arrivals',
        path: 'ladies/new-arrivals',
      },
      {
        name: 'View All',
        value: 'view-all',
        path: 'ladies/new-arrivals/view-all',
      },
      {
        name: 'Clothes',
        value: 'clothes',
        path: 'ladies/new-arrivals/clothes',
      },
      {
        name: 'Shoes & Accessories',
        value: 'shoes-accessories',
        path: 'ladies/new-arrivals/shoes-accessories',
      },
      {
        name: 'Beauty',
        value: 'beauty',
        path: 'ladies/new-arrivals/beauty',
      },
      {
        name: 'Underwear & Nightwear',
        value: 'underwear-nightwear',
        path: 'ladies/new-arrivals/underwear-nightwear',
      },
      {
        name: 'Trending Now',
        value: 'seasonal-trending',
        path: 'ladies/seasonal-trending',
      },
      {
        name: 'Shop by Occasion',
        value: 'occasion',
        path: 'ladies/occasion',
      },
      {
        name: 'Offers',
        value: 'deals',
        path: 'ladies/deals',
      },
      {
        name: 'Shop by Product',
        value: 'shop-by-product',
        path: 'ladies/shop-by-product',
      },
      {
        name: 'View All',
        value: 'view-all',
        path: 'ladies/shop-by-product/view-all',
      },
      {
        name: 'Plus Sizes',
        value: 'hm-plus',
        path: 'ladies/shop-by-product/hm-plus',
      },
      {
        name: 'New Arrivals',
        value: 'new-arrivals',
        path: 'ladies/shop-by-product/hm-plus/new-arrivals',
      },
      {
        name: 'Skirts',
        value: 'skirts',
        path: 'ladies/shop-by-product/hm-plus/skirts',
      },
      {
        name: 'Shorts',
        value: 'shorts',
        path: 'ladies/shop-by-product/hm-plus/shorts',
      },
      {
        name: 'Tops',
        value: 'tops',
        path: 'ladies/shop-by-product/hm-plus/tops',
      },
      {
        name: 'T-Shirts',
        value: 't-shirts',
        path: 'ladies/shop-by-product/hm-plus/tops/t-shirts',
      },
      {
        name: 'Jeans',
        value: 'jeans',
        path: 'ladies/shop-by-product/hm-plus/jeans',
      },
      {
        name: 'Dresses',
        value: 'dresses',
        path: 'ladies/shop-by-product/hm-plus/dresses',
      },
      {
        name: 'Long Sleeve',
        value: 'long-sleeved-dresses',
        path: 'ladies/shop-by-product/hm-plus/dresses/long-sleeved-dresses',
      },
      {
        name: 'Sportswear',
        value: 'sport',
        path: 'ladies/shop-by-product/hm-plus/sport',
      },
      {
        name: 'Lingerie & Tights',
        value: 'lingerie-and-tights',
        path: 'ladies/shop-by-product/hm-plus/lingerie-and-tights',
      },
      {
        name: 'Cardigans & Sweaters',
        value: 'cardigans-jumpers',
        path: 'ladies/shop-by-product/hm-plus/cardigans-jumpers',
      },
      {
        name: 'Shirts & Blouses',
        value: 'shirts-blouses',
        path: 'ladies/shop-by-product/hm-plus/shirts-blouses',
      },
      {
        name: 'Jackets & Coats',
        value: 'jackets-coats',
        path: 'ladies/shop-by-product/hm-plus/jackets-coats',
      },
      {
        name: 'Pants & Leggings',
        value: 'trousers-leggings',
        path: 'ladies/shop-by-product/hm-plus/trousers-leggings',
      },
      {
        name: 'Sleepwear & Loungewear',
        value: 'nightwear-loungewear',
        path: 'ladies/shop-by-product/hm-plus/nightwear-loungewear',
      },
      {
        name: 'Occasion Wear',
        value: 'occasionwear',
        path: 'ladies/shop-by-product/hm-plus/occasionwear',
      },
      {
        name: 'Premium Selection',
        value: 'premium-selection',
        path: 'ladies/shop-by-product/premium-selection',
      },
      {
        name: 'Tops',
        value: 'tops',
        path: 'ladies/shop-by-product/premium-selection/tops',
      },
      {
        name: 'Shoes',
        value: 'shoes',
        path: 'ladies/shop-by-product/premium-selection/shoes',
      },
      {
        name: 'Jackets & Coats',
        value: 'jackets-coats',
        path: 'ladies/shop-by-product/premium-selection/jackets-coats',
      },
      {
        name: 'Dresses',
        value: 'dresses',
        path: 'ladies/shop-by-product/premium-selection/dresses',
      },
      {
        name: 'Cardigans & Jumpers',
        value: 'cardigans-jumpers',
        path: 'ladies/shop-by-product/premium-selection/cardigans-jumpers',
      },
      {
        name: 'Bottoms',
        value: 'bottoms',
        path: 'ladies/shop-by-product/premium-selection/bottoms',
      },
      {
        name: 'Accessories',
        value: 'accessories',
        path: 'ladies/shop-by-product/premium-selection/accessories',
      },
      {
        name: 'Dresses',
        value: 'dresses',
        path: 'ladies/shop-by-product/dresses',
      },
      {
        name: 'Cut-Out Dresses',
        value: 'cutout-dresses',
        path: 'ladies/shop-by-product/dresses/cutout-dresses',
      },
      {
        name: 'Sleeveless Dresses',
        value: 'sleeveless-dresses',
        path: 'ladies/shop-by-product/dresses/sleeveless-dresses',
      },
      {
        name: 'Puff-Sleeve Dresses',
        value: 'puffsleeve-dresses',
        path: 'ladies/shop-by-product/dresses/puffsleeve-dresses',
      },
      {
        name: 'Halter Dresses',
        value: 'halterneck-dresses',
        path: 'ladies/shop-by-product/dresses/halterneck-dresses',
      },
      {
        name: 'Wedding Guest Dresses',
        value: 'wedding-guest-dresses',
        path: 'ladies/shop-by-product/dresses/wedding-guest-dresses',
      },
      {
        name: 'A-line Dresses',
        value: 'a-line-dresses',
        path: 'ladies/shop-by-product/dresses/a-line-dresses',
      },
      {
        name: 'Cami Dresses',
        value: 'cami-dresses',
        path: 'ladies/shop-by-product/dresses/cami-dresses',
      },
      {
        name: 'Knit Dresses',
        value: 'knitted-dresses',
        path: 'ladies/shop-by-product/dresses/knitted-dresses',
      },
      {
        name: 'Long Sleeve Dresses',
        value: 'long-sleeve',
        path: 'ladies/shop-by-product/dresses/long-sleeve',
      },
      {
        name: 'Linen Dresses',
        value: 'linen',
        path: 'ladies/shop-by-product/dresses/linen',
      },
      {
        name: 'T-Shirt Dresses',
        value: 't-shirt-dresses',
        path: 'ladies/shop-by-product/dresses/t-shirt-dresses',
      },
      {
        name: 'Denim Dresses',
        value: 'denim',
        path: 'ladies/shop-by-product/dresses/denim',
      },
    ] as Category[];

    const expectedNestedStructure = [
      {
        name: 'Women',
        value: 'ladies',
        path: 'ladies',
        subCategories: [
          {
            name: 'New Arrivals',
            value: 'new-arrivals',
            path: 'ladies/new-arrivals',
            subCategories: [
              {
                name: 'View All',
                value: 'view-all',
                path: 'ladies/new-arrivals/view-all',
                subCategories: [],
              },
              {
                name: 'Clothes',
                value: 'clothes',
                path: 'ladies/new-arrivals/clothes',
                subCategories: [],
              },
              {
                name: 'Shoes & Accessories',
                value: 'shoes-accessories',
                path: 'ladies/new-arrivals/shoes-accessories',
                subCategories: [],
              },
              {
                name: 'Beauty',
                value: 'beauty',
                path: 'ladies/new-arrivals/beauty',
                subCategories: [],
              },
              {
                name: 'Underwear & Nightwear',
                value: 'underwear-nightwear',
                path: 'ladies/new-arrivals/underwear-nightwear',
                subCategories: [],
              },
            ],
          },
          {
            name: 'Trending Now',
            value: 'seasonal-trending',
            path: 'ladies/seasonal-trending',
            subCategories: [],
          },
          {
            name: 'Shop by Occasion',
            value: 'occasion',
            path: 'ladies/occasion',
            subCategories: [],
          },
          {
            name: 'Offers',
            value: 'deals',
            path: 'ladies/deals',
            subCategories: [],
          },
          {
            name: 'Shop by Product',
            value: 'shop-by-product',
            path: 'ladies/shop-by-product',
            subCategories: [
              {
                name: 'View All',
                value: 'view-all',
                path: 'ladies/shop-by-product/view-all',
                subCategories: [],
              },
              {
                name: 'Plus Sizes',
                value: 'hm-plus',
                path: 'ladies/shop-by-product/hm-plus',
                subCategories: [
                  {
                    name: 'New Arrivals',
                    value: 'new-arrivals',
                    path: 'ladies/shop-by-product/hm-plus/new-arrivals',
                    subCategories: [],
                  },
                  {
                    name: 'Skirts',
                    value: 'skirts',
                    path: 'ladies/shop-by-product/hm-plus/skirts',
                    subCategories: [],
                  },
                  {
                    name: 'Shorts',
                    value: 'shorts',
                    path: 'ladies/shop-by-product/hm-plus/shorts',
                    subCategories: [],
                  },
                  {
                    name: 'Tops',
                    value: 'tops',
                    path: 'ladies/shop-by-product/hm-plus/tops',
                    subCategories: [
                      {
                        name: 'T-Shirts',
                        value: 't-shirts',
                        path: 'ladies/shop-by-product/hm-plus/tops/t-shirts',
                        subCategories: [],
                      },
                    ],
                  },
                  {
                    name: 'Jeans',
                    value: 'jeans',
                    path: 'ladies/shop-by-product/hm-plus/jeans',
                    subCategories: [],
                  },
                  {
                    name: 'Dresses',
                    value: 'dresses',
                    path: 'ladies/shop-by-product/hm-plus/dresses',
                    subCategories: [
                      {
                        name: 'Long Sleeve',
                        value: 'long-sleeved-dresses',
                        path: 'ladies/shop-by-product/hm-plus/dresses/long-sleeved-dresses',
                        subCategories: [],
                      },
                    ],
                  },
                  {
                    name: 'Sportswear',
                    value: 'sport',
                    path: 'ladies/shop-by-product/hm-plus/sport',
                    subCategories: [],
                  },
                  {
                    name: 'Lingerie & Tights',
                    value: 'lingerie-and-tights',
                    path: 'ladies/shop-by-product/hm-plus/lingerie-and-tights',
                    subCategories: [],
                  },
                  {
                    name: 'Cardigans & Sweaters',
                    value: 'cardigans-jumpers',
                    path: 'ladies/shop-by-product/hm-plus/cardigans-jumpers',
                    subCategories: [],
                  },
                  {
                    name: 'Shirts & Blouses',
                    value: 'shirts-blouses',
                    path: 'ladies/shop-by-product/hm-plus/shirts-blouses',
                    subCategories: [],
                  },
                  {
                    name: 'Jackets & Coats',
                    value: 'jackets-coats',
                    path: 'ladies/shop-by-product/hm-plus/jackets-coats',
                    subCategories: [],
                  },
                  {
                    name: 'Pants & Leggings',
                    value: 'trousers-leggings',
                    path: 'ladies/shop-by-product/hm-plus/trousers-leggings',
                    subCategories: [],
                  },
                  {
                    name: 'Sleepwear & Loungewear',
                    value: 'nightwear-loungewear',
                    path: 'ladies/shop-by-product/hm-plus/nightwear-loungewear',
                    subCategories: [],
                  },
                  {
                    name: 'Occasion Wear',
                    value: 'occasionwear',
                    path: 'ladies/shop-by-product/hm-plus/occasionwear',
                    subCategories: [],
                  },
                ],
              },
              {
                name: 'Premium Selection',
                value: 'premium-selection',
                path: 'ladies/shop-by-product/premium-selection',
                subCategories: [
                  {
                    name: 'Tops',
                    value: 'tops',
                    path: 'ladies/shop-by-product/premium-selection/tops',
                    subCategories: [],
                  },
                  {
                    name: 'Shoes',
                    value: 'shoes',
                    path: 'ladies/shop-by-product/premium-selection/shoes',
                    subCategories: [],
                  },
                  {
                    name: 'Jackets & Coats',
                    value: 'jackets-coats',
                    path: 'ladies/shop-by-product/premium-selection/jackets-coats',
                    subCategories: [],
                  },
                  {
                    name: 'Dresses',
                    value: 'dresses',
                    path: 'ladies/shop-by-product/premium-selection/dresses',
                    subCategories: [],
                  },
                  {
                    name: 'Cardigans & Jumpers',
                    value: 'cardigans-jumpers',
                    path: 'ladies/shop-by-product/premium-selection/cardigans-jumpers',
                    subCategories: [],
                  },
                  {
                    name: 'Bottoms',
                    value: 'bottoms',
                    path: 'ladies/shop-by-product/premium-selection/bottoms',
                    subCategories: [],
                  },
                  {
                    name: 'Accessories',
                    value: 'accessories',
                    path: 'ladies/shop-by-product/premium-selection/accessories',
                    subCategories: [],
                  },
                ],
              },
              {
                name: 'Dresses',
                value: 'dresses',
                path: 'ladies/shop-by-product/dresses',
                subCategories: [
                  {
                    name: 'Cut-Out Dresses',
                    value: 'cutout-dresses',
                    path: 'ladies/shop-by-product/dresses/cutout-dresses',
                    subCategories: [],
                  },
                  {
                    name: 'Sleeveless Dresses',
                    value: 'sleeveless-dresses',
                    path: 'ladies/shop-by-product/dresses/sleeveless-dresses',
                    subCategories: [],
                  },
                  {
                    name: 'Puff-Sleeve Dresses',
                    value: 'puffsleeve-dresses',
                    path: 'ladies/shop-by-product/dresses/puffsleeve-dresses',
                    subCategories: [],
                  },
                  {
                    name: 'Halter Dresses',
                    value: 'halterneck-dresses',
                    path: 'ladies/shop-by-product/dresses/halterneck-dresses',
                    subCategories: [],
                  },
                  {
                    name: 'Wedding Guest Dresses',
                    value: 'wedding-guest-dresses',
                    path: 'ladies/shop-by-product/dresses/wedding-guest-dresses',
                    subCategories: [],
                  },
                  {
                    name: 'A-line Dresses',
                    value: 'a-line-dresses',
                    path: 'ladies/shop-by-product/dresses/a-line-dresses',
                    subCategories: [],
                  },
                  {
                    name: 'Cami Dresses',
                    value: 'cami-dresses',
                    path: 'ladies/shop-by-product/dresses/cami-dresses',
                    subCategories: [],
                  },
                  {
                    name: 'Knit Dresses',
                    value: 'knitted-dresses',
                    path: 'ladies/shop-by-product/dresses/knitted-dresses',
                    subCategories: [],
                  },
                  {
                    name: 'Long Sleeve Dresses',
                    value: 'long-sleeve',
                    path: 'ladies/shop-by-product/dresses/long-sleeve',
                    subCategories: [],
                  },
                  {
                    name: 'Linen Dresses',
                    value: 'linen',
                    path: 'ladies/shop-by-product/dresses/linen',
                    subCategories: [],
                  },
                  {
                    name: 'T-Shirt Dresses',
                    value: 't-shirt-dresses',
                    path: 'ladies/shop-by-product/dresses/t-shirt-dresses',
                    subCategories: [],
                  },
                  {
                    name: 'Denim Dresses',
                    value: 'denim',
                    path: 'ladies/shop-by-product/dresses/denim',
                    subCategories: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    const result = buildNestedStructure(categories);
    expect(result).toEqual(expectedNestedStructure);
  });
});
