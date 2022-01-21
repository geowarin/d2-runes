import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectSearchFilters, setSearchFilters } from "@/store/search.slice";

export function SelectableRunePng({ name }: { name: string }): JSX.Element {
  const searchFilters = useAppSelector(selectSearchFilters);
  const dispatch = useAppDispatch();

  const selected = searchFilters.some(
    (f) => f.type === "rune" && f.value === name
  );

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
      style={selected ? { filter: "invert(75%)" } : {}}
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
  const searchFilters = useAppSelector(selectSearchFilters);
  const selected = searchFilters.some(
    (f) => f.type === "rune" && f.value === name
  );
  return (
    <img
      style={selected ? { filter: "invert(75%)" } : {}}
      src={`img/runes/${name.toLowerCase()}.png`}
      width={30}
      height={30}
      alt={name}
      title={name}
    />
  );
}
