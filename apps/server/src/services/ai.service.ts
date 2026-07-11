import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env";
import { getRealtimeSnapshot, moduleRecords } from "../data/operations";

const systemContext = `You are StadiumOS AI, an expert FIFA World Cup 2026 stadium operations assistant.
Give concise, operationally useful answers. Prioritize safety, accessibility, crowd flow, and verified venue data.
When handling emergencies, produce severity, checklist, nearest team, exit guidance, and communication action.`;

export async function askGemini(message: string, language = "en") {
  const context = JSON.stringify({ snapshot: getRealtimeSnapshot(), moduleRecords });
  if (!env.GEMINI_API_KEY) return fallbackAnswer(message, language);

  const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(`${systemContext}\nLanguage: ${language}\nOperational context: ${context}\nUser: ${message}`);
  return result.response.text();
}

export async function analyzeIncident(input: { title: string; location: string; description: string }) {
  const prompt = `Analyze incident: ${JSON.stringify(input)}. Return severity, checklist, nearest medical team, nearest exit, evacuation guidance, and timeline summary.`;
  const answer = await askGemini(prompt);
  return {
    severityScore: scoreSeverity(input.description),
    response: answer,
    nearestMedicalTeam: "Medical Alpha",
    nearestExit: input.location.toLowerCase().includes("239") ? "Exit E2" : "Exit B4",
    checklist: ["Confirm exact location", "Dispatch nearest trained responders", "Create clear access lane", "Notify command center", "Log updates every two minutes"]
  };
}

function scoreSeverity(text: string) {
  const lower = text.toLowerCase();
  if (/(fire|weapon|collapse|cardiac|stampede)/.test(lower)) return 95;
  if (/(medical|injury|smoke|crush|blocked)/.test(lower)) return 78;
  if (/(queue|lost|equipment)/.test(lower)) return 48;
  return 32;
}

function fallbackAnswer(message: string, language: string) {
  const lower = message.toLowerCase();
  if (/(parking|car|vehicle)/.test(lower)) return "Lot B is currently the best general recommendation with 940 open spaces and an 11 minute walk. Accessible South is preferred for wheelchair access.";
  if (/(food|eat|meal|vendor)/.test(lower)) return "North Stand Coffee has the shortest queue at 6 minutes. For a fuller meal, Global Grill is balanced for wait time and availability.";
  if (/(emergency|medical|evacuate|incident)/.test(lower)) return "Treat this as an operations priority: confirm location, keep the aisle clear, dispatch Medical Alpha, use the nearest signed exit, and update the incident timeline every two minutes.";
  if (/(ticket|seat|gate|entry)/.test(lower)) return "Use Gate B for sections 120-148 and Gate F for 300-level east. Keep your QR code brightness high and have ID ready for exception handling.";
  return `I can help with stadium navigation, tickets, parking, crowd conditions, food queues, accessibility, lost and found, and emergency procedures. Current response language: ${language}.`;
}
