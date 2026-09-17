import React, { useState } from 'react';
import { Sparkles, Copy, Check, Lock, Wand2, RefreshCw, Share2 } from 'lucide-react';

export default function GeneratorWorkspace({ userPlan, setUserPlan }) {
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('Facebook');
  const [contentType, setContentType] = useState('Promotional Post');
  const [tone, setTone] = useState('Persuasive');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (userPlan.usageCount >= userPlan.usageLimit) {
      alert('Monthly generation limit reached! Please upgrade your plan.');
      return;
    }

    setLoading(true);
    setGeneratedContent('');

    // Simulated API response delay
    setTimeout(() => {
      const output = `🚀 **Exclusive Offer Alert!**\n\n${prompt || 'Upgrade your business workflow with our premium services today!'}\n\n✨ Why Choose Us?\n• Premium Quality Guarantee\n• Fast & Reliable Customer Support\n• Special Discount for Limited Time\n\n👉 Send us a direct message to claim your discount today!\n\n#BusinessGrowth #DigitalMarketing #${platform}Campaign`;
      
      setGeneratedContent(output);
      setUserPlan(prev => ({ ...prev, usageCount: prev.usageCount + 1 }));
      setLoading(false);
    }, 1200);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      {/* Input Form Panel */}
      <div className="xl:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-indigo-400" /> AI Generator Studio
          </h2>
          <span className="text-[10px] text-slate-500 font-mono">GPT-4o-Mini Engine</span>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Target Platform</label>
          <select 
            value={platform} 
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition"
          >
            <option>Facebook</option>
            <option>Instagram</option>
            <option>LinkedIn</option>
            <option>WhatsApp Direct Message</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Copy Type</label>
            <select 
              value={contentType} 
              onChange={(e) => setContentType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition"
            >
              <option>Promotional Post</option>
              <option>Discount Campaign</option>
              <option>Educational Tips</option>
              <option>Product Review</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Tone of Voice</label>
            <select 
              value={tone} 
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition"
            >
              <option>Persuasive</option>
              <option>Professional</option>
              <option>Casual & Friendly</option>
              <option>Urgent / FOMO</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Product / Offer Details</label>
          <textarea 
            rows="5"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your product, discount percentage, or key value proposition..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition resize-none"
          />
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading || !prompt}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-600/20"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin text-white" />
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Generate Copy
            </>
          )}
        </button>
      </div>

      {/* Output Panel */}
      <div className="xl:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between min-h-[440px]">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <h2 className="text-sm font-semibold text-white">Generated Content Preview</h2>
            {generatedContent && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={copyToClipboard}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg transition">
                  <Share2 className="w-3.5 h-3.5" /> Export
                </button>
              </div>
            )}
          </div>

          <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 whitespace-pre-wrap text-slate-300 text-xs leading-relaxed min-h-[260px]">
            {generatedContent || (
              <span className="text-slate-600 italic">
                Provide details on the left form and click "Generate Copy" to create high-converting marketing content...
              </span>
            )}
          </div>
        </div>

        {/* Enterprise Upsell Banner */}
        <div className="mt-4 border border-amber-500/20 bg-amber-500/5 p-3.5 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-300">Unlock Custom Brand Voice & Team Members</p>
              <p className="text-[11px] text-slate-400">Train AI on your company tone and invite up to 5 team members.</p>
            </div>
          </div>
          <button className="text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg hover:bg-amber-500/20 transition">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}