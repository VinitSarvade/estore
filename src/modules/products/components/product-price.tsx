interface ProductPriceProps {
  isDiscounted: boolean;
  fullPrice: string;
  sellingPrice: string;
}

export default function ProductPrice({
  isDiscounted,
  sellingPrice,
  fullPrice,
}: ProductPriceProps) {
  return (
    <div className="price">
      <span className="font-semibold text-primary">{sellingPrice}</span>

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
