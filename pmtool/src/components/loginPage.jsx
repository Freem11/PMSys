import { useReducer, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input } from "reactstrap";
import "./loginPage.scss";
import axios from "axios";
import { UserContext } from "./userContext";
import Collapse from '@mui/material/Collapse';

function loginReducer(state, action) {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.field]: action.value,
        error: "",
      };
    }
    case "login": {
      return {
        ...state,
        error: "",
      };
    }
    case "success": {
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    case "error": {
      return {
        ...state,
        error:
          "The login credentials you supplied do not match any in the system",
        regName: "",
        email: "",
        password: "",
        isLoggedIn: false,
        regEmail: "",
        regPassword: "",
      };
    }
    case "error2": {
      return {
        ...state,
        error: "The login credentials you supplied are already in the system",
        regName: "",
        email: "",
        password: "",
        isLoggedIn: false,
        regEmail: "",
        regPassword: "",
      };
    }
    case "error3": {
      return {
        ...state,
        error: "Please supply both Email and Password",
        regName: "",
        email: "",
        password: "",
        isLoggedIn: false,
        regEmail: "",
        regPassword: "",
      };
    }
    case "logout": {
      return {
        ...state,
        isLoggedIn: false,
        name: "",
        email: "",
        password: "",
        regEmail: "",
        regPassword: "",
      };
    }
    default:
      break;
  }
  return state;
}

const initialState = {
  email: "",
  password: "",
  regName: "",
  regEmail: "",
  regPassword: "",
  error: "",
  isLoggedIn: false,
};

function login({ email, password }) {
  return axios
    .post("http://localhost:5000/session", { email: email, pass: password })
    .then((response) => {
      if (response.data[0]) {
        return response.data[0];
      }
    })
    .catch((err) => {
      return err;
    });
}

function checkEmail({ email }) {
  return axios
    .post("http://localhost:5000/sessions", { email })
    .then((response) => {
      if (response.data[0]) {
        return response.data[0];
      }
    })
    .catch((err) => {
      return err;
    });
}

function register({ regName, regEmail, regPassword }) {
  return axios
    .post("http://localhost:5000/register", {
      name: regName,
      email: regEmail,
      pass: regPassword,
    })
    .then((response) => {
      if (response.data[0]) {
        return response.data[0];
      }
    })
    .catch((err) => {
      return err;
    });
}

const LoginPage = () => {
  let navigate = useNavigate();
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { regName, regEmail, regPassword, email, password, error, error2 } = state;
  const { user, setUser } = useContext(UserContext);

  const [dispRegister, setDispRegister] = useState(false)
  const [dispLogin, setDispLogin] = useState(false)

  const handleRegisterDisp = () => {
    setDispRegister(prev => !prev)
    setDispLogin(false)
    dispatch({ type: "login" });
  }
  const handleLoginDisp = () => {
    setDispLogin(prev => !prev)
    setDispRegister(false)
    dispatch({ type: "login" });
  }

  const onSubmitLogin = async (e) => {
    e.preventDefault();

    dispatch({ type: "login" });

    if (!email || !password) {
      dispatch({ type: "error3" });
    } else {
      try {
        let log = await login({ email, password });

        if (log === undefined || log === Error) {
          dispatch({ type: "error" });
        } else {
          dispatch({ Type: "success" });
          setUser(JSON.stringify(log));
          window.sessionStorage.setItem("user", JSON.stringify(log))
          navigate("/projects");
        }
      } catch (error) {
        dispatch({ Type: "error" });
      }
    }
  };

  const onSubmitRegister = async (e) => {
    e.preventDefault();

    dispatch({ type: "login" });

    if (!regName || !regEmail || !regPassword) {
      dispatch({ type: "error3" });
    } else {
      try {
        let logs = await checkEmail({ email: regEmail });

        if (logs) {
          dispatch({ type: "error2" });
        } else {
          dispatch({ Type: "success" });
          let logoo = await register({ regName, regEmail, regPassword });
          setUser(JSON.stringify(logoo));
          window.sessionStorage.setItem("user", JSON.stringify(logoo))
          navigate("/projects");
        }
      } catch (error) {
        dispatch({ Type: "error" });
      }
    }
  };

  const registryForm = (
    <Form className="login-box">
      <h2 className="subHead">New? Register Here</h2>
      <FormGroup>
        <Input
          placeholder="Name"
          className="inpt"
          value={regName}
          onChange={(e) =>
            dispatch({
              type: "field",
              field: "regName",
              value: e.currentTarget.value,
            })
          }
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Email"
          className="inpt"
          value={regEmail}
          onChange={(e) =>
            dispatch({
              type: "field",
              field: "regEmail",
              value: e.currentTarget.value,
            })
          }
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Password"
          className="inpt"
          type="password"
          value={regPassword}
          onChange={(e) =>
            dispatch({
              type: "field",
              field: "regPassword",
              value: e.currentTarget.value,
            })
          }
        />
      </FormGroup>
      <Button className="regButton" type="submit" onClick={onSubmitRegister}>
        Register
      </Button>
    </Form>
  );

  const loginForm = (
    <Form className="login-box">
      <h2 className="subHead">Returning? Login Here</h2>
      <FormGroup>
        <Input
          placeholder="Email"
          className="inpt"
          value={email}
          onChange={(e) =>
            dispatch({
              type: "field",
              field: "email",
              value: e.currentTarget.value,
            })
          }
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Password"
          className="inpt"
          value={password}
          type="password"
          onChange={(e) =>
            dispatch({
              type: "field",
              field: "password",
              value: e.currentTarget.value,
            })
          }
        />
      </FormGroup>
      <Button className="regButton" type="submit" onClick={onSubmitLogin}>
        Login
      </Button>
    </Form>
  );

  return (
    <div className="maindiv">
      <h1 className="head">Welcome To PM World !</h1>
      <div className="bottom-box">
        <button type="button" className="btn2" onClick={handleLoginDisp}>Login</button>
        <button type="button" className="btn2" onClick={handleRegisterDisp}>Register</button>
      </div>
      <div className="box1">
        <Collapse in={dispRegister}>{registryForm}</Collapse>
        </div>
      <div className="box2">
      <Collapse in={dispLogin}>{loginForm}</Collapse>
      </div>
      {error && <p className="error">{error}</p>}
      {error2 && <p className="error">{error2}</p>} 
    </div>
  );
};

export default LoginPage;
