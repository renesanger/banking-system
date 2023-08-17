import './HelpScreen.css'
import Accordion from 'react-bootstrap/Accordion'

export default function HelpScreen(props) {
    return (
<div>
    <h1>Need Help?</h1>
    <Accordion className="help-container">
        <Accordion.Item eventKey="0">
                <Accordion.Header>How to Open an Account</Accordion.Header>
                <Accordion.Body>
                    <p>
                        From the home page, go to open an account and click start.
                        <br></br>
                        This will bring you to the account creation screen. From there will will be asked to provide personal information, employment information and emergency contact information. 
                        <br></br>
                        Once all the required information is submitted, you will be redirected to the account display page.
                    </p>
                </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
            <Accordion.Header>Account Display Page</Accordion.Header>
            <Accordion.Body>
                <p>
                    The Account Display Page provides your name, account and routing numbers and you current balance.
                    <br></br>
                    A transaction history is also provided. Each transaction has a user statement file available for review.
                </p>
            </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
                <Accordion.Header>
                    Login/ Logout
                </Accordion.Header>
                    <Accordion.Body>
                        <p>
                            From the home page select Sign In, you will be prompted to provide your username and password. 
                            <br></br>
                            Once successfully signed in, you can sign out anytime by clicking Logout in the navigation bar.
                        </p>
                    </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
                <Accordion.Header>
                    Contact Us
                </Accordion.Header>
                    <Accordion.Body>
                        <p>
                        <span style={{'font-size': "19px"}}>Capgemini Bank General Information</span>
                        <br></br>
                        <br></br>
                        123 America Dr
                        <br></br>
                        Capital City, IL 60007
                        <br></br>
                        (616) 123-1234
                        <br></br>
                        <br></br>
                        help@capgemini.com
                        <br></br>
                        <br></br>
                        <img src='/assets/capgemini-map.png' alt='map of capgemini bank'/>
                        
                        </p>
                    </Accordion.Body>
        </Accordion.Item>
    </Accordion>
</div>
    )
}