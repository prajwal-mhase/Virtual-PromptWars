import { Activity, AlertTriangle, BarChart3, Bell, Car, ChefHat, Compass, Gauge, Handshake, HelpCircle, Home, Leaf, Lock, Map, Settings, Shield, Ticket, User, Users, Wrench } from "lucide-react";

export const navItems = [
  { href: "/dashboard", label: "Command Center", icon: Gauge },
  { href: "/assistant", label: "AI Assistant", icon: Activity },
  { href: "/crowd-intelligence", label: "Crowd Intelligence", icon: Users },
  { href: "/incident-center", label: "Incident Center", icon: Shield },
  { href: "/navigation", label: "Navigation", icon: Compass },
  { href: "/parking", label: "Parking", icon: Car },
  { href: "/food", label: "Food", icon: ChefHat },
  { href: "/tickets", label: "Tickets", icon: Ticket },
  { href: "/volunteer-dashboard", label: "Volunteers", icon: Handshake },
  { href: "/vendor-dashboard", label: "Vendors", icon: BarChart3 },
  { href: "/maintenance", label: "Maintenance", icon: Wrench },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/reports", label: "Reports", icon: Map },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/help-center", label: "Help Center", icon: HelpCircle }
];

export const moduleCopy: Record<string, { title: string; subtitle: string; icon: typeof AlertTriangle }> = {
  "admin-dashboard": { title: "Admin Dashboard", subtitle: "Tenant controls, roles, audit logs, integrations, and tournament-wide operational governance.", icon: Lock },
  "manager-dashboard": { title: "Manager Dashboard", subtitle: "Venue manager workload, recommended decisions, team health, and active service levels.", icon: Home },
  "volunteer-dashboard": { title: "Volunteer Dashboard", subtitle: "Shift attendance, task assignment, communication, and AI placement recommendations.", icon: Handshake },
  "vendor-dashboard": { title: "Vendor Dashboard", subtitle: "Sales analytics, inventory prediction, demand forecasting, and restock alerts.", icon: BarChart3 },
  "crowd-intelligence": { title: "Crowd Intelligence", subtitle: "Density visualization, queue forecasts, congestion detection, and alternate routes.", icon: Users },
  "incident-center": { title: "Emergency Response AI", subtitle: "Severity scoring, checklists, dispatch guidance, evacuation routes, and incident timelines.", icon: Shield },
  navigation: { title: "Smart Navigation", subtitle: "Mode-aware routing for visitors, VIP, media, staff, wheelchair, and emergency teams.", icon: Compass },
  parking: { title: "Parking Intelligence", subtitle: "Occupancy prediction, best-lot recommendation, walking time, and vehicle locator.", icon: Car },
  food: { title: "Food Court Intelligence", subtitle: "Live queue estimates, popular items, meal recommendations, and vendor analytics.", icon: ChefHat },
  tickets: { title: "Ticket Intelligence", subtitle: "Verification, seat finder, entry gates, digital wallet, upgrades, and QR workflows.", icon: Ticket },
  maintenance: { title: "Predictive Maintenance", subtitle: "Equipment monitoring, failure prediction, scheduling, and operations recommendations.", icon: Wrench },
  analytics: { title: "Analytics", subtitle: "Cross-module metrics, funnel performance, operational trends, and executive reporting.", icon: BarChart3 },
  reports: { title: "Reports", subtitle: "Exportable summaries for matchday readiness, safety, vendors, sustainability, and incidents.", icon: Map },
  settings: { title: "Settings", subtitle: "Security, team preferences, integrations, API keys, notification channels, and audit policy.", icon: Settings },
  profile: { title: "Profile", subtitle: "Personal details, role permissions, MFA state, language, and accessibility settings.", icon: User },
  notifications: { title: "Notifications", subtitle: "Role-aware alerts, escalations, assignments, maintenance notices, and broadcast messages.", icon: Bell },
  "help-center": { title: "Help Center", subtitle: "Operational runbooks, visitor support scripts, emergency playbooks, and platform guidance.", icon: HelpCircle },
  sustainability: { title: "Sustainability Dashboard", subtitle: "Power, water, waste, carbon estimates, and green recommendations.", icon: Leaf }
};
