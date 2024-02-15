import { cn } from '@/lib/utils/cn';
import { formatCurrency } from '@/lib/utils/format';

interface ProductPriceProps {
  fullPrice: number;
  sellingPrice: number | null;
  className?: string;
  strikePriceClassName?: string;
}

export default function ProductPrice({
  sellingPrice,
  fullPrice,
  className,
  strikePriceClassName,
}: ProductPriceProps) {
  const isDiscounted = !!sellingPrice;

  return (
    <div className="price">
      <span className={cn('font-bold text-primary', className)}>
        {formatCurrency(sellingPrice || fullPrice)}
      </span>

      {!!isDiscounted && (
        <small
          className={cn(
            'mx-1 line-through text-muted-foreground',
            strikePriceClassName,
          )}
        >
          {fullPrice}
        </small>
      )}
    </div>
  );
}
