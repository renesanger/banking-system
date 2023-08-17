import React from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function Statements(props) {
  const statementslist = props.statements.map((item) => (
    <tr key={item.sid}>
      <td>{item.date}</td>
      <td>{item.type}</td>
      <td>{item.size}</td>
      <td>
        <a href={`statements/open/${item.sid}`}>Open</a>{" "}
        <a href={`statements/save/${item.sid}`}>Save</a>
      </td>
    </tr>
  ));

  return (
    <div>
      <Card border="dark">
        <Card.Header as="h5" style={{ display: "flex" }}>
          <div style={{marginTop:"4px"}}>View: </div>
          <div style={{ marginLeft: "20px" }}>
            <DropdownButton
              id="dropdown-item-button"
              title="Select Year"
              size="sm"
              variant="outline-dark"
            >
              <Dropdown.Item as="button">
                All Available Statements
              </Dropdown.Item>
              <Dropdown.Item as="button">2022</Dropdown.Item>
              <Dropdown.Item as="button">2021</Dropdown.Item>
              <Dropdown.Item as="button">2020</Dropdown.Item>
            </DropdownButton>
          </div>
        </Card.Header>
        <Card.Body>
          <Table striped borderless responsive hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Size</th>
                <th>Open or Save</th>
              </tr>
            </thead>
            <tbody>{statementslist}</tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}
