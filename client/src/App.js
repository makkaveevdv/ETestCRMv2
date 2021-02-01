import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import 'jquery';
import 'popper.js';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';
import { Profile } from './components/Profile';

function App() {
    const { token, login, logout, personId, respPersonsList, ready, userProfile } = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if (!ready) { return < Loader /> };
    return (
        <AuthContext.Provider value={{ token, login, logout, personId, respPersonsList, userProfile}}> 
            <Router>
                {isAuthenticated && <Navbar />}
                <div className="container-fluid">
                    <div className="row justify-content-md-center">
                        {userProfile &&
                            (
                            <div className="col-md-2">
                                <Profile usrProfile={userProfile} rpList={respPersonsList}/>
                            </div>
                            )
                        }
                        

                        <div className="col-md-8">
                            {routes}
                        </div>
                    </div>
                </div>
            </Router>
        </AuthContext.Provider>
  );
}

export default App;
