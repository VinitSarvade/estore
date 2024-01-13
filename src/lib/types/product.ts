export interface Product {
  code: string;
  name: string;
  stock: Stock;
  price: CommonPrice;
  images: Image[];
  categories: unknown[];
  pk: string;
  whitePrice: WhitePrice;
  redPrice?: RedPrice;
  articles: Article[];
  visible: boolean;
  concept: string[];
  numbersOfPieces: number;
  defaultArticle: Article;
  sale: boolean;
  variantSizes: VariantSize[];
  swatches: unknown[];
  articleCodes: string[];
  ticket: string;
  searchEngineProductId: string;
  dummy: boolean;
  linkPdp: string;
  categoryName: string;
  rgbColors: string[];
  articleColorNames: string[];
  ecoTaxValue: number;
  swatchesTotal: number;
  showPriceMarker: boolean;
  redirectToPdp: boolean;
  mainCategoryCode: string;
  comingSoon: boolean;
  brandName: string;
  galleryImages: Image[];
  allArticleCodes: string[];
  allArticleImages: string[];
  allArticleBaseImages: string[];
}

export interface Stock {
  stockLevel: number;
}

export interface Image {
  url: string;
  baseUrl: string;
}

export interface Price<T extends 'WHITE' | 'RED'> {
  currencyIso: string;
  value: number;
  priceType: string;
  formattedValue: string;
  type: T;
}

type CommonPrice = Price<'WHITE' | 'RED'>;

type WhitePrice = Price<'WHITE'>;
type RedPrice = Price<'RED'>;

export interface Article {
  code: string;
  name: string;
  images: Image[];
  pk: string;
  whitePrice: WhitePrice;
  logoPicture: Image[];
  normalPicture: Image[];
  visible: boolean;
  numbersOfPieces: number;
  ticket: string;
  dummy: boolean;
  ecoTaxValue: number;
  redirectToPdp: boolean;
  comingSoon: boolean;
  color: Color;
  rgbColor: string;
  genArticle: string;
  turnToSku: string;
}

export interface Color {
  code: string;
  text: string;
  filterName: string;
  hybrisCode: string;
}

export interface VariantSize {
  orderFilter: number;
  filterCode: string;
}
