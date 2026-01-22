export type QuizProfile =
  | "romantic"
  | "parent"
  | "friend"
  | "coworker"
  | "new_relationship"
  | "hard_to_buy";

export type QuizAnswers = {
  relationshipStage: string;
  budget: string;
  vibe: string;
  boldness: string;
  occasion: string;
};

export function classifyRecipient(input: string): QuizProfile {
  const s = input.toLowerCase();

  if (s.includes("girlfriend") || s.includes("boyfriend") || s.includes("wife") || s.includes("husband"))
    return "romantic";
  if (s.includes("dad") || s.includes("mom") || s.includes("parent"))
    return "parent";
  if (s.includes("coworker") || s.includes("boss"))
    return "coworker";
  if (s.includes("new") || s.includes("first date"))
    return "new_relationship";
  if (s.includes("everything") || s.includes("hard"))
    return "hard_to_buy";

  return "friend";
}

export function getQuestionSet(profile: QuizProfile) {
  return [
    {
      key: "budget",
      label: "Budget?",
      options: [
        { label: "Under $30", value: "under_30" },
        { label: "$30–$75", value: "30_75" },
        { label: "$75+", value: "75_plus" },
      ],
    },
    {
      key: "vibe",
      label: "Gift style?",
      options: [
        { label: "Practical", value: "practical" },
        { label: "Sentimental", value: "sentimental" },
        { label: "Fun", value: "fun" },
      ],
    },
    {
      key: "boldness",
      label: "How bold?",
