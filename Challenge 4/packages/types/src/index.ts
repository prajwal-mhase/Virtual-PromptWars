export type Role = "ADMIN" | "MANAGER" | "VOLUNTEER" | "VENDOR" | "VISITOR";

export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type IncidentStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "ESCALATED";

export type NavigationMode = "VISITOR" | "VIP" | "MEDIA" | "STAFF" | "WHEELCHAIR" | "EMERGENCY";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export interface DashboardKpi {
  label: string;
  value: string;
  trend: number;
  status: "good" | "watch" | "risk";
}

export interface Insight {
  id: string;
  title: string;
  detail: string;
  priority: Severity;
  action: string;
}

export interface Incident {
  id: string;
  title: string;
  location: string;
  severity: Severity;
  status: IncidentStatus;
  createdAt: string;
  assignedTeam: string;
}

export interface CrowdZone {
  id: string;
  name: string;
  density: number;
  predictedDensity: number;
  congestionRisk: Severity;
  x: number;
  y: number;
}

export interface ParkingLot {
  id: string;
  name: string;
  occupancy: number;
  capacity: number;
  walkingMinutes: number;
  recommended: boolean;
}

export interface FoodVendor {
  id: string;
  name: string;
  cuisine: string;
  queueMinutes: number;
  popularItems: string[];
  revenueToday: number;
}

export interface TicketSummary {
  total: number;
  scanned: number;
  exceptions: number;
  recommendedGate: string;
}

export interface AssistantMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  language: string;
  createdAt: string;
}

export interface RealtimeSnapshot {
  kpis: DashboardKpi[];
  incidents: Incident[];
  zones: CrowdZone[];
  parking: ParkingLot[];
  vendors: FoodVendor[];
  ticketSummary: TicketSummary;
  insights: Insight[];
}
