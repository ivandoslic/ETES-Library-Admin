import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Books from './pages/Books';
import AchievementInfo from './components/AchievementInfo';
import SidebarActionButtons from './components/SidebarActionButtons';

function App() {
  return (
    <Router className="router">
      <div className="sidebar">
        <Navbar />
        <AchievementInfo />
        <SidebarActionButtons />
      </div>
      <div className="dashboard">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/books" component={Books} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
