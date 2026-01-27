"use client";

import { useMemo, useState } from "react";

type FormState = {
  relationship: string;
  occasion: string;
  budget: string;
  interests: string[];
  vibe: string;
};

type GiftIdea = {
  title: string;
  description: string;
  price: string;
  interests: string[];
  occasions: string[];
  relationships: string[];
  amazonUrl: string;
};

const giftIdeas: GiftIdea[] = [
  {
    title: "Cozy Weighted Blanket",
    description: "Perfect for winding down with a movie night or relaxing after work.",
    price: "$50-$90",
    interests: ["homebody", "wellness"],
    occasions: ["birthday", "anniversary", "just-because"],
    relationships: ["girlfriend", "wife", "boyfriend", "husband"],
    amazonUrl:
      "https://www.amazon.com/s?k=weighted+blanket&tag=giftquiz-20",
  },
  {
    title: "Wireless Earbuds",
    description: "Great for commuters, runners, and music lovers on the go.",
    price: "$60-$150",
    interests: ["tech", "fitness"],
    occasions: ["birthday", "graduation", "holiday"],
    relationships: ["boyfriend", "husband", "friend"],
    amazonUrl:
      "https://www.amazon.com/s?k=wireless+earbuds&tag=giftquiz-20",
  },
  {
    title: "Personalized Jewelry",
    description: "Add initials or a meaningful date for a heartfelt keepsake.",
    price: "$30-$120",
    interests: ["fashion", "sentimental"],
    occasions: ["anniversary", "birthday", "valentines"],
    relationships: ["girlfriend", "wife"],
    amazonUrl:
      "https://www.amazon.com/s?k=personalized+jewelry&tag=giftquiz-20",
  },
  {
    title: "Premium Coffee Starter Kit",
    description: "Includes a pour-over set, grinder, and specialty beans.",
    price: "$40-$100",
    interests: ["foodie", "homebody"],
    occasions: ["housewarming", "birthday", "holiday"],
    relationships: ["friend", "partner", "boyfriend", "girlfriend"],
    amazonUrl:
      "https://www.amazon.com/s?k=pour+over+coffee+kit&tag=giftquiz-20",
  },
  {
    title: "Adventure Experience Box",
    description: "Curated day trips, classes, or experiences for thrill seekers.",
    price: "$75-$200",
    interests: ["travel", "adventure"],
    occasions: ["anniversary", "birthday", "just-because"],
    relationships: ["boyfriend", "husband", "girlfriend", "wife"],
    amazonUrl:
      "https://www.amazon.com/s?k=experience+gift+card&tag=giftquiz-20",
  },
  {
    title: "Self-Care Spa Set",
    description: "A calming bundle with bath salts, candles, and skincare.",
    price: "$25-$70",
    interests: ["wellness", "homebody"],
    occasions: ["holiday", "valentines", "just-because"],
    relationships: ["girlfriend", "wife", "friend"],
    amazonUrl:
      "https://www.amazon.com/s?k=spa+gift+set&tag=giftquiz-20",
  },
];

const interestOptions = [
  "tech",
  "fitness",
  "foodie",
  "fashion",
  "wellness",
  "homebody",
  "travel",
  "adventure",
  "sentimental",
];

export default function Home() {
  const [form, setForm] = useState<FormState>({
    relationship: "girlfriend",
    occasion: "birthday",
    budget: "50-100",
    interests: ["wellness"],
    vibe: "thoughtful",
  });

  const suggestions = useMemo(() => {
    return giftIdeas
      .map((idea) => {
        const relationshipScore = idea.relationships.includes(form.relationship) ? 2 : 0;
        const occasionScore = idea.occasions.includes(form.occasion) ? 2 : 0;
        const interestScore = idea.interests.filter((interest) =>
          form.interests.includes(interest)
        ).length;
        const totalScore = relationshipScore + occasionScore + interestScore;
        return { ...idea, totalScore };
      })
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 3);
  }, [form]);

  const toggleInterest = (interest: string) => {
    setForm((prev) => {
      const hasInterest = prev.interests.includes(interest);
      const nextInterests = hasInterest
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest];
      return {
        ...prev,
        interests: nextInterests.length ? nextInterests : [interest],
      };
    });
  };

  return (
    <main style={{ fontFamily: "'Inter', sans-serif", padding: "48px 24px" }}>
      <section style={{ maxWidth: 960, margin: "0 auto" }}>
        <header style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: 1.2 }}>
            Gift Finder
          </p>
          <h1 style={{ fontSize: 40, margin: "8px 0" }}>Gift Quiz 🎁</h1>
          <p style={{ fontSize: 18, maxWidth: 640 }}>
            Answer a few quick questions to get gift ideas tailored to your person. We’ll
            surface Amazon affiliate links so you can shop fast and we can keep improving
            the experience.
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gap: 24,
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            alignItems: "start",
          }}
        >
          <form
            style={{
              border: "1px solid #eee",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 20px 40px rgba(15, 23, 42, 0.05)",
            }}
          >
            <h2 style={{ fontSize: 22, marginBottom: 16 }}>Quick Questionnaire</h2>
            <label style={{ display: "block", marginBottom: 16 }}>
              <span style={{ fontWeight: 600 }}>Relationship</span>
              <select
                value={form.relationship}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, relationship: event.target.value }))
                }
                style={{ width: "100%", marginTop: 8, padding: 10, borderRadius: 8 }}
              >
                <option value="girlfriend">Girlfriend</option>
                <option value="boyfriend">Boyfriend</option>
                <option value="wife">Wife</option>
                <option value="husband">Husband</option>
                <option value="partner">Partner</option>
                <option value="friend">Friend</option>
              </select>
            </label>

            <label style={{ display: "block", marginBottom: 16 }}>
              <span style={{ fontWeight: 600 }}>Occasion</span>
              <select
                value={form.occasion}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, occasion: event.target.value }))
                }
                style={{ width: "100%", marginTop: 8, padding: 10, borderRadius: 8 }}
              >
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="holiday">Holiday</option>
                <option value="valentines">Valentine’s Day</option>
                <option value="graduation">Graduation</option>
                <option value="housewarming">Housewarming</option>
                <option value="just-because">Just Because</option>
              </select>
            </label>

            <label style={{ display: "block", marginBottom: 16 }}>
              <span style={{ fontWeight: 600 }}>Budget</span>
              <select
                value={form.budget}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, budget: event.target.value }))
                }
                style={{ width: "100%", marginTop: 8, padding: 10, borderRadius: 8 }}
              >
                <option value="under-50">Under $50</option>
                <option value="50-100">$50-$100</option>
                <option value="100-200">$100-$200</option>
                <option value="200-plus">$200+</option>
              </select>
            </label>

            <div style={{ marginBottom: 16 }}>
              <span style={{ fontWeight: 600, display: "block", marginBottom: 8 }}>
                Interests
              </span>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    style={{
                      borderRadius: 999,
                      border: form.interests.includes(interest)
                        ? "1px solid #0f172a"
                        : "1px solid #cbd5f5",
                      background: form.interests.includes(interest)
                        ? "#0f172a"
                        : "#fff",
                      color: form.interests.includes(interest) ? "#fff" : "#0f172a",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <label style={{ display: "block" }}>
              <span style={{ fontWeight: 600 }}>Gift vibe</span>
              <select
                value={form.vibe}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, vibe: event.target.value }))
                }
                style={{ width: "100%", marginTop: 8, padding: 10, borderRadius: 8 }}
              >
                <option value="thoughtful">Thoughtful & sentimental</option>
                <option value="fun">Fun & playful</option>
                <option value="luxury">Luxury upgrade</option>
                <option value="practical">Practical</option>
              </select>
            </label>
          </form>

          <div>
            <h2 style={{ fontSize: 22, marginBottom: 16 }}>Top Matches</h2>
            <div style={{ display: "grid", gap: 16 }}>
              {suggestions.map((idea) => (
                <article
                  key={idea.title}
                  style={{
                    border: "1px solid #eee",
                    borderRadius: 16,
                    padding: 20,
                    background: "#fff",
                  }}
                >
                  <h3 style={{ marginBottom: 8 }}>{idea.title}</h3>
                  <p style={{ marginBottom: 8 }}>{idea.description}</p>
                  <p style={{ marginBottom: 12, fontWeight: 600 }}>Typical budget: {idea.price}</p>
                  <a
                    href={idea.amazonUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 16px",
                      borderRadius: 999,
                      background: "#f97316",
                      color: "#fff",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    Shop on Amazon
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 20 }}>Affiliate Disclosure</h2>
          <p style={{ maxWidth: 720 }}>
            Some links on this page are Amazon affiliate links. If you buy through them, we
            may earn a small commission at no extra cost to you. It helps us keep building
            the quiz and add more curated gift ideas.
          </p>
        </section>
      </section>
    </main>
  );
}
