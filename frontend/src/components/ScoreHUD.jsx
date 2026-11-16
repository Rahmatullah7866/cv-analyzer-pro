import React from 'react';
import { Target, Zap, CheckCircle2, Award } from 'lucide-react';

function GaugeCard({ title, score, icon: Icon, colorClass, subtitle }) {
  return (
    <div className="bg-cyber-800 border border-gray-800 rounded-xl p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wider text-gray-400 font-mono">{title}</span>
        <Icon className={`w-5 h-5 ${colorClass}`} />
      </div>
      <div className="flex items-baseline space-x-2 my-2">
        <span className={`text-4xl font-extrabold font-mono ${colorClass}`}>{score}%</span>
      </div>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      {/* Progress Bar */}
      <div className="w-full bg-gray-700/50 rounded-full h-1.5 mt-3 overflow-hidden">
        <div
          className={`h-1.5 rounded-full ${colorClass.replace('text-', 'bg-')}`}
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>
    </div>
  );
}

export default function ScoreHUD({ data }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GaugeCard
          title="Overall ATS Match"
          score={data.overall_match_score}
          icon={Award}
          colorClass={data.overall_match_score >= 75 ? 'text-emerald-400' : 'text-cyan-400'}
          subtitle="Target Role Alignment Index"
        />
        <GaugeCard
          title="Skills Matching"
          score={data.skills_match_score}
          icon={Target}
          colorClass="text-cyan-400"
          subtitle="Hard & Soft Skill Overlap"
        />
        <GaugeCard
          title="Quantified Impact"
          score={data.quantified_impact_score}
          icon={Zap}
          colorClass={data.quantified_impact_score >= 60 ? 'text-emerald-400' : 'text-amber-400'}
          subtitle="Metrics, %, & Business Results"
        />
        <GaugeCard
          title="Readability & Structure"
          score={data.formatting_readability_score}
          icon={CheckCircle2}
          colorClass="text-purple-400"
          subtitle="Parsing & Section Flow"
        />
      </div>

      {/* Recruiter Quick Scan Summary */}
      {data.recruiter_insights && (
        <div className="bg-cyber-800 border border-cyan-500/20 rounded-xl p-5">
          <h3 className="text-sm font-bold text-cyan-400 font-mono uppercase mb-2">
            10-Second Recruiter First Impression
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            {data.recruiter_insights.first_impression}
          </p>
        </div>
      )}
    </div>
  );
}