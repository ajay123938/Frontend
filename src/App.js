import './App.css';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import Content from './Components/Content/Content';
import { useEffect } from 'react';

function App() {
  
  return (
    <div className="App">
      <Header logOut={true}/>
      <Navbar/>
      <Content/>
    </div>
  );
}

export default App;
