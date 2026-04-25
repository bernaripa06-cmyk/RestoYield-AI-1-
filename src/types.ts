export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  popularity: number; // units sold per month
  profit: number; // price - cost
}

export interface DailySales {
  date: string;
  revenue: number;
  customers: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  unit: string;
  minThreshold: number;
  predictedDemand: number;
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Chef' | 'Serveur' | 'Commis' | 'Manager';
  hourlyRate: number;
  color: string;
}

export interface Shift {
  id: string;
  staffId: string;
  day: string;
  startTime: string;
  endTime: string;
}
