import { Route, Link, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import AppPageComponent from './page/AppPage/AppPageComponent';
import LoginComponent from './page/LoginPage/Login/LoginConponent'
import './App.css'
import { useEffect, useCallback } from 'react';
function App() {
  let { path, url } = useRouteMatch();
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/App/Flow/FlowChart'), [history]);

  useEffect(()=>{    
    if(path === "/") handleOnClick();
  }, [path])
  return (
    <div className="App">      
      <Switch>
        <Route path="/App" component={AppPageComponent}/>
        <Route path={["/Login"]} component={LoginComponent} exact/> 
      </Switch>
    </div>
  );
}

export default App;
