import type { Product } from "@/lib/catalog";

function includesAny(haystack: string[], needles: string[]) {
  return needles.some((n) => haystack.includes(n));
}

export function recommendGifts(payload: any, products: Product[]) {
  const { profile, interests, answers } = payload;

  const profileTag =
    profile === "romantic"
      ? "romantic"
      : profile === "parent"
      ? "parent"
      : profile === "coworker"
      ? "coworker"
      : "friend";

  return products
    .filter((p) => (answers?.budget ? p.priceTier === answers.budget : true))
    .map((p) => {
      let score = 0;

      if (includesAny(p.tags, interests || [])) score += 5;
      if (answers?.vibe && p.tags.includes(answers.vibe)) score += 2;
      if (answers?.boldness && p.tags.includes(answers.boldness)) score += 1;
      if (p.tags.includes(profileTag)) score += 2;

      return { p, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}
