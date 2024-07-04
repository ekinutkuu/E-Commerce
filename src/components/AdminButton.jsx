import React from 'react';
import { useHistory } from 'react-router-dom';

const AdminButton = () => {

    const history = useHistory();

    const handleAdmin = () => {
        history.push('/admin');
    };

    return (
        <button onClick={handleAdmin} className="btn btn-outline-light" style={{ marginLeft: '10px' }}>
            Admin Panel
        </button>
    );
};

export default AdminButton;
