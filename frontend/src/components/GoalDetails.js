const GoalDetails = ({goal}) => {

    return(
        <div className = "GoalDetails">
            <p><strong>TIME SLEPT:</strong>{goal.hours}:{goal.minutes}</p>
            <p><strong>FREQUENCY:</strong>{goal.frequency}</p>
        </div>
    )
}

export default GoalDetails