import {useEffect, useState} from 'react'

import GoalForm from '../components/GoalForm'




const Goals = () => {
  const [goals, setGoals] = useState([])

  // use the useEffect to fetch goals from server or smthg

  return(
    <div className="Goals">
      <h1>Your Sleeping Goals</h1>
      <GoalForm goals={goals} />
    </div>
  )
}

export default Goals