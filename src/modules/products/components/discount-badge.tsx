interface DiscountBadgeProps {
  fullPrice: number;
  discountPrice: number;
}

export default function DiscountBadge({
  fullPrice,
  discountPrice,
}: DiscountBadgeProps) {
  return (
    <small className="px-2 py-1 absolute bottom-1 right-1 bg-red-500 rounded-br-xl rounded-tl-xl rounded-md text-white font-semibold">
      {Math.round(100 - (discountPrice * 100) / fullPrice)}% off
    </small>
  );
}
