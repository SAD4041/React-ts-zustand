export interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  helpfulCount: number;
  notHelpfulCount: number;
}

export interface BestSellProps {
  brandData: any;
  products: any[];
}

export interface BrandHeaderProps {
  brandData: any;
}

export interface BrandInfoProps {
  brandData: any;
}

export interface FilterOptionsProps {
  options: any[];
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}