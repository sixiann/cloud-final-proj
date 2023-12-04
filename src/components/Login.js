import React, { useState } from 'react';
import { setUserSession } from '../service/AuthService';
import axios from 'axios';
// import { useNavigate } from "react-router-dom";

const loginUrl = 'https://i0npk9dvld.execute-api.us-east-1.amazonaws.com/dev/login';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState(null);
    // const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            setErrorMsg('Both username and password are required');
            return;
        }
        setErrorMsg(null);

        const requestConfig = {
            headers: {
                'x-api-key': 'OdBbQrFaS19e60N4ngBX9aDvh3rbQqIl3cwMY3dN'
            }
        }
        const requestBody = {
            username: username,
            password: password
        }

        axios.post(loginUrl, requestBody, requestConfig).then(response => {
            setUserSession(response.data.user, response.data.token);
            // navigate("/dashboard");
            
        }).catch(error => {
            if (error.response.status == 401) {
                setErrorMsg(error.response.data.message);
            } else if (error.response.status === 403) {
                setErrorMsg(error.response.data.message);
                setErrorMsg('Wrong password');
            } else {
                setErrorMsg('sorry, backend server down - please try again later')
            }
        })

        console.log('password attempt');
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h5>Login</h5>
                username: <input type='text' value={username} onChange={event => setUsername(event.target.value)} /><br/>
                password: <input type='password' value={password} onChange={event => setPassword(event.target.value)} /><br/>
                <input type="submit" value="Login" />
            </form>
            {errorMsg && <p className='message'>{errorMsg}</p>}
        </div>
    )
}

export default Login;