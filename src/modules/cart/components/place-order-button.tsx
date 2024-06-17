'use client';

import { useState } from 'react';

import { Loader2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { placeOrder } from '../actions';

interface PlaceOrderButtonProps {
  buttonText?: string;
}

export default function PlaceOrderButton({
  buttonText = 'Order now!',
}: PlaceOrderButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleOrderPlacement = async () => {
    setIsLoading(true);

    const order = await placeOrder();

    console.log({ order });

    setIsLoading(false);
  };

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={handleOrderPlacement}
      disabled={isLoading}
    >
      {isLoading && <Loader2Icon className="animate-spin" />}
      {buttonText}
    </Button>
  );
}
