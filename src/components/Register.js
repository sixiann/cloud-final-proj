import { SetMealSharp } from '@mui/icons-material';
import React, {useState} from 'react';
import axios from 'axios';

const registerUrl = 'https://i0npk9dvld.execute-api.us-east-1.amazonaws.com/dev/register';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [msg, setMsg] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        
        if ( name.trim() === '' || email.trim() === '' || username.trim() === '' || password.trim() === '' ) {
            setMsg('all fields are required');
            return;
        }
        setMsg(null);

        const requestConfig = {
            headers: {
                'x-api-key': 'OdBbQrFaS19e60N4ngBX9aDvh3rbQqIl3cwMY3dN'
            }
        }
        const requestBody = {
            username: username,
            email: email,
            name: name,
            password: password
        }

        axios.post(registerUrl, requestBody, requestConfig).then(response => {
            setMsg('Registration Successful');
        }).catch(error => {
            if (error.response.status == 401 || error.response.status === 403) {
                setMsg(error.response.data.message);
            } else {
                setMsg('sorry, backend server down - please try again later')
            }
        })

        console.log('submit the registration');
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h5>Register</h5>
                name: <input type='text' value={name} onChange={event => setName(event.target.value)} /><br/>
                email: <input type='text' value={email} onChange={event => setEmail(event.target.value)} /><br/>
                username: <input type='text' value={username} onChange={event => setUsername(event.target.value)} /><br/>
                password: <input type='password' value={password} onChange={event => setPassword(event.target.value)} /><br/>
                <input type="submit" value="Register" />
            </form>
            {msg && <p className='message'>{msg}</p>}
        </div>
    )
}

export default Register;