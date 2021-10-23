import { parseSearchString } from "@/components/Search";

describe("parseSearchString", function () {
  it("should parse empty", function () {
    const searchFilters = parseSearchString("");
    expect(searchFilters).toEqual([]);
  });

  it("should default to text", function () {
    const searchFilters = parseSearchString("Honor");
    expect(searchFilters).toEqual([
      {
        type: "text",
        value: "Honor",
      },
    ]);
  });
  it("should parse type", function () {
    const searchFilters = parseSearchString("type:Melee");
    expect(searchFilters).toEqual([
      {
        type: "type",
        value: "Melee",
      },
    ]);
  });
  it("should parse type + text", function () {
    const searchFilters = parseSearchString("stuff type:Melee staff");
    expect(searchFilters).toEqual([
      {
        type: "type",
        value: "Melee",
      },
      {
        type: "text",
        value: "stuff staff",
      },
    ]);
  });
});
