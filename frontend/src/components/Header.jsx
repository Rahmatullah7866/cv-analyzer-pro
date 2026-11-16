import React from 'react';
import { ShieldCheck, Cpu, Terminal } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-cyber-800/80 backdrop-blur sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyan-950 border border-cyan-500/30 rounded-lg text-cyan-400">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              SENTINEL <span className="text-cyan-400 text-sm font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/20">AI ATS AUDITOR</span>
            </h1>
            <p className="text-xs text-gray-400">DevSecOps Hardened • Private Local LLM Inference</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-xs font-mono">
          <span className="flex items-center text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 mr-1.5" /> ZERO CLOUD DATA LEAK
          </span>
          <span className="text-gray-400 hidden sm:flex items-center">
            <Terminal className="w-4 h-4 mr-1" /> Ollama Local Engine
          </span>
        </div>
      </div>
    </header>
  );
}