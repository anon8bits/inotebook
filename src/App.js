import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState.js';
import Home from './components/Home';
import Alert from './components/Alert';
function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          {/* <Alert message={"This is an alert"}/> */}
          <Routes>
            <Route exact path='/about' element={<About />} />
            <Route exact path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
