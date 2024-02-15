import { MinusIcon, PlusIcon } from 'lucide-react';

import SubmitStatus from '@/components/submit-status';
import { Button } from '@/components/ui/button';

import { CartItem } from '../../types';
import QuantityChangerForm from './quantity-changer-form';

interface CartQuantityChangerProps {
  item: CartItem;
  cartId: number;
}

export default function CartQuantityChanger({
  item,
  cartId,
}: CartQuantityChangerProps) {
  return (
    <>
      <QuantityChangerForm
        cartId={cartId}
        productId={item.product.id}
        quantity={item.quantity - 1}
      >
        <SubmitStatus>
          <Button
            variant="secondary"
            size="icon"
            className="active:bg-destructive/20"
          >
            <MinusIcon size={16} />
          </Button>
        </SubmitStatus>
      </QuantityChangerForm>

      <div className="w-[3ch] text-center">{item.quantity}</div>

      <QuantityChangerForm
        cartId={cartId}
        productId={item.product.id}
        quantity={item.quantity + 1}
      >
        <SubmitStatus>
          <Button
            variant="secondary"
            size="icon"
            className="active:bg-green-400/20"
          >
            <PlusIcon size={16} />
          </Button>
        </SubmitStatus>
      </QuantityChangerForm>
    </>
  );
}
