import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ReportGenerator = () => {
  const [experiment, setExperiment] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 从 location state 中获取实验数据
  useEffect(() => {
    if (location.state && location.state.experiment) {
      setExperiment(location.state.experiment);
    } else {
      setError('No experiment data found');
    }
  }, [location.state]);

  const generateReport = () => {
    if (!experiment) return;

    setLoading(true);

    // 生成报告内容
    const reportContent = `# 实验报告

## 实验名称
${experiment.name}

## 实验原理
${experiment.principle}

## 实验仪器
${experiment.instruments}

## 实验步骤
${experiment.steps}

## 实验数据记录
| 次数 | 数据 1 | 数据 2 | 数据 3 | 平均值 |
|------|--------|--------|--------|--------|
| 1    |        |        |        |        |
| 2    |        |        |        |        |
| 3    |        |        |        |        |

## 实验结果与分析

## 结论

## 注意事项
${experiment.notes}
`;

    // 创建下载链接
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${experiment.name}_实验报告.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setLoading(false);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  if (!experiment) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-500 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">实验报告模板生成</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">实验信息</h2>
        <div className="border border-gray-200 rounded-md p-4">
          <h3 className="text-lg font-medium text-blue-600 mb-2">{experiment.name}</h3>
          <p className="text-gray-700 mb-4"><strong>实验原理:</strong> {experiment.principle.substring(0, 100)}...</p>
          <p className="text-gray-700 mb-4"><strong>实验仪器:</strong> {experiment.instruments}</p>
          <p className="text-gray-700"><strong>实验步骤:</strong> {experiment.steps.substring(0, 100)}...</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">报告模板预览</h2>
        <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">
{`# 实验报告

## 实验名称
${experiment.name}

## 实验原理
${experiment.principle.substring(0, 50)}...

## 实验仪器
${experiment.instruments}

## 实验步骤
${experiment.steps.substring(0, 50)}...

## 实验数据记录
| 次数 | 数据 1 | 数据 2 | 数据 3 | 平均值 |
|------|--------|--------|--------|--------|
| 1    |        |        |        |        |
| 2    |        |        |        |        |
| 3    |        |        |        |        |

## 实验结果与分析

## 结论

## 注意事项
${experiment.notes.substring(0, 50)}...
`}
          </pre>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={generateReport}
          disabled={loading}
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-green-300"
        >
          {loading ? '生成中...' : '生成并下载报告模板'}
        </button>
      </div>
    </div>
  );
};

export default ReportGenerator;