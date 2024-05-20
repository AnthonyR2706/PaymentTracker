import { React, useState, useEffect } from 'react'
import axios from "axios"

const Tracker = ({getAccountId, setAccountId}) => {

    const [getData, setData] = useState([{}])
    const [getError, setError] = useState(<p/>)
    const [getErrorMessage, setErrorMessage] = useState('')
    const [getClient, setClient] = useState('')
    const [getDescription, setDescription] = useState('')
    const [getPrice, setPrice] = useState('')
    const [getPaid, setPaid] = useState('')
    const [getKey, setKey] = useState()

    // const UserSchema = new mongoose.Schema({
    //     name: String,
    //     Job: String,
    //     Notes: String,
    //     Date: Date,
    //     Owed: Number,
    //     paid: Number

    // })

    useEffect( () => {
        let processing = true
        axiosFetchData(processing)
        return () => {
            processing = false
        }
    },[getData])
    
    const axiosFetchData = async(processing) => {
        let userLink = 'http://localhost:4000/users'
        userLink += `?accountId=${getAccountId}`
        await axios.get(userLink)
        .then(res => {
            if (processing) {
                setData(res.data[0].entries)
            }
        })
        .catch(err => console.log(err))
    }

    const axiosPostData = async() => {
        const postData = {
            client: getClient,
            description: getDescription,
            price: getPrice,
            paid: getPaid,
            accountId: getAccountId
        }
        await axios.post('http://localhost:4000/add', postData)
        .then(res => setErrorMessage(res.data))
    }

    const axiosDeleteData = async(key) => {
        await axios.post(`http://localhost:4000/delete?invoiceId=${key}&accountId=${getAccountId}`)
    }

    const handleSubmit = (e) => {      
        e.preventDefault()
        axiosPostData()
    }

    //resets all input values
    const setDefault= () => {
        document.getElementById("client").value = ''
        document.getElementById("description").value = ''
        document.getElementById("price").value = ''
        document.getElementById("paid").value = ''
        setClient('')
        setDescription('')
        setPrice('')
        setPaid('')
        setErrorMessage('')
    }

    // Gets called to update error message after each success attempt
    useEffect( () => {
        if(Array.isArray(getErrorMessage)){
            console.log("error")
            setError(getErrorMessage.map((item) =>
                <p className="fail">{item}</p>
              ))
        } else {
            setError()
            setDefault()
            
        }
    },[setErrorMessage, getErrorMessage])

    const toggleConfirm = (key) => {
        document.getElementById("confirmBox").classList.toggle('hidden')
        setKey(key) 
    }

    const handleDelete = () => {
        axiosDeleteData(getKey)
        document.getElementById("confirmBox").classList.toggle('hidden')
    }

    return (
        <div className='TrackerContainer'>
           <table>
            <tr key={"header"}>
                <th>Invoice ID</th>
                <th>Client</th>
                <th>Description</th>
                <th>Date</th>
                <th>Price</th>
                <th>Paid</th>
            </tr>
            {getData.map((item) => (
                <tr key={item.invoiceId}>
                {Object.values(item).map((val) => (
                    <td>{val}</td>
                ))}
                <td><button>Edit</button></td>
                <td><button onClick={e => toggleConfirm(item.invoiceId)}>Delete</button></td>
                <td>{item.invoiceId}</td>
                </tr>
            ))}
            </table>
            <form className="contactForm">
                <label>Client</label>
                <input id="client" name="client" value={getClient} onChange={(e) => setClient(e.target.value)} required></input>
                <label>Description</label>
                <input id="description" name="description" value={getDescription} onChange={(e) => setDescription(e.target.value)}></input>
                <label>Price</label>
                <input id="price" name="price" value={getPrice} onChange={(e) => setPrice(e.target.value)} type="number" required></input>
                <label>Paid</label>
                <input id="paid" name="paid" value={getPaid} onChange={(e) => setPaid(e.target.value)} type="number"></input>
                <button onClick={handleSubmit}>Add Entry</button>
            </form>
            {getError}
            <div className='confirmBox hidden' id='confirmBox'>
                Are you sure you want to delete this entry?
                <button onClick={toggleConfirm}>Cancel</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default Tracker