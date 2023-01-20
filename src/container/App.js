import '../App.scss';
import MainPage from '../pages/MainPage';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<MainPage />}></Route>
        <Route path='/homepage' exact element={<MainPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
