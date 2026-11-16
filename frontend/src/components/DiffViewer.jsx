import React, { useState } from 'react';
import { ArrowRight, Copy, Check, Sparkles } from 'lucide-react';

export default function DiffViewer({ corrections }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!corrections || corrections.length === 0) {
    return null;
  }

  return (
    <div className="bg-cyber-800 border border-gray-800 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" /> Side-by-Side High Impact Rewrites
        </h3>
        <span className="text-xs font-mono text-gray-400 bg-gray-900 px-3 py-1 rounded-full border border-gray-700">
          Action + Context + Quantifiable Metric
        </span>
      </div>

      <div className="space-y-4">
        {corrections.map((item, index) => (
          <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-cyber-900/60 p-4 rounded-lg border border-gray-800">
            {/* Original weak bullet */}
            <div className="space-y-1">
              <span className="text-xs uppercase font-mono text-rose-400 font-semibold flex items-center gap-1">
                Original CV Bullet (Passive / Low Impact)
              </span>
              <p className="text-xs text-gray-400 font-mono bg-rose-950/20 border border-rose-900/40 p-3 rounded">
                "{item.original}"
              </p>
              {item.reasoning && (
                <p className="text-[11px] text-gray-500 italic mt-1">Audit: {item.reasoning}</p>
              )}
            </div>

            {/* AI High-impact rewrite */}
            <div className="space-y-1 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  ATS Optimized Alternative
                </span>
                <p className="text-xs text-emerald-200 font-mono bg-emerald-950/30 border border-emerald-900/40 p-3 rounded">
                  "{item.optimized}"
                </p>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => copyToClipboard(item.optimized, index)}
                  className="text-xs font-mono flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/40 hover:bg-emerald-900/70 border border-emerald-500/30 rounded text-emerald-300 transition-colors"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Bullet
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}