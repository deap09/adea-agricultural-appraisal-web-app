import { db } from "../../main"

import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore"

import * as turf from "@turf/turf"

async function calculatePlotArea(coordinates: string) {
  const polygon = turf.polygon(JSON.parse(coordinates))
  const area = turf.area(polygon)
  const roundedArea = area.toFixed(2)
  return roundedArea
}

export async function addNewPlot(plot: any) {
  const newPlotRef = doc(collection(db, "db-collection"))
  const plotArea = await calculatePlotArea(plot.coordinates)
  const newObj = {
    name: plot.name,
    coordinates: plot.coordinates,
    area: plotArea.toString(),
    createdAt: serverTimestamp(),
  }
  await setDoc(newPlotRef, newObj)
}

export async function deletePlot(plotId: string) {
  const plotRef = doc(db, "db-collection", plotId)
  await deleteDoc(plotRef)
}
