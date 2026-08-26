export interface HouseLocation {
  lat: number;
  lng: number;
}

export interface House {
  id: string;
  title: string;
  description: string;
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
  startDate: string; // yyyy-MM-dd
  endDate: string; // yyyy-MM-dd
  status: BlockedStatus;
}

/** Admin formu / API payload-u üçün */
export interface HouseInput {
  title: string;
  description: string;
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
