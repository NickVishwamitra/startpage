import { atomWithStorage } from "jotai/utils";
import { searchEngines } from "./types";

export const searchEngineAtom = atomWithStorage<searchEngines>(
  "searchEngine",
  "DuckDuckGo",
);
