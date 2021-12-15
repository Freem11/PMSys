import { useReducer, useEffect } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import "./loginPage.scss";
import axios from 'axios';

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
        error: "The login credentials you supplied do not match any in the system",
        email: "",
        password: "",
        isLoggedIn: false,
      };
    }
    case "logout": {
      return {
        ...state,
        isLoggedIn: false,
        email: "",
        password: "",
      };
    }
    default: break;
  }
  return state;
}

const initialState = {
  email: "",
  password: "",
  error: "",
  isLoggedIn: false,
};


function login ({email, password}) {

    console.log("passing", email, password)

    return axios.post("http://localhost:5000/users", { email : email, pass : password })
    .then(response => {
        if (response.data[0]){
            return true
        }
    })
    .catch(err => {
        return err;
    });
}

const LoginPage = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const {email, password, isLoggedIn, error} = state;

  const onSubmitLogin = async (e) => {
    e.preventDefault();

    if (login({ email, password }))

    dispatch({ type: "login" });

    try {
      let log = await login({ email, password });

      if (log === undefined) {
        dispatch({ type: "error" });
      }
      dispatch({ Type: "success" });
        
    } catch (error) {
      dispatch({ Type: "error" });
    }
    console.log(state)
  };


  const registryForm = (
    <Form className="login-box">
      <h2 className="subHead">New? Register Here</h2>
      <FormGroup>
        <Input placeholder="Email" className="inpt" />
      </FormGroup>
      <FormGroup>
        <Input placeholder="Password" className="inpt" />
      </FormGroup>
      <Button className="regButton">Register</Button>
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
      <Button className="regButton" type="submit" onClick={onSubmitLogin}>
        Login
      </Button>
      {error && <p className="error">{error}</p>}
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
