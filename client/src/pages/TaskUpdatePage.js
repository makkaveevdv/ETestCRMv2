import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Toast } from 'react-bootstrap';


export const TaskUpdatePage = () => {

    const history = useHistory();

    const [show, setShow] = useState(false);

    const auth = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [task, setTask] = useState();
    const taskId = useParams().id;
    let [opts, setOpts] = useState(
        {
            title: 'Просмотр задачи',
            id: 'disabled',
            name: 'disabled',
            description: 'disabled',
            enddate: 'disabled',
            priority: 'disabled',
            status: 'disadled',
            resppersonid: 'disabled',
            deleteButton: 'none'
        }
    );

    const getTask = useCallback(async () => {
        try {
            const fetched = await request(`/api/task/${taskId}`, 'GET', null, {
                Authorization: `${auth.token}`
            });
            setTask(fetched);  
            if (fetched.resppersonid == auth.personId) {
                if (fetched.creatorid == auth.personId) {
                    setOpts({
                        title: 'Просмотр задачи',
                        id: 'disabled',
                        name: 'disabled',
                        description: null,
                        enddate: null,
                        priority: null,
                        status: null,
                        resppersonid: null,
                        deleteButton: 'block'
                    });
                } else {
                    setOpts(
                        {
                            title: 'Просмотр задачи',
                            id: 'disabled',
                            name: 'disabled',
                            description: 'disabled',
                            enddate: 'disabled',
                            priority: 'disabled',
                            status: null,
                            resppersonid: 'disabled',
                            deleteButton: 'none'
                        }
                    );
                };              
                } else {
                    setOpts({
                        title: 'Просмотр задачи',
                        id: 'disabled',
                        name: 'disabled',
                        description: null,
                        enddate: null,
                        priority: null,
                        status: null,
                        resppersonid: null,
                        deleteButton: 'block'
                    });
            };
        } catch (e) { };
    }, [auth.token, taskId, request, auth.personId]);

    useEffect(() => {
        getTask();
        
    }, [getTask]);

    if (loading) {
        return <Loader />
    };

    const changeHandler = event => {
        setTask({ ...task, [event.target.name]: event.target.value });
    };

    const updateHandler = async () => {
        try {
            
                await request(`/api/task/${taskId}`, 'PATCH', { ...task }, {
                    Authorization: `${auth.token}`
                });
                history.push('/');
            
        } catch (e) { setShow(true); };
    };


    const removeHandler = async () => {
        try {
            await request(`/api/task/${taskId}`, 'DELETE', null, {
                Authorization: `${auth.token}`
            });
            history.push('/');

        } catch (e) { };
    }

    return (
        <div>
            <>
                <div className="container">
                    <div aria-live="polite" aria-atomic="true" style={{ position: 'relative' }} >
                        <Toast onClose={() => { setShow(false); }} show={show} delay={3000} autohide style={{ position: 'absolute', top: 0, right: 0 }} >
                            <Toast.Header>
                                <strong className="mr-auto">Сообщение</strong>
                            </Toast.Header>
                            <Toast.Body>Пожалуйста, заполните корректно все доступные поля</Toast.Body>
                        </Toast>
                    </div>
                </div>
            </> 
            { !loading && task && (
                <div>
                    <h1>{opts.title}</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="inputid" className="form-label">Идентификатор:</label>
                            <input type="text" name="name" className="form-control" id="inputName" value={task.id} disabled={opts.id} onChange={changeHandler}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-label">Заголовок:</label>
                            <input type="text" name="name" className="form-control" id="inputName" value={task.name} disabled={opts.name} onChange={changeHandler}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputDesc" className="form-label">Описание:</label>
                            <textarea className="form-control" name="description" id="inputDesc" rows="3" value={task.description} disabled={opts.description} onChange={changeHandler}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEndDate" className="form-label">Дата окончания:</label>
                            <input type="date" name="enddate" className="form-control" id="inputEndDate" value={task.enddate} disabled={opts.enddate} onChange={changeHandler}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPriority" className="form-label">Приоритет:</label>
                            <select className="form-select" name="priority" htmlFor="inputPriority" aria-label="Default select example" value={task.priority} disabled={opts.priority} onChange={changeHandler}>
                                <option>Укажите приоритет задачи...</option>
                                <option value="Высокий">Высокий</option>
                                <option value="Средний">Средний</option>
                                <option value="Низкий">Низкий</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputStatus" className="form-label">Статус:</label>
                            <select className="form-select" name="status" htmlFor="inputStatus" aria-label="Default select example" value={task.status} disabled={opts.status} onChange={changeHandler}>
                                <option>Укажите статус задачи...</option>
                                <option value="К выполнению">К выполнению</option>
                                <option value="Выполняется">Выполняется</option>
                                <option value="Выполнена">Выполнена</option>
                                <option value="Отменена">Отменена</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputRespPerson" className="form-label">Ответственный:</label>

                            <select className="form-select" name="resppersonid" htmlFor="inputRespPerson" aria-label="Default select example" value={auth.personId == task.resppersonid ? auth.personId : task.resppersonid} disabled={opts.resppersonid} onChange={changeHandler}>

                                <option key={auth.personId} value={auth.personId} >{auth.userProfile.fname + ' ' + (auth.userProfile.mname != null ? auth.userProfile.mname : '') + ' ' + auth.userProfile.lname}</option>

                                {auth.respPersonsList && auth.respPersonsList.map(respPerson => (
                                    <option key={respPerson.id} value={respPerson.id} >{respPerson.fname + ' ' + (respPerson.mname != null ? respPerson.mname : '') + ' ' + respPerson.lname}</option>
                                ))}

                            </select>

                        </div>


                        <button type="submit" className="btn btn-outline-success" onClick={updateHandler}>Сохранить изменения</button>
                    </form>
                    <div className="d-flex justify-content-left mt-3">
                        <form className="mr-2" style={{ display: opts.deleteButton }}>
                        <button type="submit" className="btn btn-outline-danger" onClick={removeHandler}>Удалить задачу</button>
                        </form>

                        <Link to={'/'} className="btn btn-outline-primary" >Вернуться без сохранения</Link>
                    </div>
                </div>
                )}
        </div>
    );
};