'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { getPaginatedProductsByCategoryValue } from '@app/products/[category]/actions';
import { Loader2 } from 'lucide-react';
import { useEffectOnce, useIntersectionObserver } from 'usehooks-ts';

import { ProductListing } from '../types';
import ProductListItem from './product-list-item';

interface ProductsProps {
  initialProducts: ProductListing.Products;
  categoryValue: string;
}

export default function Products({
  initialProducts,
  categoryValue,
}: ProductsProps) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [pageEnd, setPageEnd] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const loadMore = useCallback(async () => {
    const response = await getPaginatedProductsByCategoryValue(
      categoryValue,
      page + 1,
    );
    if (response.products.length === 0) {
      return setPageEnd(true);
    }

    setProducts((prevProducts) => prevProducts.concat(response.products));
    return setPage((prevPage) => prevPage + 1);
  }, [page, categoryValue]);

  useEffect(() => {
    if (isIntersecting) {
      loadMore();
    }
  }, [isIntersecting, loadMore]);

  return (
    <>
      <div className="grid gap-4">
        {/* lg:grid-cols-[1fr_4fr] */}
        {/* <div className="hidden lg:block">sidebar</div> */}
        <div className="product-grid gap-3 p-3">
          {products.map((productGroup, idx) => (
            <Link
              key={productGroup.code}
              href={`/products/details/${productGroup.Products[0].code}`}
            >
              <ProductListItem
                productGroup={productGroup}
                priorityImage={idx < 6}
              />
            </Link>
          ))}
        </div>
      </div>

      {!pageEnd && (
        <div ref={ref} className="flex place-content-center pt-5 pb-10">
          <Loader2 size={48} className="animate-spin" />
        </div>
      )}
      {pageEnd && (
        <div className="flex place-content-center pt-5 pb-10">
          <p>Thats all folks!</p>
        </div>
      )}
    </>
  );
}
