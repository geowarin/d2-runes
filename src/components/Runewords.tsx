import runewords from "../data/runewords.json";
import React from "react";
import { RunePng, selectedRuneState } from "./RunePng";
import { useRecoilState } from "recoil";

type RunewordType = typeof runewords[number];

function Runeword({ runeword }: { runeword: RunewordType }): JSX.Element {
  return (
    <div className="flex pt-3">
      <div className="w-30">
        {runeword.type.split("/").map((type) => (
          <div>
            <img width={20} src={`/img/icons/${type}.svg`} />
            {type}
          </div>
        ))}
      </div>
      <div className="flex flex-col w-1/3">
        <div>{runeword.name}</div>
        <div className="flex">
          {runeword.runes.map((rune) => (
            <RunePng name={rune} />
          ))}
        </div>
      </div>
      <div>
        {runeword.stats.map((stat) => (
          <div>{stat}</div>
        ))}
      </div>
    </div>
  );
}

export function Runewords(): JSX.Element {
  const [selectedRune] = useRecoilState(selectedRuneState);
  const selected = runewords.filter((runeworld) =>
    runeworld.runes.includes(selectedRune ?? "")
  );

  return (
    <div>
      {selected.map((runeword) => {
        return <Runeword runeword={runeword} />;
      })}
    </div>
  );
}
