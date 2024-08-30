import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/redux-config/createAppSlice";

export interface Plot {
  id: string;
  [key: string]: any;
}

export interface MapSliceState {
  plotList: Plot[];
  isDrawingPlot: boolean;
  drawingPlotCoordinates: string | null;
}

const initialState: MapSliceState = {
  plotList: [],
  isDrawingPlot: false,
  drawingPlotCoordinates: null,
};

export const mapSlice = createAppSlice({
  name: "map",
  initialState,
  reducers: (create) => ({
    setPlotList: create.reducer((state, action: PayloadAction<Plot[]>) => {
      state.plotList = action.payload;
    }),
    setIsDrawingPlot: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        state.isDrawingPlot = action.payload;
      }
    ),
    setDrawingPlotCoordinates: create.reducer(
      (state, action: PayloadAction<string | null>) => {
        state.drawingPlotCoordinates = action.payload;
      }
    ),
  }),
  selectors: {
    selectPlotList: (state) => state.plotList,
    selectPlotListAsGeoJson: (state) => {
      return {
        type: "FeatureCollection",
        features: state.plotList.map((plot) => ({
          type: "Feature",
          properties: {
            name: plot.name,
            area: plot.area,
          },
          geometry: {
            type: "Polygon",
            coordinates: JSON.parse(plot.coordinates),
          },
        })),
      };
    },
    selectIsDrawingPlot: (state) => state.isDrawingPlot,
    selectDrawingPlotCoordinates: (state) => state.drawingPlotCoordinates,
  },
});

export const { setPlotList, setIsDrawingPlot, setDrawingPlotCoordinates } =
  mapSlice.actions;

export const {
  selectPlotList,
  selectPlotListAsGeoJson,
  selectIsDrawingPlot,
  selectDrawingPlotCoordinates,
} = mapSlice.selectors;
