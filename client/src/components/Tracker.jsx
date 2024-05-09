import { React, useState, useEffect } from 'react'
import axios from "axios"

const Tracker = () => {

    const [getData, setData] = useState([{}])
    const [getError, setError] = useState(<p/>)
    const [getErrorMessage, setErrorMessage] = useState('')
    const [getInvoiceId, setInvoiceId] = useState('')
    const [getClient, setClient] = useState('')
    const [getDescription, setDescription] = useState('')
    const [getPrice, setPrice] = useState('')
    const [getPaid, setPaid] = useState('')
    const [getAccountId, setAccountId] = useState(2)
    const [getTempId, setTempId] = useState(2)

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

    const axiosPostInfo = async() => {
        const postInfo = {
            name: "g",
            job: "n",
            test: "z",
        }

        await axios.post('http://localhost:4000/contact', postInfo)
        .then(res => setError(<p className="success">{res.data}</p>))
    }

    const axiosPostData = async() => {
        const postData = {
            invoiceId: getInvoiceId,
            client: getClient,
            description: getDescription,
            price: getPrice,
            paid: getPaid
        }
        await axios.post('http://localhost:4000/add', postData)
        .then(res => setErrorMessage(res.data))
    }

    const handleSubmit = (e) => {      
        e.preventDefault()
        axiosPostData()
    }

    const handleFirstData = (e) => {
        e.preventDefault()
        axiosPostInfo()
    }

    //resets all input values
    const setDefault= () => {
        document.getElementById("invoiceId").value = ''
        document.getElementById("client").value = ''
        document.getElementById("description").value = ''
        document.getElementById("price").value = ''
        document.getElementById("paid").value = ''
        setInvoiceId('')
        setClient('')
        setDescription('')
        setPrice('')
        setPaid('')
    }

    // Gets called to update error message after each success attempt
    useEffect( () => {
        if(Array.isArray(getErrorMessage)){
            console.log("error")
            setError(getErrorMessage.map((item) =>
                <p className="fail">{item}</p>
              ))
        } else {
            console.log("success")
            setError(<p className="success">{getErrorMessage}</p>)
            setDefault()
            
        }
    },[setErrorMessage, getErrorMessage])

    const handleAccountChange = () => {
        setAccountId(getTempId)
    }

    return (
        <div className='TrackerContainer'>
            <form className='accountId'>
                <label>Id</label>
                <input id="accountId" name ="accountId" value = {getTempId} onChange={(e) => setTempId(e.target.value)} type="number" required></input>
                <button onClick={handleAccountChange}>Change Account</button>
            </form>
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
            <form className="contactForm">
                <label>invoiceId</label>
                <input id="invoiceId" name="invoiceId" value={getInvoiceId} onChange={(e) => setInvoiceId(e.target.value)} type="number" required></input>
                <label>Client</label>
                <input id="client" name="client" value={getClient} onChange={(e) => setClient(e.target.value)} required></input>
                <label>Description</label>
                <input id="description" name="description" value={getDescription} onChange={(e) => setDescription(e.target.value)}></input>
                <label>Price</label>
                <input id="price" name="price" value={getPrice} onChange={(e) => setPrice(e.target.value)} type="number" required></input>
                <label>Paid</label>
                <input id="paid" name="paid" value={getPaid} onChange={(e) => setPaid(e.target.value)} type="number"></input>
                <button onClick={handleFirstData}>Add first user</button>
                <button onClick={handleSubmit}>Add Entry</button>
            </form>
            {getError}
        </div>
    )
}

export default Tracker