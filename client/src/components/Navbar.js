import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    };

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">ETestCRM</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <NavLink to="/api/myPage" className="nav-link" aria-current="page">Моя страница</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/api/managerPage" className="nav-link">Страница менеджера</NavLink>
                        </li>   
                        <li className="nav-item">
                            <NavLink to="/api/auth/register" className="nav-link">Регистрация пользователя</NavLink>
                        </li> 
                    </ul>                  
                </div>
                <div className="d-flex">
                    <a className="btn btn-danger me-2" href="/" onClick={logoutHandler}>Выйти</a>
                </div>
                
             </div>
        </nav>
        );
};