import React, { Fragment, useContext, useEffect, useState } from 'react'
import './Security.css'
import { Link, json } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { authuser } from '../../redux/slice/authslice'
// import { auth, db, storage } from '../../firebase/config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoPencil } from "react-icons/go";
import { AuthContext } from '../../context/AuthContext'
// import { sendPasswordResetEmail, updateProfile } from 'firebase/auth'
// import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
// import { getDownloadURL, getStorage, ref, uploadBytesResumable, uploadString } from 'firebase/storage'
import Loader from '../loader/Loader'
import axios from 'axios';
import Cookies from 'universal-cookie';
const Security = () => {
    const cookies = new Cookies();
    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("")
    const [photoimage, setPhotoimage] = useState("")
    const [activeedit, setActiveedit] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const [currentuser, setCurrentuser] = useState([])
    const [loading, setLoading] = useState(false)
    const [imagePreview, setImagePreview] = useState(null);
    useEffect(() => {
        setFullname(currentUser?.fullname)
        setUsername(currentUser?.username)
        setEmail(currentUser?.email)
        setAddress(currentUser?.address)
        setPhone(currentUser?.phone)
        setImagePreview(currentUser?.photoimage)
        setGender(currentUser?.gender)
    }, [currentUser])
    const onresethandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        // update_user_data
        const email = currentUser?.email;
        const id = currentUser?._id;
        const token = cookies.get('TOKEN')
        // await axios.post(`http://localhost:5000/api/auth/forgot-password`, { email })
        // await axios.post(`http://localhost:5000/api/auth/verify/${token}`)
        await axios.get(`http://localhost:5000/api/auth/reset-password/${id}/${token}`)
            .then((res) => {
                // toast.success("check your Email inbox")
                toast.success(res.data.status)
                setLoading(false)
            })
            .catch((error) => {
                toast.error(error.message)
                setLoading(false)
            })


    }
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                setImagePreview(reader.result);
                const uid = currentUser?._id
                const base64Data = imagePreview;
                await axios.post('http://localhost:5000/api/auth/upload-image', { image: base64Data, uid: uid })
                    .then((res) => {
                        // console.log(res);
                        setLoading(false)
                    })
                    .catch((err) => {
                        console.log(err)
                        setLoading(false)
                    })
                await axios.post('http://localhost:5000/api/auth/get-image', { uid: uid })
                    .then((res) => {
                        // console.log(res)
                        setPhotoimage(res.data.data.image)
                    })
                    .catch((err) => {
                        console.log(err)
                        setLoading(false)
                    })
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };
    const save = async (e) => {
        const image = photoimage ? photoimage : imagePreview
        e.preventDefault();
        await axios.post("http://localhost:5000/api/auth/update-user-data", { email, username, phone, address, fullname, gender, photoimage: image })
            .then((res) => {
                // toast.success("check your Email inbox")
                toast.success(res.data.data)
                setLoading(false)
                setActiveedit(false)
            })
            .catch((error) => {
                toast.error(error.message)
                setLoading(false)
                setActiveedit(false)
            })
    }
    return (
        <>
            {loading ? <Loader />
                : <div className='security'>
                    <div className='data-profile' key={currentuser?.uid}>
                        <GoPencil className='icon' size={30} onClick={() => setActiveedit(!activeedit)} color='#1f93ff' />
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='fullname'>Full Name </label>
                            <p> : </p>
                            <input type="text" id='fullname' disabled={activeedit ? false : true} value={fullname} onChange={(e) => setFullname(e.target.value)} />
                        </div>
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='username'>Username </label>
                            <p> : </p>
                            <input type="text" id='username' disabled={activeedit ? false : true} value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='email'>Email </label>
                            <p> : </p>
                            <input type="email" id='email' disabled={activeedit ? false : true} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='address'>Address </label>
                            <p> : </p>
                            <input type="text" id='address' disabled={activeedit ? false : true} value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='phone'>Phone Number </label>
                            <p> : </p>
                            <input type="tel" id='phone' disabled={activeedit ? false : true} value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='gender'>Gender </label>
                            <p> : </p>
                            <input type="text" id='gender' disabled={activeedit ? false : true} value={gender} onChange={(e) => setGender(e.target.value)} />
                        </div>
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='photoimage'>photoimage </label>
                            <p> : </p>
                            {imagePreview &&
                                <img style={{ border: "3px solid white" }}
                                    className="w-16 h-16 rounded-full"
                                    src={imagePreview}
                                />
                            }
                            <input
                                type="file"
                                id="photoimage"
                                // disabled={activeedit ? false : true}
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                            />
                            {
                                loading && <p>loading</p>
                            }
                        </div>
                        {
                            activeedit &&
                            <div className='edit'>
                                <button className='save' onClick={save}>save</button>
                                <button className='reset-pass' onClick={onresethandler}>reset pass</button>
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Security