import React from 'react';
import { Link } from 'react-router-dom';

export const TasksList = ({ tasks }) => {

    if (!tasks) {
        return ( <p className="text-center">Список задач пуст.</p> )
    };
    //const [controlDate, setControlDate] = useState(null);

    const setColor = (controlParam, controlStatus) => {
        let getInt = controlParam.split(' ');
        getInt = parseInt(getInt[0], 10);
        if (controlStatus == 'Выполнена' || controlStatus == 'Отменена') {
            return 'bg-success text-white';
        } else if (getInt < 0) {
            return 'bg-danger text-white';
        } else {
            return 'bg-secondary text-white';
        };    
    };

    return (
        <div>
        <table className="table">
            <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Заголовок</th>
                    <th scope="col">Приоритет</th>
                    <th scope="col">Дата окончания</th>
                    <th scope="col">Ответственный</th>
                    <th scope="col">Статус</th>
                    <th scope="col">Действия</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) => {
                    return (
                        <tr key={index} className={setColor(task.controlenddate, task.status)}>
                        <td scope="row">{task.id}</td>
                        <td>{task.name}</td>
                        <td>{task.priority}</td>
                            <td>{task.enddate}</td>
                            <td>{'(' + task.rp_id + ') ' + task.rp_fn + ' ' + (task.rp_mn != null ? task.rp_mn : '') + ' ' + task.rp_ln}</td>
                        <td>{task.status}</td>
                        <td>
                                <Link to={`/api/task/${task.id}`} className="btn btn-primary">Редактировать</Link>
                                
                            </td>
                        </tr>
                        )
                })
                }

            </tbody >
        </table >
        </div>
        );
};