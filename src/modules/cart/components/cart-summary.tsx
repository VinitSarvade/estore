import React from 'react';

import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils/format';

import { UserCart } from '../types';

interface CartSummaryProps {
  total: number;
  shipping?: number;
}

export default function CartSummary({ total, shipping = 0 }: CartSummaryProps) {
  return (
    <>
      <h2 className="text-2xl font-bold hidden lg:block">Summary</h2>
      <div className="flex justify-between my-5">
        <p>Subtotal</p>
        <p>{formatCurrency(total)}</p>
      </div>
      <div className="flex justify-between my-5">
        <p>Shipping</p>
        <p>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</p>
      </div>
      <div className="flex justify-between my-5">
        <p>Total</p>
        <p>{formatCurrency(total + shipping)}</p>
      </div>
      <Button size="lg" className="w-full">
        Checkout
      </Button>
    </>
  );
}
