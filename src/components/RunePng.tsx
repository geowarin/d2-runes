import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchFilters } from "@/store/search.slice";

export function SelectableRunePng({ name }: { name: string }): JSX.Element {
  const searchFilters = useAppSelector((state) => state.search.searchFilters);
  const dispatch = useAppDispatch();

  const over = searchFilters.some((f) => f.type === "rune" && f.value === name);

  function addOrReplaceRuneFilter() {
    const newFilters = searchFilters
      .filter((f) => f.type !== "rune")
      .concat({
        type: "rune",
        value: name,
      });
    dispatch(setSearchFilters(newFilters));
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
  const searchFilters = useAppSelector((state) => state.search.searchFilters);
  const over = searchFilters.some((f) => f.type === "rune" && f.value === name);
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
