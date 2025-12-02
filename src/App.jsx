import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import MainPage from "./pages/MainPage";
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import UnitsPage from './pages/UnitsPage';
import AdminPage from './pages/AdminPage';
import HistoryPage from './pages/HistoryPage';
import RankingsPage from './pages/RankingsPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/units" element={<UnitsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/rankings" element={<RankingsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;