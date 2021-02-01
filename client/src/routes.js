import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { ManagerPage } from './pages/ManagerPage';
import { ManagerPageForPerson } from './pages/ManagerPageForPerson';
import { MyPage } from './pages/MyPage';
import { TaskCreatePage } from './pages/TaskCreatePage';
import { TaskUpdatePage } from './pages/TaskUpdatePage';
import { RegisterPage } from './pages/RegisterPage';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/api/task/create" exact>
                    <TaskCreatePage />
                </Route>                
                <Route path="/api/task/:id">
                    <TaskUpdatePage />
                </Route>               
                <Route path="/api/myPage/" >
                    <MyPage />
                </Route>
                <Route path="/api/managerPage" exact>
                    <ManagerPage />
                </Route>
                <Route path="/api/managerPage/:id">
                    <ManagerPageForPerson />
                </Route>
                <Route path="/api/auth/register" exact>
                    <RegisterPage />
                </Route>
                <Redirect to="/api/myPage" />
            </Switch>
        );
    };

    return (
        <Switch>
            <Route path="/api/auth" exact>
                <AuthPage />
            </Route>
            <Redirect to="/api/auth" />
        </Switch>
    );
};