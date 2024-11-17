import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import StartPage from './pages/StartPage';
import Stage2Page from './pages/Stage2Page';
import Stage1Page from './pages/Stage1Page';
import IntroPage from './pages/IntroPage';
import NewsPage from './pages/NewsPage';
import Stage3Page from './pages/Stage3Page';
import Stage4PuzzleGame from 'pages/Stage4PuzzleGame';
import EndFailPage from 'pages/EndFailPage';

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
          <Route path="Stage3" element={<Stage3Page />} />
          <Route path="stage4PuzzleGame" element={<Stage4PuzzleGame />} />
          <Route path="EndFail" element={<EndFailPage />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;
