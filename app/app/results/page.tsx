import { decodeResultsQuery } from "@/lib/url";
import { recommendGifts } from "@/lib/recommend";
import { PRODUCTS } from "@/lib/catalog";

export default function ResultsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  const payload = decodeResultsQuery(searchParams);
  const picks = recommendGifts(payload, PRODUCTS).slice(0, 5);

  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: 20, fontFamily: "system-ui" }}>
      <h1>Your gift picks</h1>
      <p>
        For <b>{payload.who}</b> • Interests: <b>{payload.interests.join(", ")}</b>
      </p>
      <p style={{ fontSize: 12, opacity: 0.7 }}>
        Disclosure: As an Amazon Associate I earn from qualifying purchases.
      </p>

      {/* IMPORTANT: NO ADS ON THIS PAGE */}

      {picks.map((p) => (
        <div key={p.id} style={{ border: "1px solid #eee", padding: 14, borderRadius: 12, marginTop: 12 }}>
          <h3>{p.name}</h3>
          <p>{p.why}</p>
          <a
            href={p.amazonUrl}
            target="_blank"
            rel="nofollow sponsored noopener"
            style={{
              display: "inline-block",
              marginTop: 8,
              padding: "10px 14px",
              borderRadius: 10,
              background: "black",
              color: "white",
              textDecoration: "none",
            }}
          >
            View on Amazon
          </a>
        </div>
      ))}

      <p style={{ marginTop: 16 }}>
        <a href="/">← Start over</a>
      </p>
    </main>
  );
}
