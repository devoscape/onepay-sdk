export const Currency = {
  USD: "USD",
  LKR: "LKR",
} as const;

export type CurrencyType = keyof typeof Currency;
