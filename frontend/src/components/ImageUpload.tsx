import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:3000/image-recognition/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
    } catch (err) {
      setError('Error uploading image');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewExperiment = () => {
    if (result) {
      // 这里我们假设后端返回的结果中包含实验名称，我们可以根据实验名称搜索实验
      navigate('/search', { state: { searchTerm: result.experimentName } });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">教材图片上传</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 mb-2">选择教材图片</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {file && <p className="text-gray-600 mb-4">Selected file: {file.name}</p>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          type="submit"
          disabled={loading || !file}
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
        >
          {loading ? '上传中...' : '上传并识别'}
        </button>
      </form>

      {result && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">识别结果</h3>
          <div className="border border-gray-200 rounded-md p-4">
            <h4 className="text-lg font-medium text-blue-600 mb-2">{result.experimentName}</h4>
            <div className="mb-4">
              <h5 className="font-medium mb-1">实验原理:</h5>
              <p className="text-gray-700">{result.principle.substring(0, 100)}...</p>
            </div>
            <div className="mb-4">
              <h5 className="font-medium mb-1">实验步骤:</h5>
              <p className="text-gray-700">{result.steps.substring(0, 100)}...</p>
            </div>
            <div className="mb-4">
              <h5 className="font-medium mb-1">注意事项:</h5>
              <p className="text-gray-700">{result.notes.substring(0, 100)}...</p>
            </div>
            <button
              onClick={handleViewExperiment}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              查看实验详情
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;