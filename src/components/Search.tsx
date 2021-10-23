import React, { useState } from "react";
import { atom, useRecoilState } from "recoil";

const FilterTypes = ["type", "text", "rune"] as const;
type FilterType = typeof FilterTypes[number];

export interface SearchFilter {
  type: FilterType;
  value: string;
}

export const searchFilterState = atom<SearchFilter[]>({
  key: "searchFilters",
  default: [],
});

export function parseSearchString(search: string): SearchFilter[] {
  const text: string[] = [];
  const filters: SearchFilter[] = [];

  search.split(" ").forEach((word) => {
    const [filter, ...rest] = word.split(":");
    if (FilterTypes.includes(filter as FilterType)) {
      filters.push({
        type: filter as FilterType,
        value: rest.join(),
      });
    } else if (word !== "") {
      text.push(word);
    }
  });
  if (text.length > 0) {
    filters.push({
      type: "text",
      value: text.join(" "),
    });
  }
  return filters;
}

export function Search(): JSX.Element {
  const [value, setValue] = useState("");
  const [, setSearchFilters] = useRecoilState(searchFilterState);

  return (
    <div className="self-center m-2 text-black">
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const searchFilters = parseSearchString(value);
            setSearchFilters(searchFilters);
          }
        }}
        value={value}
        onChange={({ target }) =>
          target instanceof HTMLInputElement && setValue(target?.value)
        }
        autoFocus
        type="text"
        placeholder="Search"
        className="rounded p-1"
      />
    </div>
  );
}
