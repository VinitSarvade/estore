import { ProductImage } from '@prisma/client';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ProductImagesGallery from './gallery';

describe('ProductImagesGallery', () => {
  const mockImages = [
    { id: 1, image: '//example.com/image1.jpg' },
    { id: 2, image: '//example.com/image2.jpg' },
    { id: 3, image: '//example.com/image3.jpg' },
  ] as ProductImage[];

  it('should render successfully', () => {
    const { baseElement } = render(
      <ProductImagesGallery images={mockImages} />,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render the correct number of images', () => {
    const imgList = [
      ...mockImages,
      { id: 4, image: '//example.com/image4.jpg' },
    ] as ProductImage[];

    const { getAllByRole } = render(<ProductImagesGallery images={imgList} />);

    const imageElements = getAllByRole('img');
    expect(imageElements.length).toBe(imgList.length);
  });

  it('should render the correct image sources', () => {
    const { getAllByRole } = render(
      <ProductImagesGallery images={mockImages} />,
    );

    const imageElements = getAllByRole('img');

    imageElements.forEach((element, idx) => {
      expect(element.getAttribute('src')).toContain(
        `_next/image?url=${encodeURIComponent(`https:${mockImages[idx].image}`)}`,
      );
    });
  });
});
