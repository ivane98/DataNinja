import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../src/auth/authSlice";

let formStyles = {
  width: "auto",
  height: "100vh",
  marginTop: "200px",
};

let containerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (isError) {
      console.log("error");
    }

    if (user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (username === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }

    const userData = {
      username,
      password,
    };

    dispatch(login(userData));

    console.log("submit");
  };

  return (
    <div className="container" style={containerStyles}>
      <form style={formStyles} autoComplete="off" onSubmit={handleSubmit}>
        <h2>Login Form</h2>
        <TextField
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
          variant="outlined"
          color="success"
          type="text"
          sx={{ mb: 3 }}
          fullWidth
          value={username}
          error={userError}
        />
        <TextField
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          color="success"
          type="password"
          value={password}
          error={passwordError}
          fullWidth
          sx={{ mb: 3 }}
        />
        <Button variant="outlined" color="success" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
