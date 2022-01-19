import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { serializeSearchFilters, setSearchString } from "@/store/search.slice";

export function Search(): JSX.Element {
  const search = useAppSelector((state) =>
    serializeSearchFilters(state.search.searchFilters)
  );
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(search);
  }, [search]);
  return (
    <div className="self-center m-2 text-black">
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch(setSearchString(value));
          }
        }}
        value={value}
        onChange={({ target }) =>
          target instanceof HTMLInputElement && setValue(target?.value)
        }
        autoFocus
        type="text"
        placeholder="Search"
        className="rounded p-1"
      />
    </div>
  );
}
