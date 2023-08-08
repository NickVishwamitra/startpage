import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { goToSearchSite, useSearchQuery } from "@/lib/utils";
import { useDebouncedValue } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useState } from "react";

const SearchBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInput] = useDebouncedValue(inputValue, 500);
  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);

  const { data } = useSearchQuery(debouncedInput.trim());
  const router = useRouter();

  const submitSearch = () => {
    if (inputValue.length > 5) {
      goToSearchSite(router, inputValue);
    }
  };

  return (
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
  );
};

export default SearchBox;
