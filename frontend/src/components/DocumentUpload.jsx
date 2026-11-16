import React, { useState } from 'react';
import { UploadCloud, FileText, Briefcase, AlertCircle, Loader2 } from 'lucide-react';

export default function DocumentUpload({ onAnalyze, loading }) {
  const [cvFile, setCvFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!cvFile) {
      setError('Please provide your CV / Resume document.');
      return;
    }
    if (!jobDescription.trim()) {
      setError('Please paste the Target Job Description to perform ATS scoring.');
      return;
    }

    const formData = new FormData();
    formData.append('cv', cvFile);
    if (coverLetterFile) {
      formData.append('cover_letter', coverLetterFile);
    }
    formData.append('job_title', jobTitle);
    formData.append('job_description', jobDescription);

    onAnalyze(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-cyber-800 border border-gray-800 rounded-xl p-6 shadow-2xl">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <UploadCloud className="w-5 h-5 text-cyan-400" /> Upload Documents & Job Requirements
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-rose-950/60 border border-rose-500/40 rounded-lg text-rose-300 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* CV Upload */}
        <div className="border border-dashed border-gray-700 rounded-xl p-5 hover:border-cyan-500/50 transition-all bg-cyber-900/50">
          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" /> Resume / CV (PDF or DOCX)*
          </label>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setCvFile(e.target.files[0])}
            className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-cyan-950 file:text-cyan-400 hover:file:bg-cyan-900 cursor-pointer"
          />
          {cvFile && <p className="mt-2 text-xs text-emerald-400 font-mono">Selected: {cvFile.name}</p>}
        </div>

        {/* Optional Cover Letter */}
        <div className="border border-dashed border-gray-700 rounded-xl p-5 hover:border-cyan-500/50 transition-all bg-cyber-900/50">
          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" /> Cover Letter (Optional)
          </label>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setCoverLetterFile(e.target.files[0])}
            className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-purple-950 file:text-purple-400 hover:file:bg-purple-900 cursor-pointer"
          />
          {coverLetterFile && <p className="mt-2 text-xs text-purple-400 font-mono">Selected: {coverLetterFile.name}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-cyan-400" /> Target Job Title
        </label>
        <input
          type="text"
          placeholder="e.g. Junior DevSecOps Engineer / Fachinformatiker"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full bg-cyber-900 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-100 focus:outline-none focus:border-cyan-400"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Target Job Description (Paste Text)*
        </label>
        <textarea
          rows={5}
          placeholder="Paste requirements, tech stack keywords, and qualifications from the job posting..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full bg-cyber-900 border border-gray-700 rounded-lg p-3 text-sm text-gray-100 focus:outline-none focus:border-cyan-400 font-mono"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold rounded-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>AUDITING RESUME VIA LOCAL AI (THIS MAY TAKE 20-30s)...</span>
          </>
        ) : (
          <span>RUN DEVSECOPS ATS AUDIT</span>
        )}
      </button>
    </form>
  );
}