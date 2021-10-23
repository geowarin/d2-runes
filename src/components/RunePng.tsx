import React from "react";
import { atom, useRecoilState } from "recoil";

export const selectedRuneState = atom<string | undefined>({
  key: "selectedRune",
  default: "Tir",
});

export function RunePng({ name }: { name: string }): JSX.Element {
  const [selectedRune, setSelectedRune] = useRecoilState(selectedRuneState);
  const over = selectedRune === name;
  return (
    <img
      style={over ? { filter: "invert(75%)" } : {}}
      onMouseOver={() => setSelectedRune(name)}
      // onMouseOut={() => setSelectedRune(undefined)}
      src={`/img/runes/${name.toLowerCase()}.png`}
      width={30}
      height={30}
      alt={name}
      title={name}
    />
  );
}
