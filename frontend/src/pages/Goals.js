import { useEffect, useState } from "react";

import GoalForm from "../components/GoalForm";
import GoalDetails from "../components/GoalDetails";
import "./Goals.module.css";

const Goals = () => {
  const [goals, setGoals] = useState([]);

  // Fetch goals from the server
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/goals", {
          credentials: "include", // need cookies for authy
        });

        if (response.ok) {
          const data = await response.json();
          setGoals(data);
        } else {
          console.error("Failed fetching goals:", response.status);
        }
      } catch (error) {
        console.error("Error when fetching goals:", error);
      }
    };

    fetchGoals();
  }, []); // always empty array

  return (
    <div className="container">
      <div className="content">
        <div className="goal-form">
          <h1 className="title">Set Goals</h1>
          <br />
          <GoalForm goals={goals} />
        </div>
        <div className="goal-display">
          <h1 className="title">Your Sleeping Goals</h1>
          <br />
          <GoalDetails goals={goals} />
        </div>
      </div>
      <div className="helpful-insights">
        <h1 className="title">Helpful Insights</h1>
        <br />
        <p>
          Research from
          <a href="https://www.webmd.com/sleep-disorders/sleep-requirements">
            {" "}
            WebMD{" "}
          </a>
          and
          <a href="https://www.mayoclinic.org/healthy-lifestyle/adult-health/expert-answers/how-many-hours-of-sleep-are-enough/faq-20057898">
            Mayo Clinic
          </a>
          suggests the amount of sleep required for an individual depends on
          age. When setting sleep goals, it may be beneficial to consider how
          much sleep is typically required for a person of your age.
        </p>
        <br />
        <p>Unless otherwise noted, these insights come directly from WebMD.</p>
        <ul>
          <li>
            Infants (ages 0-3 months) need 14-17 hours per 24 hours, including
            naps.
          </li>
          <li>
            Infants (ages 4-11 months) need 12-15 hours per 24 hours, including
            naps.
          </li>
          <li>
            Toddlers (ages 1-2 years) need about 11-14 hours per 24 hours,
            including naps.
          </li>
          <li>
            Preschool children (ages 3-5) need 10-13 hours per 24 hours,
            including naps.
          </li>
          <li>
            School-age children (ages 6-13) need 9-11 hours a day. According to
            Mayo Clinic, children (ages 6-12) need 9-12 hours per 24 hours.
          </li>
          <li>
            Teenagers (ages 14-17) need about 8-10 hours each day. According to
            Mayo Clinic, teenagers (ages 13-18) need 8-10 hours per 24 hours.
          </li>
          <li>
            Most adults need 7 to 9 hours, although some people may need as few
            as 6 hours or as many as 10 hours of sleep each day. Mayo Clinic
            suggests adults need 7 or more hours at night.
          </li>
          <li>
            Older adults (ages 65 and older) need 7-8 hours of sleep each day.
          </li>
          <li>
            Women in the first 3 months of pregnancy often need several more
            hours of sleep than usual.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Goals;
