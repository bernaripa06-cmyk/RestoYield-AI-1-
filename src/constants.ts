import { MenuItem, DailySales, InventoryItem, StaffMember, Shift } from './types';

export const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Burger Maison', category: 'Plats', price: 18, cost: 4.5, popularity: 450, profit: 13.5 },
  { id: '2', name: 'Salade César', category: 'Entrées', price: 14, cost: 2.2, popularity: 320, profit: 11.8 },
  { id: '3', name: 'Entrecôte 300g', category: 'Plats', price: 32, cost: 12.0, popularity: 150, profit: 20.0 },
  { id: '4', name: 'Pâté en Croûte', category: 'Entrées', price: 12, cost: 3.5, popularity: 80, profit: 8.5 },
  { id: '5', name: 'Tiramisu', category: 'Desserts', price: 9, cost: 1.8, popularity: 290, profit: 7.2 },
  { id: '6', name: 'Vin Rouge (Verre)', category: 'Boissons', price: 7, cost: 1.2, popularity: 580, profit: 5.8 },
];

export const SALES_HISTORY: DailySales[] = [
  { date: '2026-04-19', revenue: 2450, customers: 85 },
  { date: '2026-04-20', revenue: 2100, customers: 72 },
  { date: '2026-04-21', revenue: 2900, customers: 94 },
  { date: '2026-04-22', revenue: 3500, customers: 110 },
  { date: '2026-04-23', revenue: 4200, customers: 135 },
  { date: '2026-04-24', revenue: 5100, customers: 158 },
  { date: '2026-04-25', revenue: 4800, customers: 142 },
];

export const INVENTORY_ITEMS: InventoryItem[] = [
  { id: '11', name: 'Steak Haché', currentStock: 45, unit: 'kg', minThreshold: 50, predictedDemand: 85 },
  { id: '12', name: 'Salade Romaine', currentStock: 12, unit: 'kg', minThreshold: 10, predictedDemand: 25 },
  { id: '13', name: 'Fromage de Chèvre', currentStock: 8, unit: 'pce', minThreshold: 5, predictedDemand: 12 },
  { id: '14', name: 'Frites Fraîches', currentStock: 120, unit: 'kg', minThreshold: 100, predictedDemand: 250 },
];

export const STAFF: StaffMember[] = [
  { id: 's1', name: 'Jean Dupont', role: 'Chef', hourlyRate: 35, color: '#f59e0b' },
  { id: 's2', name: 'Marie Curie', role: 'Manager', hourlyRate: 40, color: '#6366f1' },
  { id: 's3', name: 'Luc Lucas', role: 'Serveur', hourlyRate: 15, color: '#10b981' },
  { id: 's4', name: 'Sophie Martin', role: 'Serveur', hourlyRate: 15, color: '#10b981' },
];

export const SHIFTS: Shift[] = [
  { id: '1', staffId: 's1', day: 'Samedi', startTime: '10:00', endTime: '15:00' },
  { id: '2', staffId: 's1', day: 'Samedi', startTime: '18:00', endTime: '23:00' },
  { id: '3', staffId: 's2', day: 'Samedi', startTime: '09:00', endTime: '17:00' },
  { id: '4', staffId: 's3', day: 'Samedi', startTime: '11:00', endTime: '16:00' },
  { id: '5', staffId: 's4', day: 'Samedi', startTime: '18:30', endTime: '23:30' },
  { id: '6', staffId: 's3', day: 'Dimanche', startTime: '10:00', endTime: '16:00' },
  { id: '7', staffId: 's1', day: 'Dimanche', startTime: '10:00', endTime: '16:00' },
];

export const WEEK_DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
