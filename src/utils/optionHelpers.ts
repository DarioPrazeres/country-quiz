import { Country } from '../types';
import { formatArea, formatPopulation } from './gameUtils.ts';

export function getOptionValue(
  cont: number,
  pos: number,
  currentPosition: number,
  indexContinents: number[],
  indexLanguages: number[],
  indexSubregions: number[],
  indexCurrencies: number[],
  indexBorders: (number | string)[]
): number | string {
  if (cont === 7) return indexContinents[pos];
  if (cont === 5) return indexLanguages[pos];
  if (cont === 4) return indexSubregions[pos];
  if (cont === 6) return indexCurrencies[pos];
  if (cont === 9) return indexBorders[pos];

  return currentPosition + 4 >= 250
    ? currentPosition - pos
    : currentPosition + pos;
}

export function getOptionText(
  valuePos: number | string,
  cont: number,
  data: Country[],
  continents: string[],
  languages: string[],
  subregions: string[],
  currencies: string[]
): string {
  if (cont === 9 && valuePos === "NO_BORDERS") {
    return "No Borders";
  }

  const country = typeof valuePos === "number" ? data[valuePos] : null;
  if (!country) return "";

  switch (cont) {
    case 2:
      return formatArea(country.area || 0);
    case 3:
      return formatPopulation(country.population || 0);
    case 4:
      return subregions[valuePos as number] || "";
    case 7:
      return continents[valuePos as number] || "";
    case 5:
      return languages[valuePos as number] || "";
    case 6:
      return currencies[valuePos as number] || "No Currency";
    case 9:
      return country.name.common;
    default:
      return country.name.common || "";
  }
}

export function isCorrectAnswer(
  chosenIndex: number | string,
  cont: number,
  continentSelected: number | null,
  languagesSelected: number | null,
  subregionSelected: number | null,
  currencySelected: number | null,
  borderSelected: number | string | null,
  questionPosition: number
): boolean {
  switch (cont) {
    case 7:
      return chosenIndex === continentSelected;
    case 5:
      return chosenIndex === languagesSelected;
    case 4:
      return chosenIndex === subregionSelected;
    case 6:
      return currencySelected !== null && chosenIndex === currencySelected;
    case 9:
      return chosenIndex === borderSelected;
    default:
      return chosenIndex === questionPosition;
  }
}

export const getQuestionTypeInfo = (type: number) => {
  const types = {
    1: { label: 'Country Name', icon: '🏛️', color: '#4f46e5' },
    2: { label: 'Area', icon: '📏', color: '#059669' },
    3: { label: 'Population', icon: '👥', color: '#dc2626' },
    4: { label: 'Subregion', icon: '🗺️', color: '#7c3aed' },
    5: { label: 'Language', icon: '🗣️', color: '#ea580c' },
    6: { label: 'Currency', icon: '💰', color: '#0891b2' },
    7: { label: 'Continent', icon: '🌍', color: '#16a34a' },
    8: { label: 'Location', icon: '📍', color: '#c2410c' },
    9: { label: 'Borders', icon: '🗾', color: '#9333ea' }
  };
  
  return types[type as keyof typeof types] || { 
    label: 'Geography', 
    icon: '❓', 
    color: '#6b7280' 
  };
};