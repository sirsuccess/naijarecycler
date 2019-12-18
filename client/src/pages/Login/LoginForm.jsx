import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

export default function LoginForm(props) {
  let history = useHistory();
  const initialDetails = {
    username: "",
    password: ""
  };
  const [userDetails, setuserDetails] = useState(initialDetails);
  const [response, setResponse] = useState("");

  const handleChange = e => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setuserDetails({ ...userDetails, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const url = "http://localhost:5000/users/login";
    Axios.post(url, userDetails)
      .then(function(response) {
        alert("login successfully");
        // if (response.data.isAdmin) {
        history.push({
          pathname: "/dashboard",
          search: "?query=abc",
          state: { detail: response.data }
        });
        // }else{
        //   history.push({
        //     pathname: "/",
        //     search: "?query=abc",
        //     state: { detail: response.data }
        //   });
        // }
      })
      .catch(function(error) {
        console.log(error);
        history.push({
          pathname: "/login",
        });
      });
  }

  return (
    <div style={{ margin: "0 auto" }}>
      <div style={{ marginTop: "20px" }}>
        <h3>Login</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="username">Username:</Label>
          <Input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            class="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="current-password"
            onChange={handleChange}
          />
        </div>

        <div>
          <Button type="submit">Login</Button>
          <Link to="/signup">
            <button className="text-success btn" type="button">
              Create Account
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

const Label = styled.label`
  font-weight: bold;
  font-size: 12px;
`;

const Input = styled.input`
  border: none;
  background-color: #fff;
  display: block;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  height: 35px;
  padding: 4px;
  padding-left: 6px;

  @media screen and (max-width: 750px) {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
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
