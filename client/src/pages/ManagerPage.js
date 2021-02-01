import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';
import { TasksList } from '../components/TasksList';
import queryString from 'query-string';


export const ManagerPage = () => {

    const auth = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [tasks, setTasks] = useState(null);

    const query = queryString.parse(window.location.search);
    const datefilter = query.datefilter;
    const limit = query.limit;
    const offset = query.offset;

    const fetchTasks = useCallback(async () => {
        try {
            const fetched = await request(`/api/managerPage/`, 'POST',
                {
                    datefilter: datefilter,
                    limit: limit,
                    offset: offset
                },
                {
                    Authorization: `${auth.token}`
                });

            setTasks(fetched);
        } catch (e) { };
    }, [auth.token, request]);

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