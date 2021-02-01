import { useState, useCallback, useEffect } from 'react';
const storageName = 'userData';


export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [personId, setPersonId] = useState(null);
    const [ready, setReady] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [respPersonsList, setRespPersonsList] = useState(null);
    

    const login = useCallback((jwtToken, id, usrPrf, list ) => {
        setToken(jwtToken);
        setPersonId(id);
        setUserProfile(usrPrf);
        setRespPersonsList(list);
        
        localStorage.setItem(storageName, JSON.stringify({ personId: id, token: jwtToken, userProfile: usrPrf, respPersonsList: list }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setPersonId(null);
        setRespPersonsList(null);
        setUserProfile(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            login(data.token, data.personId, data.userProfile, data.respPersonsList);
        };
        setReady(true);
    }, [login]);

    return { login, logout, token, personId, respPersonsList, ready, userProfile };

};