import './App.css';
import * as React from 'react';
import SignIn from './components/SignIn';
import Dashboard from './components/dashboard/Dashboard'
import Home from './components/home/Home'
import Industries from './components/industries/Industries'
import Companies from './components/companies/Companies'
import Investors from './components/investors/Investors'

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  return (
    <div className="App">
      {/* <SignIn/> */}
      {/* <Home/> */}
      {/* <Dashboard /> */}
      {/* {isLoggedIn?<Home/>:<Dashboard />} */}
      {/* <Industries/> */}
      {/* <Companies/> */}
      <Investors/>
    </div>
  );
}

export default App;
