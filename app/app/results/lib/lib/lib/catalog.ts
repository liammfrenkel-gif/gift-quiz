export type Product = {
  id: string;
  name: string;
  amazonUrl: string; // replace with your affiliate link later
  tags: string[];
  priceTier: "under_30" | "30_75" | "75_plus";
  why: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "sports-1",
    name: "Insulated Sports Tumbler",
    amazonUrl: "https://www.amazon.com/?tag=YOURTAG-20",
    tags: ["Sports", "practical", "safe", "friend", "parent"],
    priceTier: "30_75",
    why: "Useful, durable, and works for almost anyone into sports.",
  },
  {
    id: "cooking-1",
    name: "Chef’s Knife (Starter Tier)",
    amazonUrl: "https://www.amazon.com/?tag=YOURTAG-20",
    tags: ["Cooking", "practical", "bold", "parent", "friend"],
    priceTier: "75_plus",
    why: "A real upgrade that gets used every day.",
  },
  {
    id: "gardening-1",
    name: "Indoor Herb Garden Kit",
    amazonUrl: "https://www.amazon.com/?tag=YOURTAG-20",
    tags: ["Gardening", "fun", "safe", "friend", "parent"],
    priceTier: "30_75",
    why: "Thoughtful, hands-on, and easy even for beginners.",
  },
  {
    id: "tech-1",
    name: "Wireless Phone Stand Charger",
    amazonUrl: "https://www.amazon.com/?tag=YOURTAG-20",
    tags: ["Tech", "practical", "safe", "coworker", "friend"],
    priceTier: "30_75",
    why: "Modern and useful without needing to know exact taste.",
  },
  {
    id: "coffee-1",
    name: "Coffee Sampler Gift Box",
    amazonUrl: "https://www.amazon.com/?tag=YOURTAG-20",
    tags: ["Coffee", "fun", "bold", "friend", "romantic"],
    priceTier: "30_75",
    why: "Feels curated and personal without being risky.",
  },
];
