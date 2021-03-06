import React from "preact/compat";
import { Runewords } from "@/components/Runewords";
import { Search } from "@/components/Search";
import { RuneList } from "@/components/RuneList";
import { Provider } from "react-redux";
import { store } from "@/store/store";

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
    // @ts-ignore
    <Provider store={store}>
      <div className="flex flex-col h-full">
        <Search />
        <div className="flex h-full">
          <div className="w-40 flex flex-col overflow-y-scroll">
            <RuneList />
          </div>
          <div className="w-full">
            <Runewords />
          </div>
        </div>
      </div>
    </Provider>
  );
}
