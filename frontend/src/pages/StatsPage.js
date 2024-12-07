import { useEffect, useState } from "react";

import TrailGraph from "../components/TrailGraph";

const StatsPage = () => {
  const [trails, setTrails] = useState([]);

  // Fetch the user's trails from the server
  useEffect(() => {
    const fetchTrails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/trails", {
          credentials: "include", //need cookies for auth
        });

        if (response.ok) {
          const data = await response.json();
          setTrails(data);
        } else {
          console.error("Failed fetching trails:", response.status);
        }
      } catch (error) {
        console.error("Error when fetching trails:", error);
      }
    };

    fetchTrails();
  }, []);

  return (
    <div className="StatsPage">
      <h1>Let's look at the Stats!</h1>
      <p>Here you can view your sleeping patterns over time:</p>
      <small>(Notice how sleep quality changes with sleep duration)</small>
      <br></br>
      <br></br>
      <TrailGraph trails={trails} />
    </div>
  );
};

export default StatsPage;
