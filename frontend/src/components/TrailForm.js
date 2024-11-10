import {useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import { KHR_DF_SAMPLE_DATATYPE_SIGNED } from 'three/examples/jsm/libs/ktx-parse.module.js'
const TrailForm = () => {
    //const [date, setDate] = useState('')
    const [date, setDate] = useState(new Date())
    const [duration, setDuration] = useState('')
    const [quality, setQuality] = useState('')

    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Convert the date to local midnight to avoid timezone offset issues
        const localDate = new Date(date)
        localDate.setHours(0, 0, 0, 0)

        const trail = { date: localDate, duration, quality }

        try {
            const response = await fetch('http://localhost:4000/api/trails', {
                method: 'POST',
                body: JSON.stringify(trail),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                const errorText = await response.text()
                console.log("Error details:", errorText)
                setError(json.error)
                return
            }

            const json = await response.json()
            setDate(new Date())
            setDuration('')
            setQuality('')
            setError(null)
            console.log('New trail added', json)

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
            <h3> Add a new Trail</h3>

            <label>Sleep Date</label>
            <DatePicker
                selected={date.toLocaleDateString()}
                onChange={(newDate) => setDate(newDate)}
                dateFormat="MM/dd/yyyy"
            />
            <label>Duration</label>
            <input
                type="number"
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
            />
            <label>Sleep Quality</label>
            <input
                type="number"
                onChange={(e) => setQuality(e.target.value)}
                value={quality}
            />
            <button>Add Trail</button>
        </form>
    )
}

export default TrailForm
