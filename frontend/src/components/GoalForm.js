import { useState } from "react";
import "./Goals.css";
const GoalForm = () => {
  //const [date, setDate] = useState('')
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [frequency, setFrequency] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const goal = { hours, minutes, frequency };
    try {
      const response = await fetch("http://localhost:5000/api/goals", {
        method: "POST",
        body: JSON.stringify(goal),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error details:", errorText);
        setError(errorText);
        return;
      }

      const json = await response.json();
      setHours("");
      setMinutes("");
      setFrequency("");
      setError(null);
      console.log("New goal added", json);

      // Refresh the page by replacing the URL with itself
      window.location.replace(window.location.href);
    } catch (error) {
      console.error("Request failed:", error);
      setError("An error occurred while submitting the form.");
    }
  };

  // This section displays the form that takes input from the user.
  return (
    <form onSubmit={handleSubmit}>
      <h3> Add a new goal</h3>
      <br></br>

      <div className="form-group">
        <span>Sleep for </span>
        <input
          type="number"
          onChange={(e) => setHours(e.target.value)}
          value={hours}
        />

        <span> hours and </span>
        <br></br>
        <input
          type="number"
          onChange={(e) => setMinutes(e.target.value)}
          value={minutes}
        />
        <span> minutes every </span>
        <select
          name="frequency"
          id="frequency"
          onChange={(e) => setFrequency(e.target.value)}
          value={frequency}
        >
          <option value="" disabled></option>
          <option value="day">day</option>
          <option value="weekday">weekday</option>
          <option value="weekend">weekend</option>
          <option value="week">week</option>
          <option value="month">month</option>
          <option value="year">year</option>
        </select>
      </div>

      <button>Add Goal</button>
    </form>
  );
};

export default GoalForm;
