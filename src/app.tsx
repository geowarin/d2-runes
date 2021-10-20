import runes from "./data/runes.json";
import { createElement } from "preact";
import React from "preact/compat";
import { RunePng } from "./components/RunePng";
import { Rune } from "./components/Rune";
import JSX = createElement.JSX;

function RuneList(): JSX.Element {
  return (
    <ul>
      {runes.map((rune) => (
        <li>
          <RunePng name={rune.name} />
          {rune.name}
        </li>
      ))}
    </ul>
  );
}

function Triangle(): JSX.Element {
  return (
    <div>
      <svg class="rune-svg" width="100" height="auto" viewBox="0 0 100 100">
        <filter id="n" x="0" y="0">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            stitchTiles="stitch"
          />
        </filter>
        <polygon filter="url(#n)" points="35,0 65,0 100,100 0,100" />
      </svg>
    </div>
  );
}

export function App() {
  const rune = "Tir";
  return (
    <div style={{ display: "flex" }}>
      <div
        className="noisy"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <Rune name={rune} />
      </div>

      <Triangle />
    </div>
  );
}
