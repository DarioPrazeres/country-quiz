import { useMemo } from 'react';
import { UseQuestionLogicProps } from '../types/index.ts';
import { generateOptionsWithCorrectAnswer } from '../utils/gameUtils.ts';

export function useQuestionLogic({
  cont,
  questionPosition,
  data,
  continents,
  languages,
  subregions,
  currencies,
}: UseQuestionLogicProps) {
  // Continent Logic
  const continentSelected = useMemo(() => {
    if (cont === 7 && data[questionPosition]) {
      return continents.indexOf(data[questionPosition].continents?.[0] ?? "");
    }
    return null;
  }, [cont, questionPosition, data, continents]);

  const indexContinents = useMemo(() => {
    if (continentSelected !== null) {
      return generateOptionsWithCorrectAnswer(continentSelected, continents.length);
    }
    return [];
  }, [continentSelected, continents.length]);

  // Subregion Logic
  const subregionSelected = useMemo(() => {
    if (cont === 4 && data[questionPosition]) {
      return subregions.indexOf(data[questionPosition].subregion ?? "");
    }
    return null;
  }, [cont, questionPosition, data, subregions]);

  const indexSubregions = useMemo(() => {
    if (subregionSelected !== null) {
      return generateOptionsWithCorrectAnswer(subregionSelected, subregions.length);
    }
    return [];
  }, [subregionSelected, subregions.length]);

  // Languages Logic
  const languagesSelected = useMemo(() => {
    if (cont === 5 && data[questionPosition]?.languages) {
      const langs = Object.values(data[questionPosition].languages);
      const randomLang = langs[Math.floor(Math.random() * langs.length)];
      return languages.indexOf(randomLang);
    }
    return null;
  }, [cont, questionPosition, data, languages]);

  const indexLanguages = useMemo(() => {
    if (languagesSelected !== null) {
      return generateOptionsWithCorrectAnswer(languagesSelected, languages.length);
    }
    return [];
  }, [languagesSelected, languages.length]);

  // Currency Logic
  const currencySelected = useMemo(() => {
    if (cont === 6 && data[questionPosition]?.currencies) {
      const coins = Object.values(data[questionPosition].currencies);
      if (coins.length === 0) return null;

      const randomCoin = coins[Math.floor(Math.random() * coins.length)];
      return currencies.indexOf(randomCoin.name);
    }
    return null;
  }, [cont, questionPosition, data, currencies]);

  const indexCurrencies = useMemo(() => {
    if (currencySelected !== null) {
      return generateOptionsWithCorrectAnswer(currencySelected, currencies.length);
    }
    return [];
  }, [currencySelected, currencies.length]);

  // Borders Logic
  const borderSelected = useMemo(() => {
    if (cont === 9 && data[questionPosition]) {
      const borders = data[questionPosition].borders ?? [];
      if (borders.length === 0) return "NO_BORDERS";

      const randomBorder = borders[Math.floor(Math.random() * borders.length)];
      const borderIndex = data.findIndex((c) => c.cca3 === randomBorder);

      return borderIndex !== -1 ? borderIndex : null;
    }
    return null;
  }, [cont, questionPosition, data]);

  const indexBorders = useMemo(() => {
    if (cont === 9) {
      if (borderSelected === "NO_BORDERS") {
        const randomCountries = generateOptionsWithCorrectAnswer(
          Math.floor(Math.random() * data.length),
          data.length
        ).slice(0, 3);
        const opts = [...randomCountries, "NO_BORDERS"];
        return opts.sort(() => Math.random() - 0.5);
      }
      if (typeof borderSelected === "number") {
        return generateOptionsWithCorrectAnswer(borderSelected, data.length);
      }
    }
    return [];
  }, [cont, borderSelected, data]);

  return {
    continentSelected,
    indexContinents,
    subregionSelected,
    indexSubregions,
    languagesSelected,
    indexLanguages,
    currencySelected,
    indexCurrencies,
    borderSelected,
    indexBorders,
  };
}