import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import RegisterScreen from '../register_screen/RegisterScreen.js';
import './loginStyle.css';
import axios from 'axios';
import * as Constants from '../../constants/constants.js';
import { useAuth } from "../../authentication/auth.js"
import Alert from "react-bootstrap/Alert"

import React, { useState} from 'react';

axios.defaults.withCredentials = true;


export default function LoginScreen(props) {

    let navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        username:"", password: ""
    })

    // // set it to 0 if unauth, else 1 if auth successful
    const { setAuthTokens} = useAuth();

    const [validLogin, setValidLogin] = useState(true);

    function login(event) {
        event.preventDefault();
    
        async function siginIn(){
            try
            {
                const resData = await axios.post(`${Constants.url}/api/users/login`,userInfo);
                // check if response was successful
                if(resData.status == 200)
                {
                    setAuthTokens(1);
                    navigate('/account');
                    setValidLogin(true);
                }
                else
                {
                    
                    // handle errors
                    setValidLogin(false);
                    setAuthTokens(0);
                }
                //setAuthTokens(1);

            }
            catch(err)
            {
                setValidLogin(false);
                // console.log(validLogin);
                console.log(err);
                setAuthTokens(0);
            }
        }
        siginIn();
    }

    return (
        <div>
            <h1>Sign In for Capgemini Bank</h1>
            <div className = "block2">
                <Alert style={{ display: !validLogin  ? 'block': 'none'}} variant={"danger"}>
                    Invalid Username or Password
                </Alert>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value})} type="text" placeholder="Enter username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value})} type="password" placeholder="Password" />
                </Form.Group>

                <p><Link to = "/register">Create an Account</Link></p>

                <Button onClick={ (e) => login(e) } variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            </div>
            
        </div>
    )
}

