import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import './EditInformationScreen.css';
import axios from 'axios';
import * as Constants from '../../constants/constants.js';
import NumberFormat from 'react-number-format';


export default function EditInformationScreen(props) {
    let navigate = useNavigate();
    const [userData, setUserData] = useState(props.userInfo);


    const handleChange = event => {
        // use spread operator
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
        console.log(event.target.name);
        console.log(event.target.value);
    };


    const EditInfo = async event => {
        event.preventDefault();
    
        try
        {
            const resData = await axios.put(`${Constants.url}/api/users/${userData.id}`,userData);
            // check if response was successful
            if(resData.status < 300)
            {
                console.log("success update");
                props.refresh();
                //navigate("/account");

            }
            else
            {
                console.log(resData.status);
                console.log(resData);
                // handle errors
            }
            //setAuthTokens(1);

        }
        catch(err)
        {
            console.log(err);
            //setAuthTokens(0);
        }
    }


     console.log(userData);

    return (
        <div>
                <div className="block">
                    <h2>Personal Information</h2>
                    <div style={{margin:"20px 0px 20px 3px"}}>
                        <h5>Full Name: {userData.firstName} {userData.lastName}</h5>
                    
                    </div>

                    <form>

                        <div className="form-info">
                            <div className="form-group col-md-6">
                                <label htmlFor="email" className="required-field-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Email" name='email' value={userData.email} onChange={handleChange} required></input>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="phone" class="required-field-label">Phone Number</label>
                                <NumberFormat type="tel" format="+1 (###) ###-####"  name='phoneNumber' value={userData.phoneNumber} onChange={value=>setUserData({...userData,"phoneNumber":value.formattedValue})} class="form-control" id="phone" placeholder="1-123-456-7890" required ></NumberFormat>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputAddress" className="required-field-label">Address</label>
                            <input type="text" className="form-control" id="address" placeholder="1234 Main St" name='address' value={userData.address} onChange={handleChange} required></input>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputCity" className="required-field-label">City</label>
                                <input type="text" className="form-control" id="city" name='city' value={userData.city} onChange={handleChange} required></input>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="state" className="required-field-label">State</label>
                                <select onChange={handleChange} value={userData.state} id="state" className="form-control" name="state">
                                    <option value="" selected>Choose...</option>
                                    <option value="Alaska">Alaska</option>
                                    <option value="Alabama">Alabama</option>
                                    <option value="Arkansas">Arkansas</option>
                                    <option value="Arizona">Arizona</option>
                                    <option value="California">California</option>
                                    <option value="Colorado">Colorado</option>
                                    <option value="Connecticut">Connecticut</option>
                                    <option value="District of Columbi">District of Columbia</option>
                                    <option value="Delaware">Delaware</option>
                                    <option value="Florida">Florida</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Hawaii">Hawaii</option>
                                    <option value="Iowa">Iowa</option>
                                    <option value="Idaho">Idaho</option>
                                    <option value="Illinois">Illinois</option>
                                    <option value="Indiana">Indiana</option>
                                    <option value="Kansas">Kansas</option>
                                    <option value="Kentucky">Kentucky</option>
                                    <option value="Louisiana">Louisiana</option>
                                    <option value="Massachusetts">Massachusetts</option>
                                    <option value="Maryland">Maryland</option>
                                    <option value="Maine">Maine</option>
                                    <option value="Michigan">Michigan</option>
                                    <option value="Minnesota">Minnesota</option>
                                    <option value="Missouri">Missouri</option>
                                    <option value="Mississippi">Mississippi</option>
                                    <option value="Montana">Montana</option>
                                    <option value="North Carolina">North Carolina</option>
                                    <option value="North Dakota">North Dakota</option>
                                    <option value="Nebraska">Nebraska</option>
                                    <option value="New Hampshire">New Hampshire</option>
                                    <option value="New Jersey">New Jersey</option>
                                    <option value="New Mexico">New Mexico</option>
                                    <option value="Nevada">Nevada</option>
                                    <option value="New York">New York</option>
                                    <option value="Ohio">Ohio</option>
                                    <option value="Oklahoma">Oklahoma</option>
                                    <option value="Oregon">Oregon</option>
                                    <option value="Pennsylvania">Pennsylvania</option>
                                    <option value="Puerto Rico">Puerto Rico</option>
                                    <option value="Rhode Island">Rhode Island</option>
                                    <option value="South Carolina">South Carolina</option>
                                    <option value="South Dakota">South Dakota</option>
                                    <option value="Tennessee">Tennessee</option>
                                    <option value="Texas">Texas</option>
                                    <option value="Utah">Utah</option>
                                    <option value="Virginia">Virginia</option>
                                    <option value="Vermont">Vermont</option>
                                    <option value="Washington">Washington</option>
                                    <option value="Wisconsin">Wisconsin</option>
                                    <option value="West Virginia">West Virginia</option>
                                    <option value="Wyoming">Wyoming</option>
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                <label for="inputZip" class="required-field-label">Zip</label>
                                <NumberFormat format="#####"  name='zip' value={userData.zipcode} onChange={value=>setUserData({...userData,"zipcode":value.formattedValue})} class="form-control" id="zip" placeholder="12345" required ></NumberFormat>

                            </div>
                        </div>

                    </form>
                </div>
                <div className="block">
                    <h2>Employment Information</h2>
                    <form>
                        <div className="form-emp">
                            <div className="form-group col-md-6">
                                <label htmlFor="jobTitle" className="required-field-label">Job Title</label>
                                <input type="text" className="form-control" id="jobTitle" name='job' value={userData.employment.title} onChange={e=>setUserData({...userData, employment : {  ...userData.employment,title :e.target.value }})} required></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="company" className="required-field-label">Company Name</label>
                                <input type="text" className="form-control" id="company" name='company' value={userData.employment.company} onChange={value=>setUserData({...userData, employment : { ...userData.employment,company :value.target.value }})} required></input>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="jobPhone" class="required-field-label">Contact Phone Number</label>
                                <NumberFormat type="tel" format="+1 (###) ###-####"  name='jobContact' value={userData.employment.phone} onValueChange={value=>setUserData({...userData,employment : { ...userData.employment,phone :value.formattedValue }})} class="form-control" id="jobContact" placeholder="1-123-456-7890" required ></NumberFormat>
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
                                <input type="text" className="form-control" id="contact1" name='contact1' value={userData.firstContact.name} onChange={value=>setUserData({...userData, firstContact : { ...userData.firstContact,name :value.target.value }})} required></input>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="contactPhone1" class="required-field-label">Contact Phone Number</label>
                                <NumberFormat type="tel" format="+1 (###) ###-####"  name='contactPhone1' value={userData.firstContact.phone} onValueChange={value=>setUserData({...userData,firstContact : { ...userData.firstContact,phone :value.formattedValue }})} class="form-control" id="contactPhone1" placeholder="1-123-456-7890" required ></NumberFormat>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="relation1" className="required-field-label">Relation to Self</label><br></br>
                                <select name="relation1" id='relation1' value={userData.firstContact.relationship} onChange={value=>setUserData({...userData, firstContact : { ...userData.firstContact,relationship:value.target.value }})}>
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
                                <input type="text" className="form-control" id="contact2" name='contact2' value={userData.secondContact.name} onChange={value=>setUserData({...userData, secondContact : { ...userData.secondContact,name :value.target.value }})} required></input>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="contactPhone2">Contact Phone Number</label>
                                <NumberFormat type="tel" format="+1 (###) ###-####"  name='contactPhone2' value={userData.secondContact.phone} onValueChange={value=>setUserData({...userData,secondContact : { ...userData.secondContact,phone :value.formattedValue }})} class="form-control" id="contactPhone2" placeholder="1-123-456-7890" required ></NumberFormat>
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="relation2" >Relation to Self</label><br></br>
                            <select name="relation2" id='relation2' value={userData.secondContact.relationship} onChange={value=>setUserData({...userData, secondContact : { ...userData.secondContact,relationship :value.target.value }})}>
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

                <form onSubmit={EditInfo}className="form-check2">
                        <div className="row">

                            <div className="col-6 text-left">

                                <button type="submit" className="btn btn-primary" >Save Changes</button>

                            </div>
                        </div>
                </form>

        </div>
    )
}