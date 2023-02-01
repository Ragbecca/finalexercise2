import '../App.scss';
import MainPage from '../pages/MainPage';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import TestPage from '../pages/TestPage';
import { AuthProvider } from '../misc/AuthContext';
import PrivateRoute from '../components/PrivateRoute';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';


function App() {

  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route index exact element={<HomePage />} />
        <Route path='/test' element={<PrivateRoute child={<TestPage />} />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/homepage' element={<PrivateRoute child={<MainPage />}></PrivateRoute>} />
      </Routes>
    </AuthProvider >
  );
}

export default App;
