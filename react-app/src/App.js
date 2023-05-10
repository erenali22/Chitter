import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ChatterList from './components/Chatter/ChatterList';
import ChatterForm from './components/Chatter/ChatterForm';
import SingleChatterPage from './components/Chatter/SingleChatterPage';
import UserContext from './context/UserContext';

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then((userData) => {
      setUser(userData);
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/chatters" exact={true}>
            <ChatterList />
          </Route>
          <Route path="/chatters/new" exact={true}>
            <ChatterForm />
          </Route>
          <Route path="/chatters/:id" exact={true} component={SingleChatterPage} />
        </Switch>
      )}
    </UserContext.Provider>
  );
}

export default App;
