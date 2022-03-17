import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Books from './pages/Books';
import Authors from './pages/Authors'
import Assignments from './pages/Assignments'
import Login from './pages/Login';
import AchievementInfo from './components/AchievementInfo';
import SidebarActionButtons from './components/SidebarActionButtons';
import { AuthProvider } from './Auth';
import { FirebaseContentProvider } from './FirebaseContent';
import * as AlgoliaSearch from './AlgoliaSearchContext';

function App() {
  return (
    <AuthProvider>
      <FirebaseContentProvider>
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
              <Route path="/authors" component={Authors} />
              <Route path="/assignments" component={Assignments} />
            </Switch>
          </div>
        </Router>
      </FirebaseContentProvider>
    </AuthProvider>
  );
}

export default App;
