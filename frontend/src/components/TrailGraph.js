import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment'
import './TrailGraph.css'


const TrailGraph = ({ trails }) => {

    const formatData = (trails) => {
        return trails
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((trail) => ({
                ...trail,
                date: moment(trail.date).format('MM/DD/YYYY')
            }))
    }

    const trailData = formatData(trails)

    return(
        <div className = "TrailGraph">
            <LineChart width={800} height={400} data={trailData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="duration" stroke="#8884d8" />
                <Line type="monotone" dataKey="quality" stroke="#82ca9d" />
            </LineChart>
        </div>
    )

}

export default TrailGraph