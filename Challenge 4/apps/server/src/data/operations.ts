import type { CrowdZone, DashboardKpi, FoodVendor, Incident, Insight, ParkingLot, RealtimeSnapshot, TicketSummary } from "@stadiumos/types";

export const kpis: DashboardKpi[] = [
  { label: "Crowd Density", value: "72%", trend: 8.2, status: "watch" },
  { label: "Open Incidents", value: "6", trend: -14.5, status: "risk" },
  { label: "Gate Throughput", value: "41k/hr", trend: 11.1, status: "good" },
  { label: "Parking Filled", value: "84%", trend: 6.4, status: "watch" },
  { label: "Tickets Scanned", value: "61,842", trend: 18.8, status: "good" },
  { label: "Power Load", value: "7.8 MW", trend: -3.1, status: "good" }
];

export const incidents: Incident[] = [
  { id: "inc-1001", title: "Medical assistance requested", location: "Section 239 Row K", severity: "HIGH", status: "IN_PROGRESS", createdAt: new Date().toISOString(), assignedTeam: "Medical Alpha" },
  { id: "inc-1002", title: "Queue pressure at Gate C", location: "North Plaza", severity: "MEDIUM", status: "OPEN", createdAt: new Date().toISOString(), assignedTeam: "Security North" },
  { id: "inc-1003", title: "Vendor refrigeration anomaly", location: "Food Court B", severity: "LOW", status: "OPEN", createdAt: new Date().toISOString(), assignedTeam: "Facilities" }
];

export const zones: CrowdZone[] = [
  { id: "z1", name: "North Plaza", density: 88, predictedDensity: 93, congestionRisk: "HIGH", x: 24, y: 18 },
  { id: "z2", name: "Gate C", density: 82, predictedDensity: 89, congestionRisk: "HIGH", x: 72, y: 30 },
  { id: "z3", name: "Lower Bowl East", density: 69, predictedDensity: 71, congestionRisk: "MEDIUM", x: 58, y: 62 },
  { id: "z4", name: "Family Zone", density: 41, predictedDensity: 47, congestionRisk: "LOW", x: 33, y: 70 },
  { id: "z5", name: "Transit Ramp", density: 76, predictedDensity: 84, congestionRisk: "MEDIUM", x: 83, y: 76 }
];

export const parking: ParkingLot[] = [
  { id: "p-a", name: "Lot A", occupancy: 1850, capacity: 2100, walkingMinutes: 7, recommended: false },
  { id: "p-b", name: "Lot B", occupancy: 1260, capacity: 2200, walkingMinutes: 11, recommended: true },
  { id: "p-c", name: "Accessible South", occupancy: 310, capacity: 420, walkingMinutes: 5, recommended: true },
  { id: "p-d", name: "Park & Ride East", occupancy: 4100, capacity: 6200, walkingMinutes: 18, recommended: false }
];

export const vendors: FoodVendor[] = [
  { id: "v1", name: "Global Grill", cuisine: "International", queueMinutes: 9, popularItems: ["Chicken bowl", "Falafel wrap"], revenueToday: 48750 },
  { id: "v2", name: "Pitchside Tacos", cuisine: "Mexican", queueMinutes: 17, popularItems: ["Birria tacos", "Agua fresca"], revenueToday: 62110 },
  { id: "v3", name: "North Stand Coffee", cuisine: "Cafe", queueMinutes: 6, popularItems: ["Cold brew", "Protein bar"], revenueToday: 18320 }
];

export const ticketSummary: TicketSummary = {
  total: 74220,
  scanned: 61842,
  exceptions: 113,
  recommendedGate: "Gate B for Sections 120-148, Gate F for 300-level east"
};

export const insights: Insight[] = [
  { id: "i1", title: "Open Gate D auxiliary lanes", detail: "Predicted Gate C congestion exceeds 89% within 14 minutes.", priority: "HIGH", action: "Dispatch 12 volunteers and redirect VIP shuttle signage." },
  { id: "i2", title: "Restock bottled water", detail: "Food Court B demand is trending 31% above forecast.", priority: "MEDIUM", action: "Move two pallets from west storage before halftime." },
  { id: "i3", title: "Shift transit announcements", detail: "Ride-share dwell time improves if exits are staggered by section.", priority: "LOW", action: "Publish post-match departure schedule to app and displays." }
];

export function getRealtimeSnapshot(): RealtimeSnapshot {
  const wave = Math.round(Math.sin(Date.now() / 45_000) * 4);
  return {
    kpis: kpis.map((k, index) => (index === 0 ? { ...k, value: `${72 + wave}%` } : k)),
    incidents,
    zones: zones.map((zone) => ({ ...zone, density: Math.max(20, Math.min(98, zone.density + wave)) })),
    parking,
    vendors,
    ticketSummary: { ...ticketSummary, scanned: ticketSummary.scanned + Math.max(0, wave * 27) },
    insights
  };
}

export const moduleRecords = {
  weather: { temperature: "27 C", wind: "9 km/h", condition: "Clear", lightningRisk: "Low" },
  transport: { metroDelay: "3 min", rideShareDwell: "14 min", shuttleLoad: "68%", recommendation: "Hold two extra east shuttles until 22:35" },
  navigation: [
    { mode: "VISITOR", route: "Gate B -> Concourse 2 -> Section 126", eta: "6 min", accessible: true },
    { mode: "VIP", route: "Suite Entry -> Lift 4 -> Level 5", eta: "4 min", accessible: true },
    { mode: "EMERGENCY", route: "Medical Bay 2 -> Tunnel E -> Section 239", eta: "2 min", accessible: true }
  ],
  maintenance: [
    { name: "Escalator E7", healthScore: 64, failureRisk: "HIGH", nextMaintenanceAt: "2026-07-11T20:10:00Z" },
    { name: "Chiller Plant 2", healthScore: 81, failureRisk: "MEDIUM", nextMaintenanceAt: "2026-07-12T04:30:00Z" }
  ],
  sustainability: { powerMw: 7.8, waterKl: 412, wasteDiversion: "63%", carbonTonnes: 22.4, recommendation: "Dim nonessential concourse lighting by 12% after kickoff." },
  volunteers: [
    { name: "Asha Rao", task: "Gate C queue guidance", status: "Active", shift: "16:00-23:30" },
    { name: "Mateo Silva", task: "Lost and found desk", status: "Active", shift: "15:30-22:30" }
  ]
};
