import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import LoginScreen from '../login_screen/LoginScreen.js';
import './RegisterScreen.css';
import axios from 'axios';
import * as Constants from '../../constants/constants.js';
import { useAuth } from "../../authentication/auth.js"
import NumberFormat from 'react-number-format';
import Alert from "react-bootstrap/Alert"


export default function RegisterScreen(props) {
    const { setAuthTokens} = useAuth();
    const [validLogin, setValidLogin] = useState(true);

    let navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        telValue: '', 
        username: '',
        password: '',
        dob: '0000-00-00T00:00:00',
        ssnValue: '',

        address: '',
        city: '',
        inputstate: '', 
        zip: '',

        accountType: '',
        job: '',
        company: '',
        jobContact: '',
        contact1: '',
        contactPhone1: '',
        relation1: '',
        contact2: '',
        contactPhone2: '',
        relation2: '',

        error: {
            firstName: 'Enter First Name',
            lastName: 'Enter Last Name',
            email: 'Enter Email', 
            telValue: 'Enter Telephone Number', 
            username: 'Enter Username',
            password: 'Enter a Password',
            dob: 'Enter Date of Birth', 
            ssnValue: 'Enter Social Security Number',
    
            address: 'Enter Address',
            city: 'Enter City',
            inputstate: 'Select State',  
            zip: 'Enter Zip Code',
    
            accountType: 'Select Account Type', 
            job: 'Enter Job Title',
            company: 'Enter Company Name',
            jobContact: 'Enter Company Phone Number', 
            contact1: 'Enter Contact1 Name',
            contactPhone1: 'Enter Contact1 Phone Number', 
            relation1: 'Select Relation to Contact1',        
            contactPhone2: ''        
        },
        //ssnError: '',
    });

    const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );
      const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
      };

    const validateInput = (id,value) => {
        let name = document.getElementById(id).name;
        //let error = userData.error;
        switch(name) {
            case ("ssnValue"):
                var localssn = value;
                localssn = localssn.replace(/[^0-9]/g, "");
                userData.error.ssnValue = localssn.length == 9 ? '' : "Invalid Social Security";
                localssn.length == 9 ? document.getElementById(id).style = "border: 1px solid black;" :document.getElementById(id).style = "border: 1px solid #db2269;";
                //setUserData(state => ({ ...state, ssnError : localssn.length == 9 ? '' : 'Invalid social' }));
                break;
            case ("firstName"):
                userData.error.firstName = value.length > 1 ? '' : "Invalid First Name";
                value.length > 1 ? document.getElementById(id).style = "border: 1px solid black;" :document.getElementById(id).style = "border: 1px solid #db2269;";
                break;
            case ("lastName"):
                userData.error.lastName = value.length > 1 ? '' : "Invalid Last Name";
                value.length > 1 ? document.getElementById(id).style = "border: 1px solid black;" :document.getElementById(id).style = "border: 1px solid #db2269;";
                break;
            case ("username"):
                userData.error.username = value.length > 1 ? '' : "Invalid Username";
                value.length > 1 ? document.getElementById(id).style = "border: 1px solid black;" :document.getElementById(id).style = "border: 1px solid #db2269;";
                break;
            case ("password"):
                userData.error.password = value.length > 1 ? '' : "Invalid Password";
                value.length > 1 ? document.getElementById(id).style = "border: 1px solid black;" :document.getElementById(id).style = "border: 1px solid #db2269;";
                break;
            case ("address"):
                userData.error.address = value.length > 1 ? '' : "Invalid Address";
                value.length > 1 ? document.getElementById(id).style = "border: 1px solid black;" :document.getElementById(id).style = "border: 1px solid #db2269;";
                break;
            case ("city"):
                userData.error.city = value.length > 1 ? '' : "Invalid City";
                value.length > 1 ? document.getElementById(id).style = "border: 1px solid black;" :document.getElementById(id).style = "border: 1px solid #db2269;";
                break;
            case ("inputstate"):
                userData.error.inputstate = value != '' ? '' : "Invalid State";
                value != '' ? document.getElementById(id).style = "border: 1px solid black;" :document.getElementById(id).style = "border: 1px solid #db2269;";
                break;
            case ("zip"):
                var localzip = value;
                localzip = localzip.replace(/[^0-9]/g, "");
                userData.error.zip = localzip.length == 5 ? '' : "Invalid Zip Code";
                localzip.length == 5 ? document.getElementById(id).style = "border: 1px solid black;" :document.getElementById(id).style = "border: 1px solid #db2269;";
                break;
            case ("job"):
                userData.error.job = value.length > 1 ? '' : "Invalid Job Title";
                value.length > 1 ? document.getElementById(id).style = "border: 1px solid black;" :document.getElementById(id).style = "border: 1px solid #db2269;";
                break;
            case ("company"):
                userData.error.company = value.length > 1 ? '' : "Invalid Company Name";
                value.length > 1 ? document.getElementById(id).style = "border: 1px solid black;" :document.getElementById(id).style = "border: 1px solid #db2269;";
                break;
            case ("contact1"):
                userData.error.contact1 = value.length > 1 ? '' : "Invalid Contact Name";
                value.length > 1 ? document.getElementById(id).style = "border: 1px solid black;" :document.getElementById(id).style = "border: 1px solid #db2269;";
                break;
            case ("telValue"):
                var localTel = value;
                localTel = localTel.replace(/[^0-9]/g, "");
                userData.error.telValue = localTel.length == 11 ? '' : "Invalid Telephone Number";
                localTel.length == 11 ? document.getElementById(id).style = "border: 1px solid black;" :document.getElementById(id).style = "border: 1px solid #db2269;";
                break;
            case ("jobContact"):
                var localjobContact = value;
                localjobContact = localjobContact.replace(/[^0-9]/g, "");
                userData.error.jobContact = localjobContact.length == 11 ? '' : "Invalid Telephone Number";
                localjobContact.length == 11 ?  document.getElementById(id).style = "border: 1px solid black;" :document.getElementById(id).style = "border: 1px solid #db2269;";
                break;
            case ("contactPhone1"):
                var localcontactNumberValue1 = value;
                localcontactNumberValue1 = localcontactNumberValue1.replace(/[^0-9]/g, "");
                userData.error.contactPhone1 = localcontactNumberValue1.length == 11 ? '' : "Invalid Telephone Number";
                localcontactNumberValue1.length == 11 ?  document.getElementById(id).style = "border: 1px solid black;" :document.getElementById(id).style = "border: 1px solid #db2269;";
                break;
            case ("contactPhone2"):
                var localcontactNumberValue2 = value;
                localcontactNumberValue2 = localcontactNumberValue2.replace(/[^0-9]/g, "");
                userData.error.contactPhone2 = (localcontactNumberValue2.length == 11) || (localcontactNumberValue2.length == 0)? '' : "Invalid Telephone Number";
                (localcontactNumberValue2.length == 11)|| (localcontactNumberValue2.length == 0) ?  document.getElementById(id).style = "border: 1px solid black;" :document.getElementById(id).style = "border: 1px solid #db2269;";
                break;
            case ("dob"):
                userData.error.dob = value != '0000-00-00T00:00:00' ? '' : "Invalid Date of Birth";
                break;
            case ("email"):
                userData.error.email = validEmailRegex.test(value) ? '' : "Invalid Email";
                validEmailRegex.test(value) ?  document.getElementById(id).style = "border: 1px solid black;" :document.getElementById(id).style = "border: 1px solid #db2269;";
                break;
            case ("accountType"):
                userData.error.accountType = value != '' ? '' : "Invalid Account Type";
                break;
            case ("relation1"):
                userData.error.accountType = value != '' ? '' : "Invalid Relation";
                break;
            default:
                    break;

        }
    }


    const handleChange = event => {
        // use spread operator
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
        validateInput(event.target.name, event.target.value);

    };





    const register = async event => {
        event.preventDefault();
        try 
        {
            //let navigate = useNavigate();
            const user = {
                Id: userData.username,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName,
                middleName: userData.middleName,
                email: userData.email,
                dateOfBirth: userData.dob,
                phoneNumber: userData.telValue,
                socialSecurityNumber: userData.ssnValue,
                address: userData.address,
                city: userData.city,
                state: userData.inputstate,
                zipcode: userData.zip,
                account: {
                    id: "",
                    routing: "",
                    balance: 0,
                    type: userData.accountType,
                },
                employment: {
                    company: userData.company,
                    phone: userData.jobContact,
                    title: userData.job
                },
                firstContact: {
                    name: userData.contact1,
                    phone: userData.contactPhone1,
                    relationship: userData.relation1
                },
                secondContact: {
                    name: userData.contact2,
                    phone: userData.contactPhone2,
                    relationship: userData.relation2
                },
                transactions: []

            }

            const resData = await axios.post(`${Constants.url}/api/users/register`, user);
            // check if response was successful
            if(resData.status == 200)
            {
                setAuthTokens(1);
                navigate('/account');
            }
            else {
                // handle errors
                //console.log(resData.);
                setValidLogin(false);
            }
            //setAuthTokens(1);

        }
        catch (err) {
            setValidLogin(false);
            // console.log(err);
            //setAuthTokens(0);
        }
    }


    console.log(userData);

    return (
        <div>
            <h1>Register with Capgemini Bank</h1>
            <div className="block1">
                <div className="block">
                    <h2>Personal Information</h2>
                    <Alert style={{ display: !validLogin  ? 'block': 'none'}} variant={"danger"}>
                        Username has already been taken.
                    </Alert>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="username" className="required-field-label">Username</label>
                                <input type="username" className="form-control" id="username" placeholder="Username" name='username' value={userData.username} onChange={handleChange} required></input>
                                {userData.error.username != '' && 
                                <span className='invalid'>{userData.error.username}</span>}
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="password" className="required-field-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" name='password' value={userData.password} onChange={handleChange} required></input>
                                {userData.error.password != '' && 
                                <span className='invalid'>{userData.error.password}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="firstName" className="required-field-label">First name</label>
                                <input type="text" className="form-control" id="firstName" placeholder="First name" name='firstName' value={userData.firstName} onChange={handleChange} required ></input>
                                {userData.error.firstName != '' && 
                                <span className='invalid'>{userData.error.firstName}</span>}
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="middleName">Middle name</label>
                                <input type="text" className="form-control" id="middleName" placeholder="Middle name" name='middleName' value={userData.middleName} onChange={handleChange} ></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="lastName" className="required-field-label">Last name</label>
                                <input type="text" className="form-control" id="lastName" placeholder="Last name" name='lastName' value={userData.lastName} onChange={handleChange} required></input>
                                {userData.error.lastName != '' && 
                                <span className='invalid'>{userData.error.lastName}</span>}
                            </div>
                        </div>

                        <div className="form-info">
                            <div className="form-group col-md-6">
                                <label htmlFor="email" className="required-field-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Email" name='email' value={userData.email} onChange={handleChange} required></input>
                                {userData.error.email != '' && 
                                <span className='invalid'>{userData.error.email}</span>}
                            </div>
                            <div class="form-group col-md-6">
                                <label for="phone" class="required-field-label">Phone Number</label>
                                <NumberFormat type="tel" format="+1 (###) ###-####"  name='telValue' value={userData.telValue} onValueChange={value=>{
                                    setUserData({...userData,"telValue":value.formattedValue}) 
                                    validateInput('telValue', value.formattedValue);
                                    }} class="form-control" id="telValue" placeholder="1-123-456-7890" required ></NumberFormat>
                                {userData.error.telValue != '' && 
                                <span className='invalid'>{userData.error.telValue}</span>}
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="dob" className="required-field-label">Date of Birth</label>
                                <input type="date" className="form-control" id="dob" placeholder="DOB" name='dob' value={userData.dob} onChange={handleChange} required></input>
                                {userData.error.dob != '' && 
                                <span className='invalid'>{userData.error.dob}</span>}
                            </div>
                            <div class="form-group col-md-6">
                                <label for="ssn" class="required-field-label">Social Secuirty Number</label>
                                {/* <input type="text" name='ssnValue' value={userData.ssnValue} onChange={ssnChange} class="form-control" id="ssn" pattern="[0-9]{5}" placeholder="SSN" required></input> */}
                                <NumberFormat format="###-##-####"  name='ssnValue' value={userData.ssnValue} onValueChange={ (value)=> 
                                    {
                                        setUserData({...userData,"ssnValue":value.formattedValue})
                                        validateInput('ssnValue', value.formattedValue);
                                        //validateSocial(value.formattedValue);
                                    }} class="form-control" id="ssnValue" placeholder="123-45-6789" required ></NumberFormat>
                                {userData.error.ssnValue != '' && 
                                <span className='invalid'>{userData.error.ssnValue}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputAddress" className="required-field-label">Address</label>
                            <input type="text" className="form-control" id="address" placeholder="1234 Main St" name='address' value={userData.address} onChange={handleChange} required></input>
                            {userData.error.address != '' && 
                            <span className='invalid'>{userData.error.address}</span>}
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputCity" className="required-field-label">City</label>
                                <input type="text" className="form-control" id="city" name='city' value={userData.city} onChange={handleChange} required></input>
                                {userData.error.city != '' && 
                                <span className='invalid'>{userData.error.city}</span>}
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputState" className="required-field-label">State</label>
                                <select onChange={handleChange} id="inputstate" className="form-control" name="inputstate">
                                    <option value={userData.inputstate} selected>Choose...</option>
                                    <option value={userData.inputState}>Alaska</option>
                                    <option value={userData.inputState}>Alabama</option>
                                    <option value={userData.inputState}>Arkansas</option>
                                    <option value={userData.inputState}>Arizona</option>
                                    <option value={userData.inputState}>California</option>
                                    <option value={userData.inputState}>Colorado</option>
                                    <option value={userData.inputState}>Connecticut</option>
                                    <option value={userData.inputState}>District of Columbia</option>
                                    <option value={userData.inputState}>Delaware</option>
                                    <option value={userData.inputState}>Florida</option>
                                    <option value={userData.inputState}>Georgia</option>
                                    <option value={userData.inputState}>Hawaii</option>
                                    <option value={userData.inputState}>Iowa</option>
                                    <option value={userData.inputState}>Idaho</option>
                                    <option value={userData.inputState}>Illinois</option>
                                    <option value={userData.inputState}>Indiana</option>
                                    <option value={userData.inputState}>Kansas</option>
                                    <option value={userData.inputState}>Kentucky</option>
                                    <option value={userData.inputState}>Louisiana</option>
                                    <option value={userData.inputState}>Massachusetts</option>
                                    <option value={userData.inputState}>Maryland</option>
                                    <option value={userData.inputState}>Maine</option>
                                    <option value={userData.inputState}>Michigan</option>
                                    <option value={userData.inputState}>Minnesota</option>
                                    <option value={userData.inputState}>Missouri</option>
                                    <option value={userData.inputState}>Mississippi</option>
                                    <option value={userData.inputState}>Montana</option>
                                    <option value={userData.inputState}>North Carolina</option>
                                    <option value={userData.inputState}>North Dakota</option>
                                    <option value={userData.inputState}>Nebraska</option>
                                    <option value={userData.inputState}>New Hampshire</option>
                                    <option value={userData.inputState}>New Jersey</option>
                                    <option value={userData.inputState}>New Mexico</option>
                                    <option value={userData.inputState}>Nevada</option>
                                    <option value={userData.inputState}>New York</option>
                                    <option value={userData.inputState}>Ohio</option>
                                    <option value={userData.inputState}>Oklahoma</option>
                                    <option value={userData.inputState}>Oregon</option>
                                    <option value={userData.inputState}>Pennsylvania</option>
                                    <option value={userData.inputState}>Puerto Rico</option>
                                    <option value={userData.inputState}>Rhode Island</option>
                                    <option value={userData.inputState}>South Carolina</option>
                                    <option value={userData.inputState}>South Dakota</option>
                                    <option value={userData.inputState}>Tennessee</option>
                                    <option value={userData.inputState}>Texas</option>
                                    <option value={userData.inputState}>Utah</option>
                                    <option value={userData.inputState}>Virginia</option>
                                    <option value={userData.inputState}>Vermont</option>
                                    <option value={userData.inputState}>Washington</option>
                                    <option value={userData.inputState}>Wisconsin</option>
                                    <option value={userData.inputState}>West Virginia</option>
                                    <option value={userData.inputState}>Wyoming</option>
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                <label for="inputZip" class="required-field-label">Zip</label>
                                <NumberFormat format="#####"  name='zip' value={userData.zip} onValueChange={value=>{
                                    setUserData({...userData,"zip":value.formattedValue})
                                    validateInput('zip', value.formattedValue);
                                    }} class="form-control" id="zip" placeholder="12345" required ></NumberFormat>
                                {userData.error.zip != '' && 
                                <span className='invalid'>{userData.error.zip}</span>}
                            </div>
                        </div>

                    </form>



                </div>
                <div className="block form-group" >
                    <h2>Select Type of Account</h2>
                    <div className="required-field-label required-text"> required field</div>
                    <div className="form-check" >
                        <input className="form-check-input" type="radio" name="accountType" id="accountType" value="checking" onChange={handleChange} ></input>
                        <label className="form-check-label" htmlFor="exampleRadios1">
                            Checking
                                </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="accountType" id="accountType" value="saving" onChange={handleChange}></input>
                        <label className="form-check-label" htmlFor="exampleRadios2">
                            Saving
                                    </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="accountType" id="accountType" value="college" onChange={handleChange}></input>
                        <label className="form-check-label" htmlFor="exampleRadios3">
                            College
                                    </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="accountType" id="accountType" value="retirement" onChange={handleChange}></input>
                        <label className="form-check-label" htmlFor="exampleRadios4">
                            Retirement
                                    </label>
                    </div>
                </div>
                <div className="block">
                    <h2>Employment Information</h2>
                    <form>
                        <div className="form-emp">
                            <div className="form-group col-md-6">
                                <label htmlFor="jobTitle" className="required-field-label">Job Title</label>
                                <input type="text" className="form-control" id="job" name='job' value={userData.job} onChange={handleChange} required></input>
                                {userData.error.job != '' && 
                                <span className='invalid'>{userData.error.job}</span>}
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="company" className="required-field-label">Company Name</label>
                                <input type="text" className="form-control" id="company" name='company' value={userData.company} onChange={handleChange} required></input>
                                {userData.error.company != '' && 
                                <span className='invalid'>{userData.error.company}</span>}
                            </div>
                            <div class="form-group col-md-6">
                                <label for="jobPhone" class="required-field-label">Contact Phone Number</label>
                                <NumberFormat type="tel" format="+1 (###) ###-####"  name='jobContact' value={userData.jobContact} onValueChange={value=>{
                                    setUserData({...userData,"jobContact":value.formattedValue})
                                    validateInput('jobContact', value.formattedValue);
                                    }} class="form-control" id="jobContact" placeholder="1-123-456-7890" required ></NumberFormat>
                                {userData.error.jobContact != '' && 
                                <span className='invalid'>{userData.error.jobContact}</span>}
                            </div>
                        </div>
                    </form>

                </div>

                <div className="block">
                    <h2>Emergency Contact</h2>
                    <form>
                        <div className="form-contact">
                            <div className="form-group col-md-6">
                                <label htmlFor="contact1" className="required-field-label">First Contact Name</label>
                                <input type="text" className="form-control" id="contact1" name='contact1' value={userData.contact1} onChange={handleChange} required></input>
                                {userData.error.contact1 != '' && 
                                <span className='invalid'>{userData.error.contact1}</span>}
                            </div>
                            <div class="form-group col-md-6">
                                <label for="contactPhone1" class="required-field-label">Contact Phone Number</label>
                                <NumberFormat type="tel" format="+1 (###) ###-####"  name='contactPhone1' value={userData.contactPhone1} onValueChange={value=>{
                                    setUserData({...userData,"contactPhone1":value.formattedValue})
                                    validateInput("contactPhone1", value.formattedValue);
                                    }} class="form-control" id="contactPhone1" placeholder="1-123-456-7890" required ></NumberFormat>
                                {userData.error.contactPhone1 != '' && 
                                <span className='invalid'>{userData.error.contactPhone1}</span>}
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="relation1" className="required-field-label" required>Relation to Self</label><br></br>
                                <select name="relation1" id='relation1' value={userData.relation1} onChange={handleChange}>
                                    <option value="N/A">Select</option>
                                    <option value="Mother">Mother</option>
                                    <option value="Father">Father</option>
                                    <option value="Sister">Sister</option>
                                    <option value="Brother">Brother</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div><br></br>

                            <div className="form-group col-md-6">
                                <label htmlFor="contact2">Second Contact Name</label>
                                <input type="text" className="form-control" id="contact2" name='contact2' value={userData.contact2} onChange={handleChange} ></input>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="contactPhone2">Contact Phone Number</label>
                                <NumberFormat type="tel" format="+1 (###) ###-####"  name='contactPhone2' value={userData.contactPhone2} onValueChange={value=>{
                                    setUserData({...userData,"contactPhone2":value.formattedValue})
                                    validateInput("contactPhone2", value.formattedValue);
                                    }} class="form-control" id="contactPhone2" placeholder="1-123-456-7890"  ></NumberFormat>
                                    {userData.error.contactPhone2 != '' && 
                                <span className='invalid'>{userData.error.contactPhone2}</span>}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="relation2" >Relation to Self</label><br></br>
                            <select name="relation2" id='relation2' value={userData.relation2} onChange={handleChange}>
                                <option value="N/A">Select</option>
                                <option value="Mother">Mother</option>
                                <option value="Father">Father</option>
                                <option value="Sister">Sister</option>
                                <option value="Brother">Brother</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </form>

                </div>

                <form onSubmit={register} className="form-check2">
                    <div>
                        <input type="checkbox" className="form-check-input" id="submit" required></input>
                        <label className="form-check-label" htmlFor="submit">I have read the terms and conditions</label>
                        <br></br>
                        <a href='https://www.capgemini.com/us-en/terms-of-use/' target="_blank" rel="noreferrer" style={{ fontSize: "14px" }}> Terms and Conditions</a>


                        <div className="row">

                            <div className="col-6 text-left">

                                <button type="submit" className="btn btn-primary" >Submit</button>

                            </div>
                            <div className="col-6 text-right">
                                <Link to='/'>
                                    <Button className="btn btn-primary" type='cancel'>
                                        Cancel
                                </Button>
                                </Link>


                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}