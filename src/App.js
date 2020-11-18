import './App.css';
import Dashboard from "./components/Dashboard/Dashboard";
import AdminPanel from "./components/auth/AdminPanel";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} /> 
        <Route exact path="/admin" component={AdminPanel} />
      </Switch>
    </Router>
  );
}

export default App;
