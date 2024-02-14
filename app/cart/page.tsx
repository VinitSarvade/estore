import Image from 'next/image';

export default function Cart() {
  return (
    <div className="min-h-[80dvh] flex flex-col place-content-center place-items-center">
      <Image
        src="/coming-soon.svg"
        alt="Coming Soon"
        width={960}
        height={540}
        unoptimized
      />

      <p className="mt-5">Coming Soon...</p>
    </div>
  );
}
