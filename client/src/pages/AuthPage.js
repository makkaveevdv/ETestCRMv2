import React, { useContext, useState, useEffect } from 'react';  
import { AuthContext } from '../context/AuthContext';
import '../css/signin.css';
import { useHttp } from '../hooks/http.hook';
import { Toast } from 'react-bootstrap';


export const AuthPage = () => {
    const [show, setShow] = useState(false);

    const auth = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState(null);

    const { loading, request, error, clearError } = useHttp(); 


    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };


    useEffect(() => {
        if (error != null) {
            setErrorMsg(error);
            setShow(true);
        };
    }, [error, clearError]);

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form });

            auth.login(data.token, data.personId, data.userProfile, data.respPersonsList);
        } catch (e) { };
    };

    return (
        <div>
            <>
                <div className="container">
                    <div aria-live="polite" aria-atomic="true" style={{ position: 'relative', minHeight: '100px', }} >
                        <Toast onClose={() => { setShow(false); clearError();}} show={show} delay={3000} autohide style={{ position: 'absolute', top: 0, right: 0 }} >
                            <Toast.Header>
                                <strong className="mr-auto">Сообщение</strong>
                            </Toast.Header>
                            <Toast.Body>{errorMsg}</Toast.Body>
                        </Toast>
                    </div>
                </div>
            </>           
            <div id="alter-body" className="text-center">
            <main className="form-signin">
                <form>
                    <h1 className="h2 mb-1 fw-normal">ETestCRM</h1>
                        <h4 className="h4 mb-2 fw-normal">Авторизация</h4>

                    <label htmlFor="inputEmail" className="visually-hidden"></label>
                    <input
                        type="email"
                        id="inputEmail"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={form.email}
                        onChange={changeHandler}
                        required />

                    <label htmlFor="inputPassword" className="visually-hidden"></label>
                    <input
                        type="password"
                        id="inputPassword"
                        name="password"
                        className="form-control"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={changeHandler}
                        required /> 
                        
                    <button
                        className="w-100 btn btn-lg btn-primary"
                        type="submit"
                        onClick={loginHandler}
                        disabled={loading}
                    >
                        Войти
                        </button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
                </form>
            </main>

            </div>
        </div>
    );
};