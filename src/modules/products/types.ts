import { Product } from '@estore/types/product';

export interface ProductsResponse {
  results: Product[];
  pagination: Pagination;
  facets: Facets[];
  freeTextSearch: string;
}

export interface Pagination {
  pageSize: number;
  currentPage: number;
  sort: string;
  numberOfPages: number;
  totalNumberOfResults: number;
  totalNumberOfResultsUnfiltered: number;
}

export interface Facets {
  code: string;
  priority: number;
  category: boolean;
  multiSelect: boolean;
  visible: boolean;
  values: FacetValue[];
}

export interface FacetValue {
  code: string;
  count: number;
  selected: boolean;
}
