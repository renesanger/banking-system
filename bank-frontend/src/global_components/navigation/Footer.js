
import React from "react"
import './Footer.css'

const Footer = () => <footer className="page-footer font-small blue pt-4">
    <div className="footer-container">
        <div className="row-footer">
            <div className="col-md-3 mt-md-0 mt-3">
                <h5 className="text-uppercase">Capgemini Bank</h5>
                <p style={{'fontStyle': "italic", 'fontSize': "15px", 'marginLeft': "3%"}}>Banking for the people</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Personal</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">Checking Accounts</a></li>
                    <li><a href="#!">Savings Accounts</a></li>
                    <li><a href="#!">Credit Cards</a></li> 
                    <li><a href="#!">Mortgages</a></li>
                    <li><a href="#!">Auto</a></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Support</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">Planning & Investments</a></li>
                    <li><a href="#!">Business Banking</a></li>
                </ul>
            </div>
            
            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">About</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">About Capgemini Bank</a></li>
                    <li><a href="#!">Careers</a></li>
                    <li><a href="https://www.capgemini.com/us-en/terms-of-use/" target="_blank" rel="noreferrer">Terms and Conditions</a></li>
                </ul>
            </div>
        </div>
    </div>


</footer>

export default Footer