
import { Button, Form, FormGroup, Input } from 'reactstrap';
import './loginPage.scss';

const LoginPage = () => {

    const registryForm = (
        <Form>
        <h2 className="subHead">New? Register Here</h2>
        <FormGroup>
            <Input placeholder ="Email Address" className="inpt"/> 
        </FormGroup>
        <FormGroup>
            <Input placeholder ="Password" className="inpt"/> 
        </FormGroup>
        <Button className="regButton">Register</Button>
    </Form>)

const loginForm = (
    <Form>
    <h2 className="subHead">Returning? Login Here</h2>
    <FormGroup>
        <Input placeholder ="Email Address" className="inpt"/> 
    </FormGroup>
    <FormGroup>
        <Input placeholder ="Password" className="inpt"/> 
    </FormGroup>
    <Button className="regButton">Login</Button>
</Form>)

    return(
        <div className="maindiv">
            <h1 className="head">Welcome</h1>
            <div className="box1">{registryForm}</div>
            <div className="box2">{loginForm}</div>
        </div>
        
    )
}

export default LoginPage;