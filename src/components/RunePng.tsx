import React, { useState } from "react";

export function RunePng({ name }: { name: string }): JSX.Element {
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
