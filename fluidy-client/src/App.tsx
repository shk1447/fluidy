import { Route, Link, Switch, useRouteMatch } from 'react-router-dom';
import AppPageComponent from './page/AppPage/AppPageComponent';
import LoginComponent from './page/LoginPage/Login/LoginConponent'
function App() {
  let { path, url } = useRouteMatch();
    console.log(path);
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
