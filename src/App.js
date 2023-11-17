import './App.css';
import * as React from 'react';
import SignIn from './components/SignIn';
import Dashboard from './components/dashboard/Dashboard'
import Home from './components/home/Home'

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return (
    <div className="App">
      {/* <SignIn/> */}
      {/* <Dashboard /> */}
      {isLoggedIn?<Home/>:<Dashboard />}
    </div>
  );
}

export default App;
