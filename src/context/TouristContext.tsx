"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionaries } from "@/lib/dictionaries";

type Lang = "az" | "en" | "ru";
type Currency = "AZN" | "USD" | "RUB";

const rates = { AZN: 1, USD: 1.7, RUB: 0.02 };
const symbols = { AZN: "₼", USD: "$", RUB: "₽" };
const langToCurrency: Record<Lang, Currency> = { az: "AZN", en: "USD", ru: "RUB" };

interface TouristContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  t: (key: keyof typeof dictionaries.az, vars?: Record<string, string>) => string;
  formatPrice: (azn: number) => string;
  currencySymbol: string;
}

const TouristContext = createContext<TouristContextType | null>(null);

export function TouristProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("az");
  const [currency, setCurrencyState] = useState<Currency>("AZN");

  useEffect(() => {
    const savedLang = localStorage.getItem("nf_lang") as Lang | null;
    if (savedLang && langToCurrency[savedLang]) {
      setLangState(savedLang);
      setCurrencyState(langToCurrency[savedLang]);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("nf_lang", l);
    setCurrencyState(langToCurrency[l]);
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
  };

  const t = (key: keyof typeof dictionaries.az, vars?: Record<string, string>) => {
    let text = dictionaries[lang][key] || dictionaries["az"][key];
    if (vars) {
      Object.keys(vars).forEach(k => { text = text.replace(`{${k}}`, vars[k]); });
    }
    return text;
  };

  const formatPrice = (azn: number) => {
    const converted = azn / rates[currency];
    return `${symbols[currency]} ${converted.toFixed(currency === "USD" ? 2 : 0)}`;
  };

  return (
    <TouristContext.Provider value={{ lang, setLang, currency, setCurrency, t, formatPrice, currencySymbol: symbols[currency] }}>
      {children}
    </TouristContext.Provider>
  );
}

export const useTourist = () => {
  const ctx = useContext(TouristContext);
  if (!ctx) throw new Error("useTourist must be used within TouristProvider");
  return ctx;
};