import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ChatterList from './components/Chatter/ChatterList';
import ChatterForm from './components/Chatter/ChatterForm';
import ReplyList from './components/Reply/ReplyList';
import ReplyForm from './components/Reply/ReplyForm';
import ChatterShow from './components/Chatter/ChatterShow';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
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
          <Route path="/chatters/:chatterId" exact={true} component={(props) => <ReplyList {...props} />} />
          <Route path="/chatters/:chatterId/replies/new" exact={true}>
            {(props) => <ReplyForm {...props} />}
          </Route>
          <Route path="/chatters/:chatterId/replies/:replyId/edit" exact={true}>
            {(props) => <ReplyForm {...props} />}
          </Route>
          <Route exact path="/chatters/:id" component={ChatterShow} >
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
