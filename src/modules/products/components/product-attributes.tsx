import { Fragment } from 'react';

import { ProductAttributes } from '@prisma/client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ProductAttributesProps {
  attributes: ProductAttributes[];
}

const attributeCategories = [
  {
    title: 'Details',
    keys: [
      'Clothing style',
      'Concepts',
      'Fits',
      'Detailed descriptions',
      'Garment length',
      'Sleeve length',
      'Imported',
    ],
  },
  {
    title: 'Manufacturing details',
    keys: [
      'Year of production',
      'Manufactured date',
      'Product country of production',
    ],
  },
  {
    title: 'Material & Care',
    keys: ['Material', 'Composition', 'Care instructions'],
  },
];

export default function ProductAttributes({
  attributes,
}: ProductAttributesProps) {
  const displayAttributes = attributes.reduce(
    (acc, attr) => {
      attributeCategories.forEach((category) => {
        if (category.keys.includes(attr.name)) {
          acc[category.title] = {
            attributes: (acc[category.title]?.attributes ?? []).concat(attr),
          };
        }
      });
      return acc;
    },
    {} as Record<string, { attributes: ProductAttributes[] }>,
  );

  return (
    <Accordion type="single" collapsible className="w-full">
      {Object.entries(displayAttributes).map(([title, attributes]) => (
        <AccordionItem value={`item-${title}`} key={title}>
          <AccordionTrigger data-testid="attribute-name">
            {title}
          </AccordionTrigger>
          <AccordionContent>
            <div
              className="grid grid-cols-[max-content_1fr] gap-4"
              data-testid="attribute-value"
            >
              {attributes.attributes.map((attr) => (
                <Fragment key={attr.id}>
                  <div className="font-semibold">{attr.name}</div>
                  <div>{attr.value.join(', ')}</div>
                </Fragment>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
