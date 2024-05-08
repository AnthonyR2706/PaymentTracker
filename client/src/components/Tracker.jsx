import { React, useState, useEffect } from 'react'
import axios from "axios"

const Tracker = () => {

    const [getData, setData] = useState([{}])
    const [getError, setError] = useState(<p/>)
    const [getErrorMessage, setErrorMessage] = useState([])
    const [getInvoiceId, setInvoiceId] = useState()
    const [getClient, setClient] = useState()
    const [getDescription, setDescription] = useState()
    const [getPrice, setPrice] = useState()
    const [getPaid, setPaid] = useState()

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

    // useEffect( () => {

    // })

    const axiosFetchData = async(processing) => {
        await axios.get('http://localhost:4000/users')
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
        if(validateData()){
            setError(<p className="success">{getErrorMessage}</p>)
            setDefault()
        } else {
            console.log("error")
            setError(getErrorMessage.map((item) =>
                <p className="fail">{item}</p>
              ))
            return
        }
    }

    const handleFirstData = (e) => {
        e.preventDefault()
        axiosPostInfo()
    }

    const setDefault= () => {
        console.log("aaaaaa")
        document.getElementById("invoiceId").value = ''
        document.getElementById("client").value = ''
        document.getElementById("description").value = ''
        document.getElementById("price").value = ''
        document.getElementById("paid").value = ''
        setInvoiceId(null)
        setClient(null)
        setDescription(null)
        setPrice(null)
        setPaid(null)
    }

    const validateData = () => {
        if(Array.isArray(getErrorMessage)){
            return false
        }
            return true
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
            <form className="contactForm" action="http://localhost:4000/add">
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