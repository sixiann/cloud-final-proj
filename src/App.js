import './App.css';
import SignIn from './components/SignIn';
import Dashboard from './components/dashboard/Dashboard'

function App() {
  return (
    <div className="App">
      {/* <SignIn/> */}
      <Dashboard />

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
