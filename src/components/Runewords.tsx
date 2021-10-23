import runewords from "../data/runewords.json";
import React, { useMemo } from "react";
import { RunePng } from "./RunePng";
import { selector, useRecoilValue } from "recoil";
import { Column, useTable } from "react-table";
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

export function Runewords(): JSX.Element {
  const data = useRecoilValue(filteredRunewordsState);
  const columns: Column<RunewordType>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: (runeword) => runeword.name,
      },
      {
        Header: "Level",
        accessor: (runeword) => runeword.level,
      },
      {
        Header: "Type",
        accessor: (runeword) =>
          runeword.type.split("/").map((type) => (
            <div>
              <img width={20} src={`/img/icons/${type}.svg`} />
              {type}
            </div>
          )),
      },
      {
        Header: "Runes",
        accessor: (runeword) => (
          <div className="flex">
            {runeword.runes.map((rune) => (
              <div className="text-center">
                <RunePng name={rune} />
                {rune}
              </div>
            ))}
          </div>
        ),
      },
      {
        Header: "Stats",
        accessor: (runeword) => runeword.stats.map((stat) => <div>{stat}</div>),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: "solid 1px gray" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="header">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      // background: "papayawhip",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
