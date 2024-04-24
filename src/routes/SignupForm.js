import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import JoblyApi from '../api';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap'

function SignUp() {
    const navigate = useNavigate();
    const initialState = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    };
    const [formData, setFormData] = useState(initialState);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(formData => ({...formData, [name]:value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await JoblyApi.signUp(formData);
        setFormData(initialState);
        navigate('/login');
    }

    return(
        <div className='contentBody'>
            <div className='card'>
                <div className='card-body'>
                <Form className='form' onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for='username'>Username</Label>
                        <Input type='text' name='username' id='username' onChange={handleChange} autoComplete='false'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input type='password' name='password' id='password' onChange={handleChange} autoComplete='false'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='firstName'>First Name</Label>
                        <Input type='text' name='firstName' id='firstName' onChange={handleChange} autoComplete='false'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='lastName'>Last Name</Label>
                        <Input type='text' name='lastName' id='lastName' onChange={handleChange} autoComplete='false'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='email'>Email</Label>
                        <Input type='email' name='email' id='email' onChange={handleChange} autoComplete='false'/>
                    </FormGroup>
                    <Button color='primary'>Sign Up</Button>
                </Form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;