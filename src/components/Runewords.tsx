import runewords from "../data/runewords.json";
import React, { useMemo } from "react";
import { RunePng, selectedRuneState } from "./RunePng";
import { useRecoilState } from "recoil";
import { Column, useTable } from "react-table";

type RunewordType = typeof runewords[number];

export function Runewords(): JSX.Element {
  const [selectedRune] = useRecoilState(selectedRuneState);
  const data = runewords.filter((runeworld) =>
    runeworld.runes.includes(selectedRune ?? "")
  );
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
