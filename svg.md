# Using SVG with react/preact

## img tag

```typescript jsx
<img width={300} src="mysvg.svg" />
```

👍: 
- Simple 
- dynamic 

👎:
- No access to svg markup for styling

## vite plugin

@honkhonk/vite-plugin-svgr

```typescript jsx
import Svg from "../public/svg/tir.svg?component";

<Svg className="toto" width={30} height="auto" />
```

👍:
- Flexible

👎:
- Not dynamic (need to generate dictionary)

## ReactSVG

```typescript jsx
<ReactSVG
  beforeInjection={(svg: SVGSVGElement) => {
    svg.classList.add("toto");
    // svg.height = "200";
    svg.setAttribute("height", "200px");
    svg.setAttribute("width", "auto");
  }}
  src={`/svg/${rune.toLowerCase()}.svg`}
/>
```

👍:
- Dynamic
- React component

👎:
- A bit verbose

## Generate component via script

👍:

👎:
- annoying to write
- needs to be regenerated when svg change
- needs a dictionary

## alternative: font

👍:
- Simple

👎:
- needs a very light mapping (eg: "a" is toto.svg)
- not as flexible as svg
