import { useMemo, useEffect } from "react";
import useFetch from "./useFecth.ts";
import { Country } from "../types/index.ts";
import dataOffline from "../data/data.json";

export default function useGameData() {
  const [dataAPI, error] = useFetch("https://restcountries.com/v3.1/all");
  
  const data = useMemo(() => {
    return error || !dataAPI ? dataOffline : dataAPI;
  }, [dataAPI, error]);

  const languages = useMemo(() => {
    if (!data) return [];
    return [
      ...new Set(
        data
          .filter((c: Country) => c.languages)
          .flatMap((c: Country) => Object.values(c.languages || {}))
      ),
    ];
  }, [data]);

  const currencies = useMemo(() => {
    if (!data) return ["No Currency"];
    const currencyList = [
      ...new Set(
        data
          .filter((c: Country) => c.currencies)
          .flatMap((c: Country) => 
            Object.values(c.currencies || {}).map((currency) => currency.name)
          )
      ),
      "No Currency"
    ];
    return currencyList;
  }, [data]);

  const subregions = useMemo(() => {
    if (!data) return [];
    return [
      ...new Set(
        data
          .filter((c: Country) => c.subregion)
          .map((c: Country) => c.subregion)
      ),
    ];
  }, [data]);

  return {
    data,
    languages,
    currencies,
    subregions,
  };
}