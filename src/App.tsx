import React from "react";
import "./App.css";

// Redux
import { useAppDispatch } from "@/redux-config/hooks";
import { setPlotList, type Plot } from "@/features/map/mapSlice";

// Firebase
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/main";

// Components
import MapSidebar from "@/features/map/MapSidebar";
import MapContainer from "./features/map/MapContainer";

const App = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const q = query(collection(db, "db-collection"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs: Plot[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate().toString(),
      }));
      dispatch(setPlotList(docs));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="app-layout">
      <nav className="sidebar">
        <MapSidebar />
      </nav>
      <main>
        <MapContainer />
      </main>
    </div>
  );
};

export default App;
