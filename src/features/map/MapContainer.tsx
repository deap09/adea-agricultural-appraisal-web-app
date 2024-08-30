import * as React from "react";
import Map, { Source, Layer } from "react-map-gl";
import DrawControl from "./DrawControl";
import ControlPanel from "./ControlPanel";
import { dataLayer, fillLayer } from "./mapStyle";

import { useAppDispatch, useAppSelector } from "@/redux-config/hooks";

import {
  selectPlotListAsGeoJson,
  setDrawingPlotCoordinates,
  selectIsDrawingPlot,
} from "@/features/map/mapSlice";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

type Feature = {
  id: string;
};

type Features = {
  [key: string]: Feature;
};

export default function MapContainer() {
  const dispatch = useAppDispatch();
  const isDrawingPlot = useAppSelector(selectIsDrawingPlot);

  const [hoverInfo, setHoverInfo] = React.useState<any>(null);

  const [, setFeatures] = React.useState<Features>({});

  const allData = useAppSelector(selectPlotListAsGeoJson);

  const onHover = React.useCallback((event: any) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
  }, []);

  const onUpdate = React.useCallback(
    (e: any) => {
      setFeatures((currFeatures) => {
        const newFeatures = { ...currFeatures };
        for (const f of e.features) {
          newFeatures[f.id] = f;
        }
        return newFeatures;
      });
      dispatch(
        setDrawingPlotCoordinates(
          JSON.stringify(e.features[0].geometry.coordinates)
        )
      );
    },
    [dispatch]
  );

  const onDelete = React.useCallback((e: any) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  return (
    <>
      <Map
        initialViewState={{
          longitude: 5.0849,
          latitude: 52.0602,
          zoom: 15,
        }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        interactiveLayerIds={["data"]}
        mapboxAccessToken={TOKEN}
        onMouseMove={onHover}
      >
        {isDrawingPlot && (
          <DrawControl
            position="top-left"
            displayControlsDefault={false}
            controls={{
              polygon: false,
              trash: false,
            }}
            defaultMode="draw_polygon"
            onCreate={onUpdate}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        )}
        <Source type="geojson" data={allData}>
          <Layer {...fillLayer} />
          <Layer {...dataLayer} />
        </Source>
        {hoverInfo && (
          <div
            className="plot-info-tooltip"
            style={{ left: hoverInfo.x, top: hoverInfo.y }}
          >
            <div>Name: {hoverInfo.feature.properties.name}</div>
            <div>
              Area: {hoverInfo.feature.properties.area} m<sup>2</sup>
            </div>
          </div>
        )}
      </Map>
      <ControlPanel />
    </>
  );
}
