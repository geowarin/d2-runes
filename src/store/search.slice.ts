import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchFilters: SearchFilter[];
}

const initialState: SearchState = {
  searchFilters: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchFilters = parseSearchString(action.payload);
    },
    setSearchFilters: (state, action: PayloadAction<SearchFilter[]>) => {
      state.searchFilters = action.payload;
    },
  },
});

const FilterTypes = ["type", "text", "rune"] as const;
type FilterType = typeof FilterTypes[number];

export interface SearchFilter {
  type: FilterType;
  value: string;
}

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
    });
}

export default searchSlice.reducer;

export const { setSearchString, setSearchFilters } = searchSlice.actions;
// export const selectCount = (state: RootState) => state.counter.value;

// export const search = {
//   actions: searchSlice.actions,
//   // selectors: {
//   //   selectCount,
//   // },
// };
