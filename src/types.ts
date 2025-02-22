
export type MarketplaceType = "amazon" | "aliexpress" | "ebay";

export interface Supplier {
  id: MarketplaceType;
  name: string;
  primaryColor: string;
  baseUrl: string;
}

