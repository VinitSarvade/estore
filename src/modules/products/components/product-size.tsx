'use client';

import { useState } from 'react';

import { ProductSizes } from '@prisma/client';
import { useForm } from '@tanstack/react-form';
import { valibotValidator } from '@tanstack/valibot-form-adapter';
import { Loader2Icon, ShoppingBagIcon } from 'lucide-react';
import { minValue, number } from 'valibot';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils/cn';

import { addToCart } from '../actions';
import { ErrorType } from '../types';

interface ProductSizeProps {
  sizes: ProductSizes[];
  productId: number;
}

export default function ProductSize({ sizes, productId }: ProductSizeProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: { sizeId: -1 },
    validatorAdapter: valibotValidator,
    onSubmit: async ({ value, formApi }) => {
      setIsSubmitting(true);
      const result = await addToCart(productId, value.sizeId);

      setIsSubmitting(false);
      if (result && result.error) {
        let description = result.error.message;
        if (result.error.type === ErrorType.AUTH_ERROR) {
          description = 'Please sign in to add to cart!';
        }

        toast({ title: 'Error!', description, variant: 'destructive' });
      }

      !result && formApi.reset();
    },
  });

  return (
    <form.Provider>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
      >
        <form.Field
          name="sizeId"
          validators={{
            onSubmit: number([minValue(1, 'Please select a size')]),
          }}
        >
          {({ state: { value, meta }, handleChange }) => (
            <>
              <div className="grid grid-cols-[repeat(5,minmax(1px,1fr))] gap-3">
                {sizes.map(({ id, name }) => (
                  <Button
                    key={id}
                    variant={value === id ? 'default' : 'outline'}
                    className={cn('rounded-none')}
                    type="button"
                    onClick={() => handleChange(value === id ? -1 : id)}
                  >
                    {name}
                  </Button>
                ))}
              </div>
              <div className="text-sm text-destructive mt-2">
                {meta.touchedErrors}
              </div>
            </>
          )}
        </form.Field>

        <Button
          size="lg"
          className="mt-8 w-full rounded-none font-semibold"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting && <Loader2Icon className="animate-spin" />}
          {!isSubmitting && <ShoppingBagIcon size={18} />}
          &ensp; Add to Cart
        </Button>
      </form>
    </form.Provider>
  );
}
