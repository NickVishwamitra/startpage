import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { NextRouter } from "next/router";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useSearchQuery = (debouncedInput: string) => {
  const { data } = useQuery<{
    data: Array<{
      phrase: string;
    }>;
  }>(
    ["suggestions query", debouncedInput],
    async () =>
      axios.get(
        `/api/searchAutocomplete?query=${debouncedInput.replaceAll(" ", "+")}`,
      ),
    { enabled: !!debouncedInput && debouncedInput.length > 5 },
  );

  return { data };
};

export const goToSearchSite = (router: NextRouter, query: string) => {
  router.push(
    `https://duckduckgo.com/?hps=1&q=${query.replaceAll(" ", "+")}&ia=web`,
  );
};
