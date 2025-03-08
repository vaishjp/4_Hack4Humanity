import React, { useEffect, useState } from "react";
import "../styles/Home.css";

const CounterSection = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/reports/count")
      .then((response) => response.json())
      .then((data) => setCount(data.count))
      .catch((error) => console.error("Error fetching count:", error));
  }, []);

  return (
    <section className="counter-section">
      <h2>Reported Missing Children: {count}</h2>
    </section>
  );
};

export default CounterSection;
