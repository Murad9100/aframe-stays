export interface HouseLocation {
  lat: number;
  lng: number;
}

export interface House {
  id: string;
  title: string;
  titleEn?: string | null;
  titleRu?: string | null;
  description: string;
  descriptionEn?: string | null;
  descriptionRu?: string | null;
  region: string;
  dailyPrice: number;
  guests: number;
  features: string[];
  images: string[];
  location: HouseLocation;
  createdAt: string;
}

export type BlockedStatus = "blocked";

export interface BlockedRange {
  id: string;
  houseId: string;
  startDate: string;
  endDate: string;
  status: BlockedStatus;
}

/** Admin formu / API payload-u üçün */
export interface HouseInput {
  title: string;
  titleEn?: string | null;
  titleRu?: string | null;
  description: string;
  descriptionEn?: string | null;
  descriptionRu?: string | null;
  region: string;
  dailyPrice: number;
  guests: number;
  features: string[];
  images: string[];
  lat: number;
  lng: number;
}

export interface DashboardStats {
  totalHouses: number;
  averagePrice: number;
  upcomingBlockedDays: number;
}