import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { TasksList } from '../components/TasksList';


export const ManagerPageForPerson = () => {

    const auth = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [tasks, setTasks] = useState(null);
    const personId = useParams().id;

    const fetchTasks = useCallback(async () => {
        try {
            const fetched = await request(`/api/managerPage/${personId}`, 'GET', null,
                {
                    Authorization: `${auth.token}`
                });

            setTasks(fetched);
        } catch (e) { };
    }, [auth.token, personId, request]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    if (loading) {
        return <Loader />
    };

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className=""><h1>Страница менеджера</h1></div>
                <div className=""><Link to="/api/task/create" className="btn btn-outline-success" >Создать задачу</Link></div>
            </div>
            <>
                {!loading && <TasksList tasks={tasks} />}
            </>
        </div>
    );
};