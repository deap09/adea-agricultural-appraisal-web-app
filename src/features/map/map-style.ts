import type { LineLayerSpecification, FillLayerSpecification } from "mapbox-gl"

export const dataLayer: LineLayerSpecification = {
  id: "line-layer",
  type: "line",
  source: "data",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "yellow",
    "line-width": 4,
  },
}

export const fillLayer: FillLayerSpecification = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": "yellow",
    "fill-opacity": 0.5,
  },
  source: "data",
}
