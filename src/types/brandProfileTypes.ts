export interface BrandFormValues {
  maket_name: string;
  description: string;
  mobile: string;
  email: string;
  address: string;
  logoUrl: string;
  bannerUrl: string;
}

export interface BrandProfileEditProps {
  brandData: BrandFormValues;
  onSave: (values: BrandFormValues) => Promise<void>;
}


export interface BrandData {
  maket_name: string;
  description: string;
  mobile: string;
  email: string;
  address: string;
  logoUrl: string;
  bannerUrl: string;
}