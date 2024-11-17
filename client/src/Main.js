import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import StartPage from './pages/StartPage';
import Stage2Page from './pages/Stage2Page';
import Stage1Page from './pages/Stage1Page';
import IntroPage from './pages/IntroPage';
import NewsPage from './pages/NewsPage';
import Stage3Page from './pages/Stage3Page';
import Stage4Room1 from './pages/Stage4Room1';


function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="intro" element={<IntroPage />} />
          <Route path="intro/news" element={<NewsPage />} />
          <Route path="stage1" element={<Stage1Page />} />
          <Route path="stage2" element={<Stage2Page />} />
          <Route path="stage3" element={<Stage3Page />} />
          <Route path="stage4room1" element={<Stage4Room1 />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;
