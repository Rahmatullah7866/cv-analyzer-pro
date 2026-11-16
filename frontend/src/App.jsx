import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header.jsx';
import DocumentUpload from './components/DocumentUpload.jsx';
import ScoreHUD from './components/ScoreHUD.jsx';
import DiffViewer from './components/DiffViewer.jsx';
import KeywordMatrix from './components/KeywordMatrix.jsx';

const API_BASE_URL = '/api';

export default function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAnalyze = async (formData) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post(`${API_BASE_URL}/analyze/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAnalysisResult(response.data);
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.error || 'Analysis failed. Make sure Ollama and backend are up.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-900 flex flex-col font-sans">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
        <DocumentUpload onAnalyze={handleAnalyze} loading={loading} />

        {errorMessage && (
          <div className="p-4 bg-rose-950/80 border border-rose-500 rounded-xl text-rose-200 text-sm">
            {errorMessage}
          </div>
        )}

        {analysisResult && (
          <div className="space-y-8 animate-fadeIn">
            <ScoreHUD data={analysisResult} />
            <DiffViewer corrections={analysisResult.bullet_corrections} />
            <KeywordMatrix
              missingHard={analysisResult.missing_hard_skills}
              missingSoft={analysisResult.missing_soft_skills}
              questions={analysisResult.interview_questions}
            />
          </div>
        )}
      </main>
    </div>
  );
}