import {useEffect, useState} from 'react'

import TrailDetails from '../components/TrailDetails'
import TrailForm from '../components/TrailForm'
const Home = () => {
    const [trails, setTrails] = useState(null)
    useEffect(() => {
        const fetchTrails = async () => {
            const response = await fetch('http://localhost:5000/api/trails')
            const json = await response.json()


            if(response.ok) {
                setTrails(json)
            }
        }

        fetchTrails()
    }, [])

    return(
        <div className = "home">
            <div className = "trails">
                {trails && trails.map((trail)=>(
                    <TrailDetails key = {trail._id} trail={trail}/>
                ))}
            </div>
            <TrailForm/>
        </div>
    )
}

export default Home