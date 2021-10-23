import runes from "./data/runes.json";
import React from "preact/compat";
import { RunePng } from "./components/RunePng";

import { RecoilRoot } from "recoil";
import { Runewords } from "./components/Runewords";

function RuneList(): JSX.Element {
  return (
    <>
      {runes.map((rune) => (
        <div className="flex justify-center">
          <RunePng name={rune.name} />
          {rune.name}
        </div>
      ))}
    </>
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
  return (
    <RecoilRoot>
      <div className="flex">
        <div className="w-1/3">
          <RuneList />
        </div>
        <div className="w-2/3">
          <Runewords />
        </div>
      </div>
    </RecoilRoot>
  );
}
