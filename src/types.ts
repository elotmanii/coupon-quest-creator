
export type MarketplaceType = "amazon" | "aliexpress" | "ebay";

export interface Supplier {
  id: MarketplaceType;
  name: string;
  primaryColor: string;
  baseUrl: string;
}

export interface Coupon {
  id: number;
  code: string;
  discount: string;
  description: string;
  category: string;
  productImage: string;
  amazonLink: string;
  marketplace: MarketplaceType;
  beforePrice?: number;
  afterPrice?: number;
}
