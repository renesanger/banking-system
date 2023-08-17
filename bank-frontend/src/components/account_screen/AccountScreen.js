import ListGroup from "react-bootstrap/ListGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Accordion from "react-bootstrap/Accordion";
import Offcanvas from "react-bootstrap/Offcanvas"
import Card from "react-bootstrap/Card"
import "./AccountScreen.css";
import { useEffect, useState } from "react";
import axios from "axios"
import * as Constants from '../../constants/constants.js';
import Statements from "../statements_screen/Statements";
import {statement } from "../../data/data.js";
import EditInformationScreen from "../editInformation_screen/EditInformationScreen";
import Pagination from "react-bootstrap/Pagination";

export default function AccountScreen(props) {
  const [userInfo, setUserInfo] = useState({
    Id: "",
    password: "",
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    socialSecurityNumber: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    account: {
        id: 0,
        routing: 0,
        balance: 0,
        type: "",
    },
    employment: {
        company: "",
        phone: "",
        title: ""
    },
    firstContact: {
        name: "",
        phone: "",
        relationship: ""
    },
    secondContact: {
        name: "",
        phone: "",
        relationship: ""
    },
    transactions: []
})

    

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const [transactionList, setTransactionList] = useState([]);
  const [currDate, setCurrDate] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();

  async function getAccount()
  {
    try
    {
      const userData = await axios.get(`${Constants.url}/api/users/account`);
      // console.log(userData);
      if(userData.status !== 200)
      {
        //throw new Error(userData.data.error);
        console.log("error");
      }

      let data = userData.data;
      setUserInfo(data);

      var today = new Date();
      var priorDate = new Date(new Date().setDate(today.getDate() - 30));
      setStartDate(priorDate);
      setEndDate(today);
      setCurrDate(priorDate.toLocaleString('en-us', { year: 'numeric', month: 'long', day: 'numeric' }) 
      + " - " + today.toLocaleString('en-us', { year: 'numeric', month: 'long', day: 'numeric' }));

      let transactions = data.transactions.filter(d => {return new Date(d.date) > priorDate && new Date(d.date) < today});
      setTransactionList(transactions);
      
    }
    catch(error)
    {
      if(error.response)
      {
        //props.history.push()
      }
      else if(error.request)
      {

      }
      else
      {

      }

    }
  }

  useEffect(() => {
      getAccount();
  },[props]);

 
   function handleOnPrev(){
      var start = new Date(startDate.setDate(startDate.getDate() - 30));
      var end = new Date(endDate.setDate(endDate.getDate() - 30));
      setStartDate(start);
      setEndDate(end);
      setCurrDate(start.toLocaleString('en-us', { year: 'numeric', month: 'long', day: 'numeric' }) 
      + " - " + end.toLocaleString('en-us', { year: 'numeric', month: 'long', day: 'numeric' }));

      let transactions = userInfo.transactions.filter((d) => {return new Date(d.date) > startDate && new Date(d.date) < endDate});
      setTransactionList(transactions);
  }
  function handleOnNext(){
      var start = new Date(startDate.setDate(startDate.getDate() + 30));
      var end = new Date(endDate.setDate(endDate.getDate() + 30));
      setStartDate(start);
      setEndDate(end);
      setCurrDate(start.toLocaleString('en-us', { year: 'numeric', month: 'long', day: 'numeric' }) 
      + " - " + end.toLocaleString('en-us', { year: 'numeric', month: 'long', day: 'numeric' }));

      let transactions = userInfo.transactions.filter(d => new Date(d.date) > startDate && new Date(d.date) < endDate);
      setTransactionList(transactions);
  }


  function refresh()
  {
    console.log("refresh called");
    handleCloseEdit();
    window.location.reload();
  }



  const listgroup = transactionList.map((item) => {
    return (
      <ListGroup.Item key={item.tid} as="h5" >
        <div style={{margin:"0 10% 0 0", display:"flex"}}>
        <h5 style={{flexGrow:1}}>{new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit"
        }).format(new Date(item.date))}</h5>
        <h5 style={{flexGrow:1}}>{item.description}</h5>
        <h5 >{new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(item.amount)}</h5>
        </div>
      </ListGroup.Item>
    );
  });
  return (
    <div style={{width: "80%", marginLeft:"10%", marginTop:"1%", marginBottom:"2%"}}>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="1">
          <Accordion.Header className="header">
            <span>User Information</span>
          </Accordion.Header>
          <Accordion.Body>
            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: "1" }}>
                <h5>
                  Full Name: {userInfo.firstName} {userInfo.middleName}{" "}
                  {userInfo.lastName}
                </h5>
                <h5>DOB: {new Date(userInfo.dateOfBirth).toLocaleDateString("en-US",{year: "numeric",
     month:"2-digit",
     day:"2-digit"})}</h5>
                <h5>SSN: xxx-xx-{userInfo.socialSecurityNumber.slice(-4)}</h5>
                <h5>Phone: {userInfo.phoneNumber}</h5>
              </div>
              <div style={{ flexGrow: "1" }}>
                <h5>
                  Address: {userInfo.address}, {userInfo.city}, {userInfo.state} {userInfo.zipcode}
                </h5>
                <h5>Email: {userInfo.email}</h5>
                <h5>Job Title: {userInfo.employment.title}</h5>
                <h5>Company Name: {userInfo.employment.company}</h5>
              </div>
              <div style={{ flexGrow: "1" }}>
                <h5>Contact 1: {userInfo.firstContact.name} ({userInfo.firstContact.relationship})</h5>
                <h5>Phone 1: {userInfo.firstContact.phone}</h5>
                <h5>Contact 2: {userInfo.secondContact.name} ({userInfo.secondContact.relationship})</h5>
                <h5>Phone 2: {userInfo.secondContact.phone}</h5>
              </div>
            </div>
            <a href="javascript:" onClick={handleShowEdit}>Edit Information</a>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="1">
          <Accordion.Header className="header">
            Account Type: {userInfo.account.type}
          </Accordion.Header>
          <Accordion.Body style ={{display:"flex"}}>
            
            <div style={{flexGrow:"1"}}>
            <h1 style={{textAlign:"left", margin:"10px 0px 0px 0px"}}>{new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
              }).format(userInfo.account.balance)}</h1>
            <h5>Available Balance </h5>
            <a href='javascript:;' onClick={handleShow}>View Statements</a>
            </div>
            <div style={{ margin:"16px", flexGrow:"4"}}>
            <h5>Account Number: {userInfo.account.id}</h5>
            <h5>Routing Number: {userInfo.account.routing}</h5>
            </div>

          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="1">
          <Accordion.Header className="header">
            Recent Activity
          </Accordion.Header>
          <Accordion.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                {/* <DropdownButton
                  id="dropdown-item-button"
                  title="Sort by date"
                  variant="outline-dark"
                  style={{ paddingBottom: "1em" }}
                  size="lg"
                >
                  <Dropdown.Item as="button">Past 30 days</Dropdown.Item>
                  <Dropdown.Item as="button">Year-to-date</Dropdown.Item>
                </DropdownButton> */}
                <Pagination style={{fontSize:"15pt", widht:"800px !important"}}>
                  
                  {/* <Pagination.First> {"<<"} </Pagination.First> */}
                  <Pagination.Prev onClick={handleOnPrev}>{"<"}</Pagination.Prev>
                  <Pagination.Item>{currDate}</Pagination.Item>
                  <Pagination.Next onClick={handleOnNext}>{">"}</Pagination.Next>
                  {/* <Pagination.Last>{">>"}</Pagination.Last> */}
                </Pagination>
              </ListGroup.Item>
              {listgroup}
              <ListGroup.Item as="h5">See More</ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Offcanvas show={show} onHide={handleClose} placement={"end"} style={{width:"1000px"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title as="h3">Statements</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Statements statements={statement}/>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas show={showEdit} onHide={handleCloseEdit} placement={"end"} style={{width:"1000px"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title as="h3">Edit Information</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>


          <EditInformationScreen userInfo={userInfo} refresh={refresh}/>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
