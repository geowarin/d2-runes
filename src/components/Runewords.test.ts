import { match, RunewordType } from "@/components/Runewords";
import { SearchFilter } from "@/components/Search";

describe("match", function () {
  const runeword: RunewordType = {
    name: "Toto",
    runes: [],
    type: "Shields",
    level: 42,
    sockets: "3",
    stats: [],
  };

  it("should match text", function () {
    const filter: SearchFilter = {
      type: "text",
      value: "toto",
    };
    expect(match(filter, runeword)).toBeTruthy();
  });

  it("should match type", function () {
    const filter: SearchFilter = {
      type: "type",
      value: "shield",
    };
    expect(match(filter, runeword)).toBeTruthy();
  });
});
