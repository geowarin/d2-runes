import runes from "@/data/runes.json";
import { SelectableRunePng } from "@/components/RunePng";
import React from "react";
// import runewords from "@/data/runewords.json";

// const greatRunes = new Set(
//   runewords.filter((rw) => rw.isGreat).flatMap((rw) => rw.runes)
// );

export function RuneList(): JSX.Element {
  return (
    <>
      {runes.map((rune) => (
        <div className="flex justify-center">
          <SelectableRunePng name={rune.name} />
          <span
            // className={`${greatRunes.has(rune.name) ? "text-yellow-300" : ""}`}
          >
            {rune.name}
          </span>
        </div>
      ))}
    </>
  );
}
