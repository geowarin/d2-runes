import runes from "./data/runes.json";
import runewords from "./data/runewords.json";
import { createElement } from "preact";
import JSX = createElement.JSX;
import { useState } from "preact/compat";
import { El } from "./runes/El";

function RuneList(): JSX.Element {
  return (
    <ul>
      {runes.map((rune) => (
        <li>
          <Rune name={rune.name} />
          {rune.name}
        </li>
      ))}
    </ul>
  );
}

function Rune({ name }: { name: string }): JSX.Element {
  const [over, setOver] = useState(false);
  return (
    <img
      style={over ? { filter: "invert(75%)" } : {}}
      onMouseOver={() => setOver(true)}
      onMouseOut={() => setOver(false)}
      src={`/img/runes/${name.toLowerCase()}.png`}
      width={30}
      height={30}
      alt={name}
      title={name}
    />
  );
}

function Runewords(): JSX.Element {
  return (
    <div>
      {runewords.map((runeword) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>{runeword.name}</div>
            <div>
              {runeword.runes.map((rune) => (
                <Rune name={rune} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Rune2({ name }: { name: string }): JSX.Element {
  return (
    <div>
      <svg class="rune-svg" width="100" height="auto" viewBox="0 0 100 100">
        <polygon points="35,0 65,0 100,100 0,100" />
      </svg>
      <El />
      {/*<div class="rune-text">{runes.find((r) => r.name === name)?.glyph}</div>*/}
    </div>
  );
}

export function App() {
  const rune = "Zod";
  return (
    <div style={{ display: "flex" }}>
      {/*<RuneList />*/}
      {/*<Runewords />*/}
      <Rune2 name={rune} />
      <Rune name={rune} />
    </div>
  );
}
