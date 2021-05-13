import "./styles.css";
import Loadings from "./Loadings";
import Tours from "./Tours";
import React, { useState, useEffect } from "react";

const url = "https://course-api.com/react-tours-project";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <div>
        {" "}
        <Loadings />{" "}
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2> No tours left</h2>
          <button className="btn" onClick={fetchTours}>
            Refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <div>
      <Tours tours={tours} removeTour={removeTour} />
    </div>
  );
}
