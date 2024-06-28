import React from 'react';
import { useHistory } from 'react-router-dom';

const UsersButton = () => {

    const history = useHistory();

    const handleUsers = () => {
        history.push('/users');
    };

    return (
        <button onClick={handleUsers} className="btn btn-outline-light" style={{ marginLeft: '10px' }}>
            Users
        </button>
    );
};

export default UsersButton;
