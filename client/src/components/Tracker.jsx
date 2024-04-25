import { React, useState, useEffect } from 'react'
import axios from "axios"

const Tracker = () => {

    const [getData, setData] = useState([{}])
    const [error, setError] = useState('')

    // const UserSchema = new mongoose.Schema({
    //     name: String,
    //     Job: String,
    //     Notes: String,
    //     Date: Date,
    //     Owed: Number,
    //     Payed: Number

    // })

    useEffect( () => {
        let processing = true
        axiosFetchData(processing)
        return () => {
            processing = false
        }
    },[])

    const axiosFetchData = async(processing) => {
        await axios.get('http://localhost:4000/users')
        .then(res => {
            if (processing) {
                setData(res.data)
            }
        })
        .catch(err => console.log(err))
    }

    const axiosPostData = async() => {
        const postData = {
            name: "g",
            job: "n",
            test: "z",
        }

        await axios.post('http://localhost:4000/contact', postData)
        .then(res => setError(<p className="success">{res.data}</p>))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosPostData()

    }

    return (
        <div className='TrackerContainer'>
           <table>
            <tr key={"header"}>
                {Object.keys(getData[0]).map((key) => (
                <th>{key}</th>
                ))}
            </tr>
            {getData.map((item) => (
                <tr key={item.id}>
                {Object.values(item).map((val) => (
                    <td>{val}</td>
                ))}
                </tr>
            ))}
            </table>
            <button onClick={handleSubmit}>testing</button>
            {error}
        </div>
    )
}

export default Tracker