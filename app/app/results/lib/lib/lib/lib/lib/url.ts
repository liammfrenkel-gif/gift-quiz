export function buildResultsUrl(payload: any) {
  const sp = new URLSearchParams();
  sp.set("who", payload.who);
  sp.set("profile", payload.profile);
  sp.set("interests", (payload.interests || []).join("|"));

  sp.set("budget", payload.answers?.budget || "");
  sp.set("vibe", payload.answers?.vibe || "");
  sp.set("boldness", payload.answers?.boldness || "");

  return `/results?${sp.toString()}`;
}

export function decodeResultsQuery(searchParams: Record<string, string | string[]>) {
  const get = (k: string) => {
    const v = searchParams[k];
    return Array.isArray(v) ? v[0] : v || "";
  };

  const interests = get("interests")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    who: get("who"),
    profile: get("profile"),
    interests,
    answers: {
      budget: get("budget"),
      vibe: get("vibe"),
      boldness: get("boldness"),
    },
  };
}
