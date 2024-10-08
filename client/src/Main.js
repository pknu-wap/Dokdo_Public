import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import StartPage from './pages/StartPage';
import Stage2Page from './pages/Stage2Page';

function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="Stage2Page" element={<Stage2Page />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;
