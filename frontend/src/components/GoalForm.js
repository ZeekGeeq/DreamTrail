import {useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import { KHR_DF_SAMPLE_DATATYPE_SIGNED } from 'three/examples/jsm/libs/ktx-parse.module.js'
const GoalForm = () => {
    //const [date, setDate] = useState('')
    const [hours, setHours] = useState('')
    const [minutes, setMinutes] = useState('')
    const [frequency, setFrequency] = useState('')

    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const goal = { hours, minutes, frequency }
        //change this to fit the goals
        try {
            /*const response = await fetch('http://localhost:4000/api/trails', {
                method: 'POST',
                body: JSON.stringify(trail),
                headers: {
                    'Content-Type': 'application/json'
                }
            })*/

            if (!response.ok) {
                const errorText = await response.text()
                console.log("Error details:", errorText)
                setError(json.error)
                return
            }

            const json = await response.json()
            setHours('')
            setMinutes('')
            setFrequency('')
            setError(null)
            console.log('New goal added', json)

            // Refresh the page by replacing the URL with itself
            window.location.replace(window.location.href)

        }

        catch (error) {
            console.error("Request failed:", error)
            setError("An error occurred while submitting the form.")
        }
    }

    // This section displays the form that takes input from the user.
    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3> Add a new goal</h3>

            <p>Sleep for </p>
            <input
                type="number"
                onChange={(e) => setHours(e.target.value)}
                value={hours}
            />
            <p> hours and </p>
            <input
                type="number"
                onChange={(e) => setMinutes(e.target.value)}
                value={minutes}
            />
            <p> minutes every </p>
            <input
                type="number"
                onChange={(e) => setFrequency(e.target.value)}
                value={frequency}
            />
            <button>Add Goal</button>
        </form>
    )
}

export default GoalForm