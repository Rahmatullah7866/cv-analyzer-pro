import React from 'react';
import { XCircle, HelpCircle, CheckCircle } from 'lucide-react';

export default function KeywordMatrix({ missingHard, missingSoft, questions }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Missing Tech & Skills */}
      <div className="bg-cyber-800 border border-gray-800 rounded-xl p-5">
        <h4 className="text-sm font-bold text-gray-200 uppercase font-mono mb-3 flex items-center gap-2">
          <XCircle className="w-4 h-4 text-rose-400" /> Missing Hard Keywords from Job Post
        </h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {missingHard && missingHard.length > 0 ? (
            missingHard.map((skill, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-3 py-1 bg-rose-950/50 border border-rose-500/30 text-rose-300 rounded-full"
              >
                + {skill}
              </span>
            ))
          ) : (
            <p className="text-xs text-gray-400">No major technical skill gaps found.</p>
          )}
        </div>

        <h4 className="text-sm font-bold text-gray-200 uppercase font-mono mb-2 flex items-center gap-2 mt-4">
          <CheckCircle className="w-4 h-4 text-amber-400" /> Target Competencies / Soft Skills
        </h4>
        <div className="flex flex-wrap gap-2">
          {missingSoft && missingSoft.length > 0 ? (
            missingSoft.map((soft, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-3 py-1 bg-amber-950/50 border border-amber-500/30 text-amber-300 rounded-full"
              >
                {soft}
              </span>
            ))
          ) : (
            <p className="text-xs text-gray-400">Soft skills are well aligned.</p>
          )}
        </div>
      </div>

      {/* Predictive Interview Questions */}
      <div className="bg-cyber-800 border border-gray-800 rounded-xl p-5">
        <h4 className="text-sm font-bold text-cyan-400 uppercase font-mono mb-3 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-cyan-400" /> Predictive Interview Questions
        </h4>
        <ul className="space-y-2.5">
          {questions && questions.length > 0 ? (
            questions.map((q, idx) => (
              <li key={idx} className="text-xs text-gray-300 bg-cyber-900/60 p-2.5 rounded border border-gray-800 flex items-start gap-2">
                <span className="text-cyan-400 font-mono font-bold">{idx + 1}.</span>
                <span>{q}</span>
              </li>
            ))
          ) : (
            <p className="text-xs text-gray-400">Run an audit to generate predictive questions.</p>
          )}
        </ul>
      </div>
    </div>
  );
}