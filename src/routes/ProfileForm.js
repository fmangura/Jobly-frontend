import React, {useContext, useEffect, useState} from 'react';
import JoblyApi from '../api';
import { AuthContext } from '../context';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap'

function Profile() {
    const {currUser} = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState({})
    const initialState = {
        username: '',
        firstName: '',
        lastName: '',
        email: ''
    };

    useEffect(() => {
        async function getCurrUser() {
            setUserProfile(await JoblyApi.getCurrUser(currUser))
        };
        getCurrUser();
    },[])

    const [formData, setFormData] = useState(initialState);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(formData => ({...formData, [name]:value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await JoblyApi.updateUser(currUser, formData);
        console.log(res);
        setFormData(initialState);
    }

    return(
    <div className='contentBody'>
        <h1>Edit Profile</h1>
        <div className='card'>
            <div className='card-body'>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for='username'>Username</Label>
                    <Input type='text' name='username' id='username' onChange={handleChange} autoComplete='false' disabled={true} placeholder={userProfile.username}/>
                </FormGroup>
                <FormGroup>
                    <Label for='firstName'>First Name</Label>
                    <Input type='text' name='firstName' id='firstName' onChange={handleChange} autoComplete='false' placeholder={userProfile.firstName}/>
                </FormGroup>
                <FormGroup>
                    <Label for='lastName'>Last Name</Label>
                    <Input type='text' name='lastName' id='lastName' onChange={handleChange} autoComplete='false' placeholder={userProfile.lastName}/>
                </FormGroup>
                <FormGroup>
                    <Label for='email'>Email</Label>
                    <Input type='email' name='email' id='email' onChange={handleChange} autoComplete='false' placeholder={userProfile.email}/>
                </FormGroup>
                <Button color='primary'>Edit</Button>
            </Form>
            </div>
        </div>
    </div>
    );
}

export default Profile;