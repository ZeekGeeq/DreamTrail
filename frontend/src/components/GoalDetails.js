import "./Goals.css";
const GoalDetails = ({ goals }) => {
  return (
    <div className="goal-list">
      {goals.length === 0 ? (
        <p className="no-goals">No goals yet. Start by adding a new goal!</p>
      ) : (
        <ul>
          {goals.map((goal) => (
            <li key={goal._id || goal.id} className="goal-item">
              <p>
                <strong>AMOUNT OF SLEEP:</strong>
                {goal.hours}:{goal.minutes}
              </p>
              <p>
                <strong>FREQUENCY:</strong>
                {goal.frequency}
              </p>
            </li>
          ))}
        </ul>
      )}
      <br />
    </div>
  );
};

export default GoalDetails;
