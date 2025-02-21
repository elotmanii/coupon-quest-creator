
export type MarketplaceType = "amazon" | "aliexpress";

export interface Supplier {
  id: MarketplaceType;
  name: string;
  primaryColor: string;
  baseUrl: string;
}
