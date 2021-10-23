import React, { useEffect, useState } from "react";
import { atom, DefaultValue, selector, useRecoilState } from "recoil";

const FilterTypes = ["type", "text", "rune"] as const;
type FilterType = typeof FilterTypes[number];

export interface SearchFilter {
  type: FilterType;
  value: string;
}

export const searchStringState = atom<string>({
  key: "searchStringState",
  default: "",
});

export const searchFilterState = selector<SearchFilter[]>({
  key: "searchFilterState",
  get: ({ get }) => {
    const search = get(searchStringState);
    return parseSearchString(search);
  },
  set: ({ set }, newValue) => {
    set(
      searchStringState,
      newValue instanceof DefaultValue
        ? newValue
        : serializeSearchFilters(newValue)
    );
  },
});

export function serializeSearchFilters(searchFilter: SearchFilter[]): string {
  return searchFilter
    .map((filter) => {
      if (filter.type === "text") {
        return `${filter.value}`;
      }
      return `${filter.type}:${filter.value}`;
    })
    .join(" ");
}

export function parseSearchString(search: string): SearchFilter[] {
  return search
    .split(" ")
    .filter((s) => s !== "")
    .map((word) => {
      const [filter, ...rest] = word.split(":");
      if (FilterTypes.includes(filter as FilterType)) {
        return {
          type: filter as FilterType,
          value: rest.join(),
        };
      }
      return {
        type: "text" as const,
        value: word,
      };
    })
    .reduce(mergeConsecutiveTextFilters, [] as SearchFilter[]);
}

function mergeConsecutiveTextFilters(
  acc: SearchFilter[],
  curr: SearchFilter
): SearchFilter[] {
  const lastFilter = acc[acc.length - 1];
  if (
    curr.type === "text" &&
    lastFilter !== undefined &&
    lastFilter.type === "text"
  ) {
    lastFilter.value += " " + curr.value;
  } else {
    acc.push(curr);
  }
  return acc;
}

export function Search(): JSX.Element {
  const [search, setSearch] = useRecoilState(searchStringState);
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(search);
  }, [search]);
  return (
    <div className="self-center m-2 text-black">
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSearch(value);
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
