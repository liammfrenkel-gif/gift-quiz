"use client";

import { useMemo, useState } from "react";
import { classifyRecipient, getQuestionSet, type QuizProfile, type QuizAnswers } from "@/lib/quiz";
import { INTERESTS } from "@/lib/interests";
import { buildResultsUrl } from "@/lib/url";

export default function HomePage() {
  const [who, setWho] = useState("");
  const [profile, setProfile] = useState<QuizProfile | null>(null);

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [answers, setAnswers] = useState<QuizAnswers>({
    relationshipStage: "",
    budget: "",
    vibe: "",
    boldness: "",
    occasion: "",
  });

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const questionSet = useMemo(() => {
    if (!profile) return null;
    return getQuestionSet(profile);
  }, [profile]);

  function onStart() {
    const p = classifyRecipient(who);
    setProfile(p);
    setStep(2);
  }

  function toggleInterest(tag: string) {
    setSelectedInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function onContinueToQuestions() {
    setStep(3);
  }

  function onSeeResults() {
    if (!profile) return;
    const url = buildResultsUrl({
      who,
      profile,
      interests: selectedInterests,
      answers,
    });
    window.location.href = url;
  }

  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: 20, fontFamily: "system-ui" }}>
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 32, margin: 0 }}>Gift Finder</h1>
        <p style={{ marginTop: 8, opacity: 0.8 }}>
          Answer a few questions and get 3–5 gift picks that fit the person.
        </p>
        <p style={{ fontSize: 12, opacity: 0.7 }}>
          Disclosure: As an Amazon Associate I earn from qualifying purchases.
        </p>
      </header>

      <div
        style={{
          border: "1px dashed #bbb",
          padding: 14,
          borderRadius: 10,
          marginBottom: 18,
          fontSize: 13,
          opacity: 0.8,
        }}
      >
        Ad placeholder (ads go here later). Keep ads OFF the results page.
      </div>

      {step === 1 && (
        <section style={{ border: "1px solid #eee", padding: 16, borderRadius: 12 }}>
          <h2 style={{ marginTop: 0 }}>Who are you buying for?</h2>
          <p style={{ marginTop: 6, opacity: 0.8 }}>
            Type: “girlfriend”, “dad”, “coworker”, “someone I just started dating”, etc.
          </p>
          <input
            value={who}
            onChange={(e) => setWho(e.target.value)}
            placeholder="e.g., girlfriend"
            style={{
              width: "100%",
              padding: 12,
              fontSize: 16,
              borderRadius: 10,
              border: "1px solid #ddd",
              marginTop: 10,
            }}
          />
          <button
            onClick={onStart}
            disabled={who.trim().length < 2}
            style={{
              marginTop: 12,
              padding: "12px 16px",
              borderRadius: 10,
              border: "none",
              background: who.trim().length < 2 ? "#ccc" : "black",
              color: "white",
              fontSize: 15,
              cursor: who.trim().length < 2 ? "not-allowed" : "pointer",
            }}
          >
            Start
          </button>
        </section>
      )}

      {step === 2 && profile && (
        <section style={{ border: "1px solid #eee", padding: 16, borderRadius: 12 }}>
          <h2 style={{ marginTop: 0 }}>
            Great — buying for: <span style={{ textTransform: "capitalize" }}>{who}</span>
          </h2>
          <p style={{ marginTop: 6, opacity: 0.8 }}>
            Pick interests (multi-select).
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
            {INTERESTS.map((tag) => {
              const active = selectedInterests.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleInterest(tag)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 999,
                    border: "1px solid #ddd",
                    background: active ? "black" : "white",
                    color: active ? "white" : "black",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <button
              onClick={() => setStep(1)}
              style={{
                padding: "12px 16px",
                borderRadius: 10,
                border: "1px solid #ddd",
                background: "white",
                cursor: "pointer",
              }}
            >
              Back
            </button>

            <button
              onClick={onContinueToQuestions}
              disabled={selectedInterests.length === 0}
              style={{
                padding: "12px 16px",
                borderRadius: 10,
                border: "none",
                background: selectedInterests.length === 0 ? "#ccc" : "black",
                color: "white",
                cursor: selectedInterests.length === 0 ? "not-allowed" : "pointer",
              }}
            >
              Continue
            </button>
          </div>
        </section>
      )}

      {step === 3 && profile && questionSet && (
        <section style={{ border: "1px solid #eee", padding: 16, borderRadius: 12 }}>
          <h2 style={{ marginTop: 0 }}>Quick questions</h2>

          {questionSet.map((q) => (
            <div key={q.key} style={{ marginTop: 14 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>{q.label}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {q.options.map((opt) => {
                  const active = answers[q.key] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.key]: opt.value }))}
                      style={{
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid #ddd",
                        background: active ? "black" : "white",
                        color: active ? "white" : "black",
                        cursor: "pointer",
                        fontSize: 14,
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <button
              onClick={() => setStep(2)}
              style={{
                padding: "12px 16px",
                borderRadius: 10,
                border: "1px solid #ddd",
                background: "white",
                cursor: "pointer",
              }}
            >
              Back
            </button>

            <button
              onClick={onSeeResults}
              style={{
                padding: "12px 16px",
                borderRadius: 10,
                border: "none",
                background: "black",
                color: "white",
                cursor: "pointer",
              }}
            >
              See results
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
