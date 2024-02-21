import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from "../../assets/logoo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthContext'
import { Adminlink } from '../../context/Onlyadmin'
import Loader from '../loader/Loader'
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { cartitem, totalquantity } from '../../redux/slice/cartslice';
import Cookies from "universal-cookie";

const Navbar = () => {
    const cookies = new Cookies();
    const activelink = ({ isActive }) => (isActive && `active`)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [sidenav, setSidenav] = useState(false)
    const [sidecart, setSidecart] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const items = useSelector(cartitem);
    const totquantity = useSelector(totalquantity)
    const [loading, setLoading] = useState(false)
    // const [activeside, setActiveside] = useState(true)
    const showsidenav = () => {
        setSidenav(!sidenav);
    }
    const logouthandler = () => {
        setLoading(true)
        try {
            cookies.remove("TOKEN");
            toast.success("logout succeessful...")
            setLoading(false)
            window.location.href = "../../login";
            // navigate('/login')
        }
        catch (error) {
            toast.error(error.message)
            setLoading(false)
        };
    }
    // useEffect(() => {
    //     if (location.pathname === "/profile/chat") {
    //         setActiveside(false)
    //     }
    // }, [location.pathname])
    return (
        <>
            {/* <ToastContainer /> */}
            {currentUser &&
                <>
                    {loading ? <Loader />
                        :
                        <header>
                            <div className="logo">
                                <img src={Logo} alt="" />
                            </div>
                            <button className="btn-h" onClick={showsidenav}>=</button>
                            <div className={`${sidenav ? "nav-menu active" : "nav-menu"}`}>
                                <nav>
                                    <Adminlink>
                                        <NavLink className={activelink} to='/admin/home' >Admin</NavLink>
                                    </Adminlink>
                                    <NavLink className={activelink} to="/">home</NavLink>
                                    <NavLink className={activelink} to="/booking">booking</NavLink>
                                    <NavLink className={activelink} to="/store">store</NavLink>
                                    <NavLink className={activelink} to='/cart'>cart</NavLink>
                                    <div className='cart'>
                                        <FaShoppingCart onClick={() => setSidecart(!sidecart)} className="cursor-pointer" size={25} />
                                        <p>{totquantity}</p>
                                    </div>
                                    {
                                        items && items.length > 0 &&
                                        < div className={`${sidecart ? "sidecart active" : "sidecart"}`}>
                                            {/* <button onClick={() => setSidecart(false)}>X</button> */}
                                            {
                                                items.map((ele, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <p>{ele.title}</p>
                                                            <p >{ele.itemquantity}</p>
                                                            <button onClick={() => dispatch(addtocart(ele))}>+</button>
                                                            <button onClick={() => dispatch(decrease(ele))}>-</button>
                                                            {/* <p>{ele.price} EGB</p> */}
                                                            {/* <img src={ele.ImageUrl} /> */}
                                                            {/* <button onClick={() => dispatch(removefromcart(ele))}>X</button > */}
                                                        </div>
                                                    )
                                                })
                                            }
                                            <Link to='/cart' onClick={() => setSidecart(false)}>View All Cart</Link>
                                        </div>
                                    }
                                    <div className="dropdown">
                                        <button className='dropdown-btn'>pages
                                            <ion-icon name="chevron-down-outline"></ion-icon>
                                        </button>
                                        <div className="dropdown-menu">
                                            <NavLink className={activelink} to="/About">about</NavLink>
                                            <NavLink className={activelink} to="/Services">services</NavLink>
                                            <NavLink className={activelink} to="/News">news</NavLink>
                                            <NavLink className={activelink} to="/Team">team</NavLink>
                                            <NavLink className={activelink} to="/Faq">FAQ</NavLink>
                                            <NavLink className={activelink} to="/404">404</NavLink>
                                            <NavLink className={activelink} to="/Contact">contact</NavLink>
                                        </div>
                                    </div>
                                </nav>
                                <div className="account">
                                    {
                                        currentUser ?
                                            <>
                                                <Link to="/profile">
                                                    <span>{currentUser?.username}</span>
                                                    {
                                                        currentUser?.photoimage &&
                                                        <img src={currentUser?.photoimage} className='ml-2 w-8 h-8 rounded-full' alt="" />
                                                    }
                                                </Link>
                                                <button onClick={logouthandler}>Logout</button>
                                            </>
                                            :
                                            <>
                                                <Link to="/login">Login</Link>
                                                <Link to="/signup">Signup</Link>
                                            </>
                                    }

                                </div>
                            </div >
                        </header >
                    }
                </>
            }
        </>
    )
}

export default Navbar