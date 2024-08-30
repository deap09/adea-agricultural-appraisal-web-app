import React from "react";

import { useAppDispatch, useAppSelector } from "@/redux-config/hooks";

import {
  selectPlotList,
  selectIsDrawingPlot,
  setIsDrawingPlot,
  selectDrawingPlotCoordinates,
  setDrawingPlotCoordinates,
} from "@/features/map/mapSlice";
import { addNewPlot } from "@/features/map/mapAPI";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import DeletePlot from "@/features/map/DeletePlot";

export default function MapSidebar() {
  const dispatch = useAppDispatch();
  const isDrawingPlot = useAppSelector(selectIsDrawingPlot);
  const plotList = useAppSelector(selectPlotList);
  const drawingPlotCoordinates = useAppSelector(selectDrawingPlotCoordinates);
  const [plotName, setPlotName] = React.useState("");

  const savePlot = () => {
    if (plotName && drawingPlotCoordinates) {
      addNewPlot({ name: plotName, coordinates: drawingPlotCoordinates });
    }
    setPlotName("");
    dispatch(setDrawingPlotCoordinates(null));
    dispatch(setIsDrawingPlot(false));
  };

  if (isDrawingPlot) {
    return (
      <div className="sidebar-add-plot">
        <div
          className="
                flex
                items-center
                space-x-2
                mb-4
                cursor-pointer
                hover:opacity-80
          "
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => dispatch(setIsDrawingPlot(false))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Add a plot</h1>
        </div>

        <p className="text-gray-800">To add a new plot, follow these steps:</p>
        <ol className="flex flex-col space-y-2 mt-2">
          <li>
            <Badge variant="outline">
              Draw a polygon on the map to create a new plot.
            </Badge>
          </li>
          <li>
            <Badge variant="outline">Enter a name for the plot.</Badge>
          </li>
          <li>
            <Badge variant="outline">Click the "Save plot" button.</Badge>
          </li>
        </ol>

        <Input
          className="mt-4"
          type="text"
          name="plot-name"
          placeholder="Plot name"
          value={plotName}
          onChange={(e) => setPlotName(e.target.value)}
        />

        <Button
          className="mt-4"
          onClick={savePlot}
          disabled={!plotName || !drawingPlotCoordinates}
        >
          Save plot
        </Button>
        {(!plotName || !drawingPlotCoordinates) && (
          <div
            className="
              mt-2
              w-full
              flex
              justify-center
              items-center

            "
          >
            <Badge variant="destructive">
              Follow the steps above to be able to save the plot.
            </Badge>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="sidebar-plot-list">
      <h1 className="text-3xl font-bold mb-4">Plots</h1>
      <Button onClick={() => dispatch(setIsDrawingPlot(true))}>Add plot</Button>
      <ul
        className="
            mt-4
            space-y-2
        "
      >
        {plotList.map((plot) => (
          <li
            className="
                text-lg
                text-gray-800
          
                border
                border-gray-200
                p-2
                rounded-md
                flex
                justify-between
                items-center

            "
            key={plot.id}
          >
            <div>
              <div
                className="
                truncate
                overflow-hidden
                whitespace-nowrap
                text-ellipsis
              "
              >
                {plot.name}
              </div>
              <div
                className="
                text-gray-500
                text-sm
              "
              >
                {plot.area} m<sup>2</sup>
              </div>
            </div>

            <DeletePlot plotId={plot.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
