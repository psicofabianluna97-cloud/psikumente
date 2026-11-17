import { makeRouteHandler } from "@keystatic/next/route-handler";
import { panelActivo } from "@/lib/panel";
import config from "../../../../keystatic.config";

const noDisponible = () => new Response("No encontrado", { status: 404 });

// Sin las claves de GitHub configuradas, el panel no existe para nadie.
export const { GET, POST } = panelActivo()
  ? makeRouteHandler({ config })
  : { GET: noDisponible, POST: noDisponible };
