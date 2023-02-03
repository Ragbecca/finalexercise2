import '../App.scss';
import MainPage from '../pages/MainPage';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import TestPage from '../pages/TestPage';
import { AuthProvider } from '../misc/AuthContext';
import PrivateRoute from '../components/PrivateRoute';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import { TaskProvider } from '../misc/TaskContext';
import { SelectorProvider } from '../misc/SelectorContext';
import { WebsiteProvider } from '../misc/WebsiteContext';
import { QuoteProvider } from '../misc/QuoteContext';
import SignUpPage from '../pages/SignUpPage';
import CategoryContext, { CategoryProvider } from '../misc/CategoryContext';


function App() {

  return (
    <AuthProvider>
      <TaskProvider>
        <WebsiteProvider>
          <SelectorProvider>
            <QuoteProvider>
              <CategoryProvider>
                <Header />
                <Routes>
                  <Route index exact element={<HomePage />} />
                  <Route path='/test' element={<PrivateRoute child={<TestPage />} />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/signup' element={<SignUpPage />} />
                  <Route path='/homepage' element={<PrivateRoute child={<MainPage />}></PrivateRoute>} />
                </Routes>
              </CategoryProvider>
            </QuoteProvider>
          </SelectorProvider>
        </WebsiteProvider>
      </TaskProvider>
    </AuthProvider >
  );
}

export default App;
