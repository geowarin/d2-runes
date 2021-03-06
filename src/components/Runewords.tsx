import runewords from "../data/runewords.json";
import { useMemo, useState } from "react";
import { RunePng } from "./RunePng";
import DataGrid, {
  Column,
  FormatterProps,
  RowHeightArgs,
  SortColumn,
} from "react-data-grid";
import { SearchFilter, selectSearchFilters } from "@/store/search.slice";
import { useAppSelector } from "@/store/hooks";

export type RunewordType = typeof runewords[number];

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
      width: 40,
    },
    {
      name: "Type",
      key: "type",
      width: 160,
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
              <img width={20} src={`img/icons/${type}.svg`} />
              {type}
            </div>
          ))}
        </div>
      ),
    },
    {
      name: "Runes",
      key: "runes",
      sortable: false,
      width: 60,
      formatter: ({ row }: FormatterProps<RunewordType>) => (
        <div className="flex flex-col h-full justify-center">
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
      sortable: false,
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

type Comparator = (a: RunewordType, b: RunewordType) => number;

function getComparator(sortColumn: string): Comparator {
  switch (sortColumn) {
    case "name":
    case "type":
      return (a, b) => a[sortColumn].localeCompare(b[sortColumn]);
    case "level":
      return (a, b) => a[sortColumn] - b[sortColumn];
    case "runes":
    case "stats":
      return (a, b) => a[sortColumn].join().localeCompare(b[sortColumn].join());
    default:
      throw new Error(`unsupported sortColumn: "${sortColumn}"`);
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

export function Runewords(): JSX.Element {
  const searchFilters = useAppSelector(selectSearchFilters);
  const rows = filterRunewords(runewords, searchFilters);
  const columns = useMemo(getColumns, []);
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([
    {
      columnKey: "level",
      direction: "ASC",
    },
  ]);

  const sortedRows = useMemo((): readonly RunewordType[] => {
    if (sortColumns.length === 0) return rows;

    const sortedRows = [...rows];
    sortedRows.sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === "ASC" ? compResult : -compResult;
        }
      }
      return 0;
    });
    return sortedRows;
  }, [rows, sortColumns]);

  return (
    <DataGrid
      className={"rdg-dark"}
      style={{
        height: "100%",
        "--color": "white",
        "--background-color": "#222a38",
        "--row-hover-background-color": "#2b2a33",
        "--header-background-color": "#2b2a33",
        "--border-color": "gray",
      }}
      columns={columns}
      rows={sortedRows}
      defaultColumnOptions={{
        sortable: true,
        resizable: true,
      }}
      sortColumns={sortColumns}
      onSortColumnsChange={setSortColumns}
      rowHeight={(args: RowHeightArgs<RunewordType>) =>
        args.type === "ROW" ? args.row.stats.length * 20 : 20
      }
    />
  );
}
