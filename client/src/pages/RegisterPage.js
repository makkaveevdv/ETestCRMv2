import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Toast } from 'react-bootstrap';

export const RegisterPage = () => {

    const [show, setShow] = useState(false);


    const history = useHistory();
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [allPersons, setAllPersons] = useState(false);
    let [form, setForm] = useState({
        email: null,
        fname: null,
        mname: null,
        lname: null,
        password: null,
        managerid: null
    });

    const fetchAllPersons = useCallback(async () => {
        try {
            const fetched = await request(`/api/auth/register`, 'GET', null,
                {
                    Authorization: `${auth.token}`
                });

            setAllPersons(fetched);
        } catch (e) { };
    }, [auth.token, request]); 

    useEffect(() => {
        fetchAllPersons();
    }, [fetchAllPersons]);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const createHandler = async () => {
        try {
            //console.log(form);
            const data = await request('/api/auth/register', 'POST', { ...form }, {
                Authorization: `${auth.token}`
            });
            history.push('/');

        } catch (e) { setShow(true); };
    };


    return (
        <div>
            <>
                <div className="container">
                    <div aria-live="polite" aria-atomic="true" style={{ position: 'relative' }} >
                        <Toast onClose={() => { setShow(false); }} show={show} delay={3000} autohide style={{ position: 'absolute', top: 0, right: 0 }} >
                            <Toast.Header>
                                <strong className="mr-auto">Сообщение</strong>
                            </Toast.Header>
                            <Toast.Body>Пожалуйста, заполните корректно все поля</Toast.Body>
                        </Toast>
                    </div>
                </div>
            </>


            <div>
                <div>
                    <h1>Регистрация нового пользователя:</h1>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputFname" className="form-label">Имя:</label>
                    <input type="text" name="fname" className="form-control" id="inputFname" value={form.fname} onChange={changeHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputMname" className="form-label">Отчество:</label>
                    <input type="text" className="form-control" name="mname" id="inputMname" rows="3" value={form.mname} onChange={changeHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputLname" className="form-label">Фамилия:</label>
                    <input type="text" name="lname" className="form-control" id="inputLname" value={form.lname} onChange={changeHandler} />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">E-mail:</label>
                    <input type="email" name="email" className="form-control" id="inputEmail" value={form.email} onChange={changeHandler} />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Пароль:</label>
                    <input type="password" name="password" className="form-control" id="inputPassword" value={form.password} onChange={changeHandler} />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputManagerid" className="form-label">Менеджер:&nbsp;</label>
                    <select className="form-select" name="managerid" htmlFor="inputManagerid" aria-label="Default select example" value={form.managerid} onChange={changeHandler}>
                        <option value={null} >Не назначен</option>
                        {allPersons && allPersons.map(person => (
                            <option key={person.id} value={person.id} >{person.fname + ' ' + person.mname + ' ' + person.lname}</option>
                        ))}

                    </select>
                </div>

                <button className="btn btn-primary" onClick={createHandler} > Создать пользователя </button>
            </div>
        </div>
    );
};