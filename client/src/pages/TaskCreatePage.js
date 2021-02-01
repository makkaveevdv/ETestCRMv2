import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Toast } from 'react-bootstrap';


export const TaskCreatePage = () => {

    const [show, setShow] = useState(false);


    const history = useHistory();
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    let [form, setForm] = useState({
        name: '',
        description: '',
        enddate: '',
        priority: '',
        status: '',
        resppersonid: ''
    });


    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const createHandler = async () => {
        try {
            
                const data = await request('/api/task/create', 'POST', { ...form }, {
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
                    <h1>Создать новую задачу</h1>
                </div>
              <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Заголовок:</label>
                    <input type="text" name="name" className="form-control" id="inputName" value={form.name} onChange={changeHandler} />
              </div>
              <div className="mb-3">
                    <label htmlFor="inputDesc" className="form-label">Описание:</label>
                    <textarea className="form-control" name="description" id="inputDesc" rows="3" value={form.description} onChange={changeHandler}></textarea>
              </div>
                <div className="mb-3">
                    <label htmlFor="inputEndDate" className="form-label">Дата окончания:</label>
                    <input type="date" name="enddate" className="form-control" id="inputEndDate" value={form.enddate} onChange={changeHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPriority" className="form-label">Приоритет:</label>
                    <select className="form-select" name="priority" htmlFor="inputPriority" aria-label="Default select example" value={form.priority} onChange={changeHandler}>
                        <option>Укажите приоритет задачи...</option>
                        <option value="Высокий">Высокий</option>
                        <option value="Средний">Средний</option>
                        <option value="Низкий">Низкий</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputStatus" className="form-label">Статус:</label>
                    <select className="form-select" name="status" htmlFor="inputStatus" aria-label="Default select example" value={form.status} onChange={changeHandler}>
                        <option>Укажите статус задачи...</option>
                        <option value="К выполнению">К выполнению</option>
                        <option value="Выполняется">Выполняется</option>
                        <option value="Выполнена">Выполнена</option>
                        <option value="Отменена">Отменена</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputRespPerson" className="form-label">Ответственный: </label>
                    <select className="form-select" name="resppersonid" htmlFor="inputRespPerson" aria-label="Default select example" value={form.resppersonid} onChange={changeHandler}>
                        <option>Выберите ответственного...</option>
                        <option key={auth.personId} value={auth.personId} >{auth.userProfile.fname + ' ' + auth.userProfile.mname + ' ' + auth.userProfile.lname}</option>
                        {auth.respPersonsList && auth.respPersonsList.map(respPerson => (
                            <option key={respPerson.id} value={respPerson.id} >{respPerson.fname + ' ' + respPerson.mname + ' ' + respPerson.lname}</option>
                           ))}

                      </select>
                </div>
              
                <button className="btn btn-primary" onClick={createHandler} > Создать задачу </button>
        </div>
        </div>
    );
};