import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import { Alert } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

export default function CreateForm() {
  let history = useHistory();
  const initialDetails = {
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    username: "",
    email: "",
    confirmPass: "",
    password: "",
    isAdmin: false
  };
  const [userDetails, setuserDetails] = useState(initialDetails);
  const [responseAlert, setResponseAlert] = useState("");

  const handleChange = e => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setuserDetails({ ...userDetails, [name]: value });
  };

  function handleSubmit(e) {
    console.log(JSON.stringify(userDetails));

    e.preventDefault();
    const url = "http://localhost:5000/users/api";
    Axios.post(url, JSON.stringify(userDetails), {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        alert("you have successfully registered");
        history.push({
          pathname: "/login",
          search: "?query=abc",
          state: { detail: response.data }
        });
      })
      .catch(function(error) {
        setResponseAlert("Oop something when wrong try again");
      });
  }
  const ComparePass = () => {
    console.log("i just blue");
    if (userDetails.password !== userDetails.confirmPass) {
      return setResponseAlert("confirm password does not match password");
    }
    return setResponseAlert("");
  };

  return (
    <>
      <div>
        {responseAlert ? <Alert color="warning">{responseAlert}</Alert> : null}
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Create Profile</h3>
      </div>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="row">
          <div className="col-lg-6">
            <Label htmlFor="firstName">First Name:</Label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              required
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Label htmlFor="lastName">Last Name:</Label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <Label htmlFor="phone">Phone Number:</Label>
            <input
              type="text"
              className="form-control"
              name="phone"
              required
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Label htmlFor="address">Address:</Label>
            <input
              type="text"
              className="form-control"
              name="address"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <Label htmlFor="city">City:</Label>
            <input
              type="text"
              className="form-control"
              name="city"
              required
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Label htmlFor="State">State:</Label>
            <br />
            <select
              name="state"
              className="form-control"
              required
              id="state"
              onChange={handleChange}
            >
              <option value="null">State</option>
              <option value="ABUJA FCT">ABUJA FCT</option>
              <option value="ABIA">ABIA</option>
              <option value="">ADAMAWA</option>
              <option value="ADAMAWA">AKWA IBOM</option>
              <option value="">ANAMBRA</option>
              <option value="ANAMBRA">BAUCHI</option>
              <option value="BAYELSA">BAYELSA</option>
              <option value="BENUE">BENUE</option>
              <option value="BORNO">BORNO</option>
              <option value="CROSS RIVER">CROSS RIVER</option>
              <option value="DELTA">DELTA</option>
              <option value="EBONYI">EBONYI</option>
              <option value="EDO">EDO</option>
              <option value="EKITI">EKITI</option>
              <option value="ENUGU">ENUGU</option>
              <option value="GOMBE">GOMBE</option>
              <option value="IMO">IMO</option>
              <option value="JIGAWA">JIGAWA</option>
              <option value="KADUNA">KADUNA</option>
              <option value="KANO">KANO</option>
              <option value="KATSINA">KATSINA</option>
              <option value="KEBBI">KEBBI</option>
              <option value="KOGI">KOGI</option>
              <option value="KWARA">KWARA</option>
              <option value="">LAGOS</option>
              <option value="LAGOS">NASSARAWA</option>
              <option value="NIGER">NIGER</option>
              <option value="OGUN">OGUN</option>
              <option value="ONDO">ONDO</option>
              <option value="OSUN">OSUN</option>
              <option value="OYO">OYO</option>
              <option value="PLATEAU">PLATEAU</option>
              <option value="RIVERS">RIVERS</option>
              <option value="SOKOTO">SOKOTO</option>
              <option value="TARABA">TARABA</option>
              <option value="YOBE">YOBE</option>
              <option value="ZAMFARA">ZAMFARA</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <Label htmlFor="password">Password:</Label>
            <input
              type="password"
              className="form-control"
              name="password"
              required
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Label htmlFor="confirmPass">Confirm Password:</Label>
            <input
              type="password"
              className="form-control"
              name="confirmPass"
              required
              onChange={handleChange}
              onBlur={ComparePass}
            />
          </div>
        </div>

        <div className="col-lg-12">
          <Label htmlFor="username">Username:</Label>
          <input
            type="text"
            className="form-control"
            name="username"
            required
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-12 mb-5">
          <Label htmlFor="email">Email:</Label>
          <input
            type="email"
            name="email"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <Button type="submit">Join Now</Button>
          <Link to="/login">
            <button className="text-success btn" type="button">
              Login
            </button>
          </Link>
        </div>
      </form>
    </>
  );
}

const Label = styled.label`
  font-weight: bold;
  font-size: 12px;
`;

const Button = styled.button`
  border: none;
  background: #34a853 0% 0% no-repeat padding-box;
  border-radius: 14px;
  color: #fff;
  width: 125px;
  height: 34px;
  font-size: 12px;
  font-weight: bold;
`;
