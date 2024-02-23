import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Resetpassword = () => {
    const { id, token } = useParams()
    const { currentUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('mohamedwael')
    const Resetpassword = async () => {
        await axios.post(`http://localhost:5000/api/auth/reset-password/${id}/${token}`, { password })
            .then((res) => {
                toast.success("success reset")
                // console.log(res.data)
                setLoading(false)
                // navigate(`/Resetpassword/${id}/${token}`)
            })
            .catch((error) => {
                toast.error(error.message)
                setLoading(false)
            })
    }
    return (
        <>
            <div>Resetpassword</div>
            <p>email :: {currentUser?.email}</p>
            <p>id :: {id}</p>
            <p>token ::{token}</p>
            <input type="text" placeholder='enter new password' value={password} />
            <button onClick={Resetpassword}>dddd</button>
        </>
    )
}

export default Resetpassword