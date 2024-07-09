import React from 'react';
import { useHistory } from 'react-router-dom';

const LoginButton = () => {

    const history = useHistory();

    const handleLogin = () => {
        history.push('/login');
    };

    return (
        <button onClick={handleLogin} className="btn btn-outline-light" style={{ marginLeft: '10px' }}>
            Login
        </button>
    );
}

export default LoginButton;