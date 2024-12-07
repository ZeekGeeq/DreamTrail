import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrailDetails from "../components/TrailDetails";
import TrailForm from "../components/TrailForm";

const Home = () => {
  const [trails, setTrails] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndFetchTrails = async () => {
      try {
        const authResponse = await fetch(
          "http://localhost:5000/api/auth/check",
          { credentials: "include" },
        );
        const authData = await authResponse.json();

        if (authResponse.ok && authData.authenticated) {
          setIsAuthenticated(true);

          const trailResponse = await fetch(
            "http://localhost:5000/api/trails",
            {
              credentials: "include", //insures cookies with auth
            },
          );
          if (trailResponse.ok) {
            const trailData = await trailResponse.json();
            setTrails(trailData);
          } else {
            console.error("Failed to fetch trails");
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Authentication or trail fetching error:", error);
        navigate("/");
      }
    };

    checkAuthAndFetchTrails();
  }, [navigate]);

  return isAuthenticated ? (
    <div className="home">
      <div className="trails">
        {trails &&
          trails.map((trail) => <TrailDetails key={trail._id} trail={trail} />)}
      </div>
      <TrailForm />
    </div>
  ) : (
    <div>Checking authentication...</div>
  );
};

export default Home;
