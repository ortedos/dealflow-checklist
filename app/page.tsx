"use client";

import { FormEvent, useMemo, useState } from "react";

type Stage = {
  id: string;
  title: string;
  owner: string;
  done: boolean;
  note: string;
};

const initialStages: Stage[] = [
  { id: "1", title: "Collect participant data", owner: "Buyer", done: true, note: "Basic profile complete" },
  { id: "2", title: "Validate documents", owner: "Operator", done: false, note: "Passport and ownership docs pending review" },
  { id: "3", title: "Approve financing", owner: "Bank", done: false, note: "Need final affordability signal" },
  { id: "4", title: "Prepare signing", owner: "Legal", done: false, note: "Draft agreement not generated yet" },
  { id: "5", title: "Settlement confirmation", owner: "Back office", done: false, note: "Wait for signed package" }
];

export default function HomePage() {
  const [dealName, setDealName] = useState("Apartment purchase #A-1024");
  const [stages, setStages] = useState<Stage[]>(initialStages);
  const [summary, setSummary] = useState<string>("Run the summary to highlight the next actions.");
  const [mode, setMode] = useState<string | null>(null);

  const progress = useMemo(() => Math.round((stages.filter((s) => s.done).length / stages.length) * 100), [stages]);

  function toggleStage(id: string) {
    setStages((current) => current.map((stage) => stage.id === id ? { ...stage, done: !stage.done } : stage));
  }

  function updateNote(id: string, value: string) {
    setStages((current) => current.map((stage) => stage.id === id ? { ...stage, note: value } : stage));
  }

  async function handleSummarize(event: FormEvent) {
    event.preventDefault();
    const res = await fetch("/api/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stages })
    });
    const data = await res.json();
    setSummary(data.summary ?? "No summary returned");
    setMode(data.mode ?? null);
  }

  return (
    <main>
      <div className="row wrap" style={{ justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div className="badge">Workflow clarity for high-friction journeys</div>
          <h1 style={{ marginTop: 16, fontSize: 42 }}>DealFlow Checklist</h1>
          <p className="muted">A lightweight app for structuring complex multi-step transactions and making progress visible.</p>
        </div>
        <div className="card" style={{ minWidth: 220 }}>
          <div className="small muted">Completion</div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>{progress}%</div>
          <div className="small muted">{stages.filter((s) => s.done).length} of {stages.length} stages done</div>
        </div>
      </div>

      <div className="grid two">
        <section className="card">
          <label htmlFor="dealName">Deal name</label>
          <input id="dealName" value={dealName} onChange={(e) => setDealName(e.target.value)} />
          <p className="small muted" style={{ marginTop: 10 }}>{dealName}</p>
        </section>
        <section className="card">
          <h2>AI progress summary</h2>
          <p>{summary}</p>
          {mode ? <p className="small muted">Mode: {mode}</p> : null}
          <form onSubmit={handleSummarize}>
            <button type="submit">Generate summary</button>
          </form>
        </section>
      </div>

      <section className="card" style={{ marginTop: 20 }}>
        <h2>Stage checklist</h2>
        <div className="stage">
          {stages.map((stage) => (
            <div key={stage.id} className={`stage-item ${stage.done ? "done" : "pending"}`}>
              <div className="row wrap" style={{ justifyContent: "space-between" }}>
                <div>
                  <strong>{stage.title}</strong>
                  <div className="small muted">Owner: {stage.owner}</div>
                </div>
                <span className="pill">{stage.done ? "Done" : "In progress"}</span>
              </div>
              <textarea value={stage.note} onChange={(e) => updateNote(stage.id, e.target.value)} />
              <button type="button" onClick={() => toggleStage(stage.id)}>
                {stage.done ? "Mark as pending" : "Mark as done"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
