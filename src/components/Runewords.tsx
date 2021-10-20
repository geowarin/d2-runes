import runewords from "../data/runewords.json";
import React from "react";
import { Rune } from "./Rune";
import { RunePng } from "./RunePng";

function Runewords(): JSX.Element {
  return (
    <div>
      {runewords.map((runeword) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>{runeword.name}</div>
            <div>
              {runeword.runes.map((rune) => (
                <RunePng name={rune} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
