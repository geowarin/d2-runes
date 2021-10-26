import React from "react";
import { useRecoilState } from "recoil";
import { searchFilterState } from "@/components/Search";

export function SelectableRunePng({ name }: { name: string }): JSX.Element {
  const [searchFilter, setSearchFilter] = useRecoilState(searchFilterState);
  const over = searchFilter.some((f) => f.type === "rune" && f.value === name);
  function addOrReplaceRuneFilter() {
    setSearchFilter((filters) => {
      return filters
        .filter((f) => f.type !== "rune")
        .concat({
          type: "rune",
          value: name,
        });
    });
  }
  return (
    <img
      style={over ? { filter: "invert(75%)" } : {}}
      onClick={() => addOrReplaceRuneFilter()}
      src={`img/runes/${name.toLowerCase()}.png`}
      width={30}
      height={30}
      alt={name}
      title={name}
    />
  );
}

export function RunePng({ name }: { name: string }) {
  const [searchFilter] = useRecoilState(searchFilterState);
  const over = searchFilter.some((f) => f.type === "rune" && f.value === name);
  return (
    <img
      style={over ? { filter: "invert(75%)" } : {}}
      src={`img/runes/${name.toLowerCase()}.png`}
      width={30}
      height={30}
      alt={name}
      title={name}
    />
  );
}
