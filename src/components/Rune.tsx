import { ReactSVG } from "react-svg";

export function Rune({ name }: { name: string }): JSX.Element {
  return (
    // @ts-ignore
    <ReactSVG
      beforeInjection={(svg: SVGSVGElement) => {
        svg.classList.add("fill-color");
        // svg.height = "200";
        svg.setAttribute("height", "200px");
        svg.setAttribute("width", "auto");
      }}
      src={`/svg/${name.toLowerCase()}.svg`}
    />
  );
}
