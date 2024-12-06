import {useEffect, useState} from 'react'

import GoalForm from '../components/GoalForm'
import GoalDetails from '../components/GoalDetails'
import './Goals.module.css'

const Goals = () => {
  const [goals, setGoals] = useState([])

  // use the useEffect to fetch goals from server or smthg
    useEffect(() => {
        const fetchGoals = async () => {
            const response = await fetch('http://localhost:5000/api/goals')
            const json = await response.json()


            if(response.ok) {
                setGoals(json)
            }
        }

        fetchGoals()
    }, [])

  return(
    <div className="container">
      <div className="content">
        <div className="goal-form">
          <h1 className="title">Set Goals</h1>
          <br></br>
          <GoalForm goals={goals} />
        </div>
        <div className="goal-display">
          <h1 className="title">Your Sleeping Goals</h1>
          <br></br>
          <GoalDetails goals={goals} />
        </div>
      </div>
    </div>
  )
}

export default Goals