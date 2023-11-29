import './App.css';
import * as React from 'react';
import SignIn from './components/SignIn';
import Dashboard from './components/dashboard/Dashboard'
import Home from './components/home/Home'
import Industries from './components/industries/Industries'
import Companies from './components/companies/Companies'
import Investors from './components/investors/Investors'

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = React.useState(true);
//   return (
//     <div className="App">
//       {/* <SignIn/> */}
//       <Home/>
//       {/* <Dashboard /> */}
//       {/* {isLoggedIn?<Dashboard />:<Home/>} */}
//       {/* <Industries/> */}
//       {/* <Companies/> */}
//       {/* <Investors/> */}
//     </div>
//   );
// }

// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HomePage from './components/HomePage'; // Import your Home page component
// import IndustriesPage from './components/IndustriesPage'; // Import your Industries page component
// import Layout from './components/Layout'; // Optional: Layout component if you have one

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/companies" element={<Companies/>} />
          <Route path="/investors" element={<Investors/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/signin" element={<SignIn/>} />
          {/* Add more routes as needed */}
        </Routes>
    </BrowserRouter>
  );
};

export default App;


