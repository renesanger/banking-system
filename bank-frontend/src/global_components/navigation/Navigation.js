
import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import './Navigation.css'
import { useAuth } from "../../authentication/auth.js"

export default function Navigation(props){
    const { setAuthTokens } = useAuth();
    const { authTokens } = useAuth();

    function logout(){
        setAuthTokens(0);
    }

        return ( 
            authTokens == 0 ?
            <Navbar bg="dark" variant="dark">
                {/* <Container> */}
                <Navbar.Brand style={{marginLeft:"15px"}}>Capgemini Bank</Navbar.Brand>
                {/* </Container> */}
                <Nav className="mr-auto">
                    <Nav.Link className="navbar__link"  href="/home">Home</Nav.Link>
                    <Nav.Link className="navbar__link"  href="/register">Register</Nav.Link>
                    <Nav.Link className="navbar__link"  href="/login">Login</Nav.Link>
                    <Nav.Link className="navbar__link"  href="/help">Help</Nav.Link>
                
                </Nav>
               
            </Navbar>
            :
            <Navbar bg="dark" variant="dark">
            {/* <Container> */}
            <Navbar.Brand style={{marginLeft:"15px"}}>Capgemini Bank</Navbar.Brand>
            {/* </Container> */}
            <Nav className="mr-auto">
                <Nav.Link className="navbar__link"  href="/home">Home</Nav.Link>
                <Nav.Link className="navbar__link"  href="/account">Account</Nav.Link>
                <Nav.Link className="navbar__link"  href="/help">Help</Nav.Link>
            
            </Nav>
            <Nav className="justify-content-end">
                <Nav.Link className="navbar__link " onClick={() => logout()} href="/login">Logout</Nav.Link>
            </Nav>
           
            </Navbar>
        )
}