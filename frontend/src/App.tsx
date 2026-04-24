import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store/store';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ExperimentSearch from './components/ExperimentSearch';
import ExperimentDetail from './components/ExperimentDetail';
import ImageUpload from './components/ImageUpload';
import ReportGenerator from './components/ReportGenerator';
import ExperimentHistory from './components/ExperimentHistory';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<ExperimentSearch />} />
            <Route path="/experiment/:id" element={<ExperimentDetail />} />
            <Route path="/upload" element={<ImageUpload />} />
            <Route path="/report/generate" element={<ReportGenerator />} />
            <Route path="/history" element={<ExperimentHistory />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;