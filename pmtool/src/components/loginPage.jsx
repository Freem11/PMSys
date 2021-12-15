import { useReducer } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import "./loginPage.scss";
import axios from "axios";

function loginReducer(state, action) {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.field]: action.value,
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
        error:
          "The login credentials you supplied are already in the system",
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
  regEmail: "",
  regPassword: "",
  error: "",
  isLoggedIn: false,
};

function login({ email, password }) {

  return axios
    .post("http://localhost:5000/session", { email: email, pass: password })
    .then((response) => {
      console.log(response.data)
      if (response.data[0]) {
        return true;
      }
    })
    .catch((err) => {
      return err;
    });
}

function register({ regEmail, regPassword }) {
  
  return axios
    .post("http://localhost:5000/register", { email: regEmail, pass: regPassword })
    .then((response) => {
      if (response.data[0]) {
        return true;
      }
    })
    .catch((err) => {
      return err;
    });
}

const LoginPage = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { regEmail, regPassword, email, password, error, error2 } = state;

  const onSubmitLogin = async (e) => {
    e.preventDefault();

    dispatch({ type: "login" });

    try {
      let log = await register({ regEmail, regPassword });

      if (log === undefined) {
        dispatch({ type: "error" });
      }
      dispatch({ Type: "success" });
    } catch (error) {
      dispatch({ Type: "error" });
    }
  };

  const onSubmitRegister = async (e) => {
    e.preventDefault();

    dispatch({ type: "login" });

    try {
      let logs = await login({ email: regEmail, password: regPassword });

      if (logs === true) {
        dispatch({ type: "error2" });
      } else{
        dispatch({ Type: "success" });
        register({regEmail, regPassword})
      }
      
    } catch (error) {
      dispatch({ Type: "error" });
    }
  };

  const registryForm = (
    <Form className="login-box">
      <h2 className="subHead">New? Register Here</h2>
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
      <Button className="regButton" type="submit" onClick={onSubmitRegister}>Register</Button>
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
          onChange={(e) =>
            dispatch({
              type: "field",
              field: "password",
              value: e.currentTarget.value,
            })
          }
        />
      </FormGroup>
      <Button className="regButton" type="submit" onClick={onSubmitLogin}>Login</Button>
      {error && <p className="error">{error}</p>}
      {error2 && <p className="error">{error2}</p>}
    </Form>
  );

  return (
    <div className="maindiv">
      <h1 className="head">Welcome</h1>
      <div className="box1">{registryForm}</div>
      <div className="box2">{loginForm}</div>
    </div>
  );
};

export default LoginPage;
