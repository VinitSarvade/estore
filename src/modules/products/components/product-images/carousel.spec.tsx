import { ProductImage } from '@prisma/client';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ProductImagesCarousel from './carousel';

describe('ProductImagesCarousel', () => {
  const images = [
    { id: 1, image: '//example.com/image1.jpg' },
    { id: 2, image: '//example.com/image2.jpg' },
    { id: 3, image: '//example.com/image3.jpg' },
  ] as ProductImage[];

  it('should render successfully', () => {
    const { baseElement } = render(<ProductImagesCarousel images={images} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render the correct number of images', () => {
    const imgList = [
      ...images,
      { id: 4, image: '//example.com/image4.jpg' },
    ] as ProductImage[];

    const { getAllByRole } = render(<ProductImagesCarousel images={imgList} />);

    const imageElements = getAllByRole('img');
    expect(imageElements.length).toBe(imgList.length);
  });

  it('should render the correct image sources', () => {
    const { getAllByRole } = render(<ProductImagesCarousel images={images} />);

    const imageElements = getAllByRole('img');

    imageElements.forEach((element, idx) => {
      expect(element.getAttribute('src')).toContain(
        `_next/image?url=${encodeURIComponent(`https:${images[idx].image}`)}`,
      );
    });
  });
});
