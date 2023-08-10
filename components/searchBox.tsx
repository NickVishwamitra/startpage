import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { goToSearchSite, useSearchQuery } from "@/lib/utils";
import { useDebouncedValue } from "@mantine/hooks";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { SiDuckduckgo, SiBrave } from "react-icons/si";
import { FaCheck } from "react-icons/fa";
import { searchEngines } from "@/lib/types";
import { useAtom } from "jotai/react";
import { searchEngineAtom } from "@/lib/atoms";

const SearchBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInput] = useDebouncedValue(inputValue, 500);
  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);
  const [currentEngine, setCurrentEngine] =
    useAtom<searchEngines>(searchEngineAtom);

  const { data } = useSearchQuery(debouncedInput.trim());
  const router = useRouter();

  const submitSearch = () => {
    if (inputValue.length > 5) {
      goToSearchSite(router, inputValue, currentEngine);
    }
  };

  return (
    <div className="z-10 flex w-full gap-2 md:max-w-2xl">
      <DropdownMenu>
        <SearchEngineButton currentEngine={currentEngine} />
        <DropdownMenuContent>
          <DropdownMenuLabel>Search Engine</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <SearchEngineDropdownItem
            currentEngine={currentEngine}
            engine="DuckDuckGo"
            setCurentEngine={setCurrentEngine}
          />
          <SearchEngineDropdownItem
            currentEngine={currentEngine}
            engine="Brave"
            setCurentEngine={setCurrentEngine}
          />
        </DropdownMenuContent>
      </DropdownMenu>
      <Command className="border-b-5" shouldFilter={false}>
        <CommandInput
          onFocus={() => setAutoCompleteOpen(true)}
          onBlur={() => setAutoCompleteOpen(false)}
          value={inputValue}
          onValueChange={(value) => setInputValue(value)}
          className="w-full"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setAutoCompleteOpen(false);
            }
            if (e.key === "Enter" && !autoCompleteOpen) {
              submitSearch();
            }
          }}
          placeholder="Search..."
          submitSearch={submitSearch}
          buttonDisabled={inputValue.length < 5}
        />
        {autoCompleteOpen && inputValue && (
          <CommandGroup className="mt-0.5">
            <CommandItem
              value={inputValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setInputValue(inputValue);
                }
              }}
              onSelect={() => {
                setInputValue(inputValue);
                setAutoCompleteOpen(false);
              }}
              onClick={() => {
                setInputValue(inputValue);
                setAutoCompleteOpen(false);
              }}
            >
              {inputValue}
            </CommandItem>
            {data?.data.map(
              (item: any) =>
                item.phrase !== inputValue && (
                  <CommandItem
                    key={item.phrase}
                    value={item.phrase}
                    className="cursor-pointer"
                    onPointerDown={() => setInputValue(item.phrase)}
                    onSelect={() => setInputValue(item.phrase)}
                  >
                    {item.phrase}
                  </CommandItem>
                ),
            )}
          </CommandGroup>
        )}
      </Command>
    </div>
  );
};

export default SearchBox;

const SearchEngineDropdownItem = ({
  engine,
  currentEngine,
  setCurentEngine,
}: {
  engine: searchEngines;
  currentEngine: searchEngines;
  setCurentEngine: Dispatch<SetStateAction<searchEngines>>;
}) => {
  return (
    <DropdownMenuItem
      className="flex gap-2"
      onClick={() => setCurentEngine(engine)}
    >
      {currentEngine === engine ? (
        <FaCheck className="mr-1 h-3 w-3" />
      ) : (
        <div className="mr-1 h-3 w-3"></div>
      )}
      {engine === "DuckDuckGo" ? (
        <SiDuckduckgo className="text-xl text-[#de5833]"></SiDuckduckgo>
      ) : engine === "Brave" ? (
        <SiBrave className="text-xl text-orange-600"></SiBrave>
      ) : null}
      <span className="">{engine}</span>
    </DropdownMenuItem>
  );
};

const SearchEngineButton = ({
  currentEngine,
}: {
  currentEngine: searchEngines;
}) => {
  return (
    <DropdownMenuTrigger asChild>
      <Button className="flex w-fit bg-zinc-950 p-2" variant="ghost">
        {currentEngine === "DuckDuckGo" ? (
          <SiDuckduckgo className="text-2xl text-[#de5833]" />
        ) : currentEngine === "Brave" ? (
          <SiBrave className="text-2xl text-orange-600"></SiBrave>
        ) : null}
      </Button>
    </DropdownMenuTrigger>
  );
};
