import Nav from 'react-bootstrap/Nav';
import {  Routes, Route, useLocation } from 'react-router-dom';
import Home from '../components/Home';
import UserRouter from './user';
import { useEffect, useState } from 'react';
import DeliveryRouter from './delivery';

import './index.css';


const Router = () => {
    let [loggedIn, setLoggedIn] = useState<Boolean>(false)
    let location = useLocation()
    
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token)
        {
            setLoggedIn(true)
        }
    }, [location])


    return (
        <>
            <div className="flex flex-col items-center">
                <Nav className="justify-content-center" activeKey="/">
                    {
                        !loggedIn?
                            <>
                                <Nav.Item>
                                    <Nav.Link href="/">Home</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/user/login">Login</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/user/register">Signup</Nav.Link>
                                </Nav.Item>
                            </> :
                            <>
                                <Nav.Item>
                                    <Nav.Link href="/user/profile">Profile</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/delivery/tracking">Tracking</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/user/logout">Logout</Nav.Link>
                                </Nav.Item>
                            </>
                                  
                    }
                </Nav>
                <div className="text-center mb-5">
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="user/*" element={<UserRouter />} />
                        <Route path="delivery/*" element={<DeliveryRouter />} />
                    </Routes>
                </div>
            </div>
        </>
    );
};

export default Router;
