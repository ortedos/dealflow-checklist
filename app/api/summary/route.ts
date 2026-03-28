import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  const { stages } = await request.json();
  if (!Array.isArray(stages)) {
    return NextResponse.json({ error: "stages array is required" }, { status: 400 });
  }

  const remaining = stages.filter((item) => !item.done).map((item) => item.title);
  const summary = remaining.length
    ? `Next focus: ${remaining.slice(0, 3).join(", ")}. Main risk is losing momentum between participants.`
    : "All major stages are complete. Ready for final confirmation and archival.";

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ mode: "demo", summary });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      { role: "system", content: "Summarize transaction progress and highlight next actions in 2 concise sentences." },
      { role: "user", content: JSON.stringify(stages) }
    ]
  });

  return NextResponse.json({ mode: "ai", summary: completion.output_text });
}
