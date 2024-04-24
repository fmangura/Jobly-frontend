import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import JoblyApi from '../api';
import { AuthContext } from '../context';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap'
import { div } from 'prelude-ls';

function Login() {
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const initialState = {
        username: '',
        password: ''
    };
    const [formData, setFormData] = useState(initialState);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(formData => ({...formData, [name]:value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await JoblyApi.Login(formData);
        setFormData(initialState);
        login();
        navigate('/');
    }

    return(
        <div className='contentBody'>
        <div className='card'>
            <div className='card-body'>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for='username'>Username</Label>
                        <Input type='text' name='username' id='username' onChange={handleChange} autoComplete='false' value={formData.username}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input type='password' name='password' id='password' onChange={handleChange} autoComplete='false' value={formData.password}/>
                    </FormGroup>
                    <Button color='primary'>Login</Button>
                </Form>
            </div>
        </div>
        </div>
    );
}

export default Login;