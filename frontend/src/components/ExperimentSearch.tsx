import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ExperimentSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 从 location state 中获取搜索参数
  useEffect(() => {
    if (location.state && location.state.searchTerm) {
      setSearchTerm(location.state.searchTerm);
      handleSearch({ preventDefault: () => {} } as React.FormEvent);
    }
  }, [location.state]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/experiments/search`, {
        params: { name: searchTerm }
      });
      setResults(response.data);
    } catch (err) {
      setError('Error searching experiments');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExperimentClick = (experiment: any) => {
    navigate(`/experiment/${experiment.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">实验查询</h2>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="输入实验名称"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 px-6 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {loading ? '搜索中...' : '搜索'}
          </button>
        </div>
      </form>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">搜索结果</h3>
        {results.length === 0 ? (
          <p className="text-gray-600">未找到相关实验</p>
        ) : (
          <ul className="space-y-4">
            {results.map((experiment) => (
              <li
                key={experiment.id}
                className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                onClick={() => handleExperimentClick(experiment)}
              >
                <h4 className="text-lg font-medium text-blue-600">{experiment.name}</h4>
                <p className="text-gray-600 mt-2">{experiment.principle.substring(0, 100)}...</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExperimentSearch;