import runes from "@/data/runes.json";
import { SelectableRunePng } from "@/components/RunePng";

export function RuneList(): JSX.Element {
  return (
    <div>
      {runes.map((rune) => (
        <div className="flex justify-items-start px-3">
          <SelectableRunePng name={rune.name} />
          <span style={{ lineHeight: "30px" }}>{rune.name}</span>
        </div>
      ))}
    </div>
  );
}
