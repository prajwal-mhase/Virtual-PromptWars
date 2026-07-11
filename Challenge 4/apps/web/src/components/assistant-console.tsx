"use client";

import { useState } from "react";
import { Mic, Send, Volume2 } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@stadiumos/ui";
import { api } from "@/lib/api";

type Message = { role: "user" | "assistant"; content: string };

export function AssistantConsole() {
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: "I am ready for stadium operations, visitor support, parking, tickets, food queues, accessibility, and emergency procedures." }]);
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("en");

  async function send() {
    if (!message.trim()) return;
    const next = [...messages, { role: "user" as const, content: message }];
    setMessages(next);
    setMessage("");
    const response = await api<{ message: Message }>("/assistant", { method: "POST", body: JSON.stringify({ message, language }) });
    setMessages([...next, response.message]);
  }

  function speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    speechSynthesis.speak(utterance);
  }

  function listen() {
    const Recognition = (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition;
    if (!Recognition) return;
    const recognition = new Recognition();
    recognition.lang = language;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) setMessage(transcript);
    };
    recognition.start();
  }

  return (
    <Card className="mx-auto max-w-5xl">
      <CardHeader><CardTitle>AI Stadium Assistant</CardTitle><select className="rounded-md border border-black/10 bg-transparent px-2 py-1 text-sm dark:border-white/10" value={language} onChange={(event) => setLanguage(event.target.value)}><option value="en">English</option><option value="es">Spanish</option><option value="fr">French</option><option value="hi">Hindi</option><option value="ar">Arabic</option></select></CardHeader>
      <CardContent>
        <div className="mb-4 h-[56vh] space-y-3 overflow-auto rounded-lg border border-black/10 p-4 dark:border-white/10">
          {messages.map((item, index) => <div key={index} className={item.role === "user" ? "ml-auto max-w-[78%] rounded-lg bg-stadium-ink p-3 text-white" : "mr-auto max-w-[78%] rounded-lg bg-black/5 p-3 dark:bg-white/10"}><p className="text-sm leading-6">{item.content}</p>{item.role === "assistant" && <button aria-label="Read aloud" className="mt-2 text-slate-500" onClick={() => speak(item.content)}><Volume2 size={16} /></button>}</div>)}
        </div>
        <div className="flex gap-2">
          <button aria-label="Voice input" className="rounded-md border border-black/10 px-3 dark:border-white/10" onClick={listen}><Mic size={18} /></button>
          <input className="min-w-0 flex-1 rounded-md border border-black/10 bg-white/70 px-3 dark:border-white/10 dark:bg-white/5" value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder="Ask about gates, seats, queues, incidents, parking, accessibility, or emergency playbooks" />
          <Button onClick={send}><Send size={16} />Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}
