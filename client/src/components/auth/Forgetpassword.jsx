import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Forgetpassword = () => {
    const { id, token } = useParams()
    const { currentUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('mohamedwael')
    const Forgetpassword = async () => {
        await axios.post(`${process.env.BASE_API_URL_HOST}/auth/reset-password/${id}/${token}`, { password })
            .then((res) => {
                toast.success("success reset")
                // console.log(res.data)
                setLoading(false)
                // navigate(`/Forgetpassword/${id}/${token}`)
            })
            .catch((error) => {
                toast.error(error.message)
                setLoading(false)
            })
    }
    return (
        <>
            <div>Forgetpassword</div>
            <p>email :: {currentUser?.email}</p>
            <p>id :: {id}</p>
            <p>token ::{token}</p>
            <input type="text" placeholder='enter new password' value={password} />
            <button onClick={Forgetpassword}>dddd</button>
        </>
    )
}

export default Forgetpassword