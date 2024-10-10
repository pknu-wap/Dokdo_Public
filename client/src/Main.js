import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import StartPage from './pages/StartPage';
import Stage2Page from './pages/Stage2Page';
import IntroPage from './pages/IntroPage';
import NewsPage from './pages/NewsPage';
import Stage3Page from './pages/Stage3Page';


function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="Stage2Page" element={<Stage2Page />} />
          <Route path="intro" element={<IntroPage />} />
          <Route path="intro/news" element={<NewsPage />} />
          <Route path="Stage3Page" element={<Stage3Page />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;
