interface ProductPriceProps {
  isDiscounted: boolean;
  fullPrice: number;
  sellingPrice: number;
}

export default function ProductPrice({
  isDiscounted,
  sellingPrice,
  fullPrice,
}: ProductPriceProps) {
  return (
    <div className="price">
      <span className="font-bold text-primary">
        {Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(sellingPrice)}
      </span>

      {!!isDiscounted && (
        <>
          <small className="mx-1 line-through text-muted-foreground">
            {fullPrice}
          </small>
        </>
      )}
    </div>
  );
}
