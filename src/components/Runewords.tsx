import runewords from "../data/runewords.json";
import React, { useMemo } from "react";
import { RunePng } from "./RunePng";
import { selector, useRecoilValue } from "recoil";
import DataGrid, {
  Column,
  FormatterProps,
  RowHeightArgs,
} from "react-data-grid";
import { SearchFilter, searchFilterState } from "@/components/Search";

export type RunewordType = typeof runewords[number];

export function match(filter: SearchFilter, runeword: RunewordType): boolean {
  const searchString = filter.value.toLowerCase();
  switch (filter.type) {
    case "text":
      return (
        runeword.name.toLowerCase().includes(searchString) ||
        runeword.stats.join().toLowerCase().includes(searchString) ||
        runeword.runes.join().toLowerCase().includes(searchString)
      );
    case "type":
      return runeword.type.toLowerCase().includes(searchString);
    case "rune":
      return runeword.runes.some((r) => r.toLowerCase().includes(searchString));
  }
}

function filterRunewords(
  runewords: RunewordType[],
  filters: SearchFilter[]
): RunewordType[] {
  if (filters.length === 0) {
    return runewords;
  }

  return runewords.filter((runeword) => {
    return filters.every((filter) => match(filter, runeword));
  });
}

const filteredRunewordsState = selector<RunewordType[]>({
  key: "filteredRunewordsState",
  get: ({ get }) => {
    const searchFilters = get(searchFilterState);
    return filterRunewords(runewords, searchFilters);
  },
});

function getColumns(): readonly Column<RunewordType, never>[] {
  return [
    {
      name: "Name",
      key: "name",
      formatter: ({ row }: FormatterProps<RunewordType>) => (
        <div className={`${row.isGreat ? "text-yellow-300" : ""}`}>
          {row.name}
        </div>
      ),
    },
    {
      name: "Level",
      key: "level",
    },
    {
      name: "Type",
      key: "type",
      formatter: ({ row }: FormatterProps<RunewordType>) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
          }}
        >
          {row.type.split("/").map((type) => (
            <div className="flex" style={{ lineHeight: "22px" }}>
              <img width={20} src={`/img/icons/${type}.svg`} />
              {type}
            </div>
          ))}
        </div>
      ),
    },
    {
      name: "Runes",
      key: "runes",
      formatter: ({ row }: FormatterProps<RunewordType>) => (
        <div>
          {row.runes.map((rune) => (
            <div
              style={{ lineHeight: "20px" }}
              className="text-center flex justify-center items-center"
            >
              <RunePng name={rune} />
              {rune}
            </div>
          ))}
        </div>
      ),
    },
    {
      name: "Stats",
      key: "stats",
      formatter: ({ row }: FormatterProps<RunewordType>) => (
        <>
          {row.stats.map((stat) => (
            <div style={{ lineHeight: "20px" }}>{stat}</div>
          ))}
        </>
      ),
    },
  ];
}

export function Runewords(): JSX.Element {
  const data = useRecoilValue(filteredRunewordsState);
  const columns = useMemo(getColumns, []);

  return (
    <DataGrid
      className={"rdg-dark"}
      style={{ height: "100%" }}
      columns={columns}
      rows={data}
      defaultColumnOptions={{
        sortable: true,
        resizable: true,
      }}
      rowHeight={(args: RowHeightArgs<RunewordType>) =>
        args.type === "ROW" ? args.row.stats.length * 20 : 20
      }
    />
  );
}
