import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Books from './pages/Books';
import Login from './pages/Login';
import AchievementInfo from './components/AchievementInfo';
import SidebarActionButtons from './components/SidebarActionButtons';
import { AuthProvider } from './Auth';

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
