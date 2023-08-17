import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterScreen from '../register_screen/RegisterScreen.js';
import LoginScreen from '../login_screen/LoginScreen.js';
import HelpScreen from '../help_screen/HelpScreen.js';
import './HomeScreen.css'



export default function HomeScreen(props) {
    return (
        <div>
            <style type="text/css">
                {`
                .btn-flat {
                background-color: rgb(64, 22, 82);
                color: white;
                }

                .btn-xxl {
                padding: 1rem 1.5rem;
                font-size: 1.2rem;
                }
                `}
            </style>

            <h1>Welcome to Capgemini Bank</h1>

            <div className="home-block1">
                <p>Create a New Account </p>


                <Link to="/register">
                    <Button variant="flat" size="xxl">
                        Create Account
                    </Button>
                </Link>

            </div>
            <div className="home-block1">
                <p>Log In </p>
                <Link to="/login">
                    <Button variant="flat" size="xxl">
                        Log In
                    </Button>
                </Link>
            </div>

            <div className ="help">
                <p><Link to="/help">
                    <Button variant="flat" size="xxl">
                        Help
                </Button>
                </Link></p>
            </div>

        </div>
    )
}