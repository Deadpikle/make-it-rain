import logo from './logo.svg';
import './App.css';
import RainShower from './RainShower';

console.log(process.env.REACT_APP_WEATHER_API_KEY);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Make It Rain</h3>
        <h4>A weather app for sillies</h4>
      </header>
      <RainShower/>
    </div>
  );
}

export default App;
