import Markdoc from "@markdoc/markdoc";
import React from "react";

// Convierte el Markdown del artículo en HTML seguro: el texto nunca se inserta
// como HTML crudo, así que un artículo no puede inyectar código en la página.
export function ContenidoArticulo({ markdown }: { markdown: string }) {
  const arbol = Markdoc.transform(Markdoc.parse(markdown));
  return <div className="articulo">{Markdoc.renderers.react(arbol, React)}</div>;
}
