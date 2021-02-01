import React from 'react';
import { Link } from 'react-router-dom';

export const Profile = ({ usrProfile, rpList }) => {
    const user = usrProfile;
    const list = rpList;



    return (
        
        <div className="card bg-light">
            <div className="card-body text-center">
                <h5 className="card-title">Мой профиль:</h5>
                <h4 className="card-text"><strong>{user.fname + ' ' + (user.mname != null ? user.mname : '') + ' ' + user.lname}</strong></h4>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item bg-light"><strong>E-mail: </strong>{user.email}</li>
                <li className="list-group-item bg-light"><strong>Менеджер: </strong>{user.managerid != null ? <span>{user.man_f + ' ' + (user.man_m != null ? user.man_m : '') + ' ' + user.man_l}</span> : "Не назначен"}</li>
            </ul>
            <div className="card-body text-center pb-0">
                <h5 className="card-title">Моя команда:</h5>
            </div>
            {list ?
                (<span><ul className="list-group list-group-flush">
                    {list && list.map(rp => (
                        <li className="list-group-item bg-light " key={rp.id}>
                            <Link to={`/api/managerPage/${rp.id}`} className="text-dark" >{rp.fname + ' ' + (rp.mname != null ? rp.mname : '') + ' ' + rp.lname}</Link>
                        </li>
                    ))}

                </ul>
                </span>)
                : (<li className="list-group-item bg-light" key={1}><center>Команда отсутствует</center></li>)}
            
            </div>
    );
};