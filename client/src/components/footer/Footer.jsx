import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import Logo from "../../assets/logo.png"
import { AuthContext } from '../../context/AuthContext'

const Footer = () => {
    const { currentUser } = useContext(AuthContext)
    // const [activeside, setActiveside] = useState(true)
    // useEffect(() => {
    //     if (location.pathname === "/profile/chat") {
    //         setActiveside(false)
    //         // console.log('true');
    //     }
    // }, [location.pathname])
    return (
        <>
            {currentUser &&
                <footer>
                    <div className="overlay">
                        <div className="cell">
                            <img className="logo" src={Logo} width={100} />
                            <p>LAVA is an application that combines car wash and
                                car dealership services. The application provides a
                                unique user experience, as it can help you wash the car
                                and purchase car tools easily through the application</p>
                            <div className="social">
                                <ion-icon name="logo-facebook"></ion-icon>
                                <ion-icon name="logo-twitter"></ion-icon>
                                <ion-icon name="logo-youtube"></ion-icon>
                                <ion-icon name="logo-wordpress"></ion-icon>
                            </div>
                        </div>
                        <div className="cell">
                            <h2>other pages</h2>
                            <ul className="other-pages">
                                <li>
                                    <Link href="#"> home</Link>
                                </li>
                                <li>
                                    <Link href="#"> about us</Link>
                                </li>
                                <li>
                                    <Link href="#"> service</Link>
                                </li>
                                <li>
                                    <Link href="#"> contact</Link>
                                </li>
                                <li>
                                    <Link href="#"> team</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="cell">
                            <h2>quick links</h2>
                            <ul className="quick-links">
                                <li>
                                    <Link href="#"> FAQ</Link>
                                </li>
                                <li>
                                    <Link href="#"> News</Link>
                                </li>
                                <li>
                                    <Link href="#"> comming soon</Link>
                                </li>
                                <li>
                                    <Link href="#"> 404</Link>
                                </li>
                                <li>
                                    <Link href="#"> credit</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="cell">
                            <h2>newsletter</h2>
                            <p>subscribe to newsletter</p>
                            <input type="email" placeholder="email" />
                            <br />
                            <input type="button" value="subscribe" />
                        </div>
                    </div>
                </footer>
            }
        </>

    )
}

export default Footer