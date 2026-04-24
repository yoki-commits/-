import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import type { RootState, AppDispatch } from '../store/store';

const Home = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">实验预习系统</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-gray-700">Welcome, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Welcome to the Experiment Preparation System</h2>
        <p className="text-gray-700 mb-6">
          This system helps you prepare for your experiments by providing detailed information about experimental principles, steps, and observations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Experiment Search</h3>
            <p className="text-gray-600 mb-4">Search for experiments by name or upload textbook images to get detailed information.</p>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate('/search')}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
              >
                Search by Name
              </button>
              <button
                onClick={() => navigate('/upload')}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex-1"
              >
                Upload Image
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Report Templates</h3>
            <p className="text-gray-600 mb-4">Generate standardized experiment report templates with all necessary sections.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">History</h3>
            <p className="text-gray-600 mb-4">View your experiment history and review past experiments.</p>
            <button
              onClick={() => navigate('/history')}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              View History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;