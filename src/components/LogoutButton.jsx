import React from 'react';
import { useHistory } from 'react-router-dom';
import Logout from '../services/LogoutService';

const LogoutButton = ({ onLogout }) => {

    const history = useHistory();

    const handleLogout = async () => {
        try {
            await Logout.logout();
            onLogout();
            history.push('/login');
        } catch (error) {
            console.error('Çıkış yaparken bir hata oluştu:', error);
        }
    };

    return (
        <button onClick={handleLogout} className="btn btn-outline-light" style={{ marginLeft: '10px' }}>
            Çıkış Yap
        </button>
    );
};

export default LogoutButton;
