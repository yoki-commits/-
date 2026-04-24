import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const ExperimentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [experiment, setExperiment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchExperiment();
  }, [id, user, navigate]);

  const fetchExperiment = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/experiments/${id}`);
      setExperiment(response.data);
      
      // 添加实验记录
      if (user) {
        await addExperimentRecord(response.data);
      }
    } catch (err) {
      setError('Error fetching experiment details');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addExperimentRecord = async (experimentData: any) => {
    if (!user) return;

    try {
      await axios.post('http://localhost:3000/experiment-records', {
        user_id: user.id,
        experiment_id: experimentData.id,
        experiment_name: experimentData.name,
      });
    } catch (err) {
      console.error('Error adding experiment record:', err);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error || !experiment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Experiment not found'}</p>
          <button
            onClick={() => navigate('/search')}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <button
        onClick={() => navigate('/search')}
        className="mb-6 text-blue-500 hover:underline"
      >
        ← Back to Search
      </button>

      <h1 className="text-3xl font-bold mb-6">{experiment.name}</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">实验原理</h2>
        <p className="text-gray-700 whitespace-pre-line">{experiment.principle}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">实验步骤</h2>
        <ul className="list-disc pl-6 text-gray-700 whitespace-pre-line">
          {experiment.steps.split('\n').map((step: string, index: number) => (
            <li key={index} className="mb-2">{step}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">注意事项</h2>
        <ul className="list-disc pl-6 text-gray-700 whitespace-pre-line">
          {experiment.notes.split('\n').map((note: string, index: number) => (
            <li key={index} className="mb-2">{note}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">观察记录</h2>
        <ul className="list-disc pl-6 text-gray-700 whitespace-pre-line">
          {experiment.observations.split('\n').map((observation: string, index: number) => (
            <li key={index} className="mb-2">{observation}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">实验仪器</h2>
        <p className="text-gray-700">{experiment.instruments}</p>
      </div>

      <div className="mt-8 flex space-x-4">
        <button
          onClick={() => navigate('/report/generate', { state: { experiment } })}
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          生成实验报告模板
        </button>
        <button
          onClick={() => navigate('/history')}
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          查看历史记录
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          返回首页
        </button>
      </div>
    </div>
  );
};

export default ExperimentDetail;