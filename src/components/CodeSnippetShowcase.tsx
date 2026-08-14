import React, { useState } from 'react';
import { Copy, Check, Cpu, Sparkles } from 'lucide-react';

const RAG_SERVICE_CODE = `// Context-Aware RAG Engine powering this portfolio's AI Assistant.
import { RAGContext } from '@/types/rag';

export async function askGroqRAG(
  query: string,
  context: RAGContext,
  apiKey?: string
): Promise<string> {
  const groqKey = apiKey || import.meta.env.VITE_GROQ_API_KEY;

  // 1. Build Knowledge Context Graph from live database
  const expContext = context.experience.map(e => \`- \${e.role} at \${e.company} (\${e.year}): \${e.description}\`).join('\\n');
  const projContext = context.projects.map(p => \`- \${p.title}: \${p.description}\`).join('\\n');

  const systemPrompt = \`You are Nishant's AI Assistant on his portfolio.
Answer user questions accurately & concisely using ONLY this RAG context:

=== PORTFOLIO KNOWLEDGE GRAPH ===
Name: \${context.profile.name || 'Nishant Kumar'}
Title: \${context.profile.title || 'Data Scientist & ML Engineer'}
Bio: \${context.profile.bio}

WORK EXPERIENCE:
\${expContext}

FEATURED PROJECTS:
\${projContext}\`;

  // 2. Query LLaMA-3.3-70B via Groq LPUs for sub-100ms LLM inference
  if (groqKey) {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: \`Bearer \${groqKey}\`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query },
        ],
        temperature: 0.5,
        max_tokens: 350,
      }),
    });
    if (res.ok) return (await res.json()).choices[0].message.content;
  }

  // 3. Zero-Latency Fallback RAG Engine if API key unavailable
  return fallbackLocalRAG(query, context);
}`;

const PYTHON_PIPELINE_CODE = `# Production PyTorch / LLM RAG Embeddings & Context Retriever
import torch
from transformers import AutoTokenizer, AutoModel
from typing import List, Dict

class VectorStoreRAG:
    """Ultra-fast in-memory cosine similarity retriever for LLM grounding."""
    def __init__(self, model_name: str = "sentence-transformers/all-MiniLM-L6-v2"):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModel.from_pretrained(model_name)
        self.documents: List[Dict[str, str]] = []
        self.embeddings: torch.Tensor = None

    def embed_texts(self, texts: List[str]) -> torch.Tensor:
        inputs = self.tokenizer(texts, padding=True, truncation=True, return_tensors="pt")
        with torch.no_grad():
            outputs = self.model(**inputs)
            embeddings = outputs.last_hidden_state.mean(dim=1)
        return torch.nn.functional.normalize(embeddings, p=2, dim=1)

    def retrieve(self, query: str, top_k: int = 3) -> List[Dict[str, str]]:
        query_vec = self.embed_texts([query])
        scores = torch.mm(query_vec, self.embeddings.T).squeeze(0)
        top_indices = torch.topk(scores, k=min(top_k, len(self.documents))).indices
        return [self.documents[i] for i in top_indices.tolist()]`;

const CodeSnippetShowcase = () => {
  const [copiedService, setCopiedService] = useState(false);
  const [copiedPython, setCopiedPython] = useState(false);

  const copyToClipboard = async (text: string, setCopied: (val: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {}
  };

  return (
    <section className="py-16 md:py-32 px-4 sm:px-6" id="snippets" style={{ background: 'var(--bg-elev)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky" style={{ top: '120px' }}>
            <div className="font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
              <Cpu className="w-3.5 h-3.5" />
              // a piece of my craft
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-5xl mb-4 sm:mb-6" style={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>askGroqRAG</span>
              <span style={{ fontStyle: 'normal', letterSpacing: '0.08em' }} className="ml-0.5">( )</span> — the engine powering this portfolio's AI assistant.
            </h2>
            <p className="text-sm sm:text-base mb-6 sm:mb-8" style={{ color: 'var(--muted)', lineHeight: 1.65 }}>
              The interactive <strong style={{ color: 'var(--fg)' }}>"ASK AI"</strong> button on this site isn't a hardcoded template — it's a context-aware Retrieval-Augmented Generation (RAG) system built with LLaMA-3.3 70B, real-time knowledge graphs, and zero-latency local fallback.
            </p>
            <ul className="space-y-2.5 sm:space-y-3 font-mono text-xs sm:text-sm mb-6 sm:mb-8" style={{ color: 'var(--fg-dim)' }}>
              <li className="flex items-center gap-3"><span style={{ color: 'var(--accent)' }}>→</span> LLaMA-3.3-70B RAG architecture</li>
              <li className="flex items-center gap-3"><span style={{ color: 'var(--accent)' }}>→</span> PyTorch vector embeddings & retrieval</li>
              <li className="flex items-center gap-3"><span style={{ color: 'var(--accent)' }}>→</span> Sub-100ms ultra-fast inference</li>
            </ul>
          </div>

          <div className="lg:col-span-8 space-y-6 max-w-full overflow-hidden">
            {/* RAG Service Code Window */}
            <div className="code-window max-w-full">
              <div className="code-header">
                <div className="flex items-center gap-3">
                  <span className="flex gap-1.5">
                    <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }}></span>
                    <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#febc2e', display: 'inline-block' }}></span>
                    <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#28c840', display: 'inline-block' }}></span>
                  </span>
                  <span className="font-mono text-xs flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    groqRagService.ts
                  </span>
                </div>
                <button
                  className={`copy-btn ${copiedService ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(RAG_SERVICE_CODE, setCopiedService)}
                >
                  <span className="copy-flash"></span>
                  {copiedService ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span className="copy-label">{copiedService ? 'copied' : 'copy'}</span>
                </button>
              </div>
              <pre className="p-3.5 sm:p-5 md:p-7 text-[11px] sm:text-xs md:text-sm overflow-x-auto max-w-full" style={{ background: 'var(--code-bg)', margin: 0, lineHeight: 1.7 }}>
                <code>{RAG_SERVICE_CODE}</code>
              </pre>
            </div>

            {/* Python Vector RAG Code Window */}
            <div className="code-window max-w-full">
              <div className="code-header">
                <div className="flex items-center gap-3">
                  <span className="flex gap-1.5">
                    <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }}></span>
                    <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#febc2e', display: 'inline-block' }}></span>
                    <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#28c840', display: 'inline-block' }}></span>
                  </span>
                  <span className="font-mono text-xs flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
                    <Cpu className="w-3 h-3 text-blue-400" />
                    rag_embeddings.py
                  </span>
                </div>
                <button
                  className={`copy-btn ${copiedPython ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(PYTHON_PIPELINE_CODE, setCopiedPython)}
                >
                  <span className="copy-flash"></span>
                  {copiedPython ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span className="copy-label">{copiedPython ? 'copied' : 'copy'}</span>
                </button>
              </div>
              <pre className="p-3.5 sm:p-5 md:p-7 text-[11px] sm:text-xs md:text-sm overflow-x-auto max-w-full" style={{ background: 'var(--code-bg)', margin: 0, lineHeight: 1.7 }}>
                <code>{PYTHON_PIPELINE_CODE}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeSnippetShowcase;
