import type { ProfileData } from '@/components/admin/ProfileSettings';
import type { Project } from '@/components/ProjectCard';
import type { ExperienceItem } from '@/hooks/useExperience';
import type { EducationItem } from '@/hooks/useEducation';

interface RAGContext {
  profile: ProfileData;
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
}

export async function askGroqRAG(
  query: string,
  context: RAGContext,
  apiKey?: string
): Promise<string> {
  const groqKey = apiKey || context.profile.groqApiKey || import.meta.env.VITE_GROQ_API_KEY;

  // Format RAG Knowledge Context from live database
  const expContext = context.experience.map(
    (e) => `- ${e.role} at ${e.company} (${e.year}): ${e.description}`
  ).join('\n');

  const eduContext = context.education.map(
    (e) => `- ${e.degree} in ${e.field} from ${e.school} (${e.year}): ${e.description}`
  ).join('\n');

  const projContext = context.projects.map(
    (p) => `- ${p.title} (${p.category || 'Project'}): ${p.description}. Stack: ${(p.technologies || []).join(', ')}`
  ).join('\n');

  const systemPrompt = `You are Nishant's personal AI Assistant on his portfolio website.
Answer user and recruiter questions about Nishant concisely, accurately, and professionally using ONLY the RAG context provided below.

=== PORTFOLIO KNOWLEDGE GRAPH (RAG CONTEXT) ===
Name: ${context.profile.name || 'Nishant Kumar'}
Title: ${context.profile.title || 'Data Scientist & ML Engineer'}
Bio: ${context.profile.bio || ''}
Email: ${context.profile.email || ''}
Available for Work: ${context.profile.availableForWork ? 'Yes, open for AI/ML roles and full-stack projects' : 'No'}
Top Skills: ${(context.profile.heroSkills || []).join(', ')}

WORK EXPERIENCE:
${expContext || 'Senior ML & Software Engineer with 6+ years experience.'}

EDUCATION & CERTIFICATIONS:
${eduContext || 'Degree in Computer Science.'}

FEATURED PROJECTS & CASE STUDIES:
${projContext || 'Built RAG search engines, real-time analytics platforms, and interactive 3D portfolios.'}

=== INSTRUCTIONS ===
- Answer directly in 2-4 sentences max.
- Use bold markdown (e.g. **Data Scientist**, **Tech Corp**, **Python**) to highlight key job titles, companies, and technologies.
- If asked about contacting Nishant, share his email: ${context.profile.email || 'hello@yourname.dev'}.
- Maintain a warm, intelligent, and professional tone with relevant single emojis (🚀, 💡, 🎯).`;

  if (groqKey && groqKey !== 'YOUR_GROQ_API_KEY') {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqKey}`,
          'Content-Type': 'application/json',
        },
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

      if (response.ok) {
        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content;
        if (content) {
          return content;
        }
      } else {
        console.warn('Groq API response status not ok:', response.status);
      }
    } catch (err) {
      console.warn('Groq API network error, falling back to local RAG context:', err);
    }
  }

  // Local RAG Context Fallback if no Groq API Key set
  return fallbackLocalRAG(query, context);
}

function fallbackLocalRAG(query: string, context: RAGContext): string {
  const q = query.toLowerCase().trim();
  const name = context.profile.name || 'Nishant Kumar';

  if (q.includes('work') || q.includes('company') || q.includes('experience') || q.includes('job') || q.includes('where')) {
    if (context.experience.length > 0) {
      const topExp = context.experience[0];
      return `**${name}** currently works as a **${topExp.role}** at **${topExp.company}** (${topExp.year}). He specializes in building production-grade AI systems, ML pipelines, and scalable applications 🚀`;
    }
    return `**${name}** has 6+ years of experience as a **Data Scientist & ML Engineer**, building high-throughput services, LLM pipelines, and modern web applications 🚀`;
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('python')) {
    const skills = (context.profile.heroSkills || ['Python', 'PyTorch', 'Scikit-Learn', 'FastAPI', 'React']).join(', ');
    return `**${name}**'s core technical stack includes **${skills}**. He specializes in **Machine Learning**, **RAG architectures**, and **full-stack software development** 💡`;
  }

  if (q.includes('project') || q.includes('built') || q.includes('app')) {
    if (context.projects.length > 0) {
      const topProj = context.projects[0];
      return `Some of **${name}**'s featured work includes **${topProj.title}** (${topProj.description}). Explore the Projects section above for live demos! 🎯`;
    }
    return `**${name}** has built LLM document search engines, real-time analytics platforms, and interactive web tools. Explore the Projects section above! 🎯`;
  }

  if (q.includes('education') || q.includes('study') || q.includes('degree') || q.includes('college')) {
    if (context.education.length > 0) {
      const topEdu = context.education[0];
      return `**${name}** studied **${topEdu.field}** (${topEdu.degree}) at **${topEdu.school}** (${topEdu.year}) 🎓`;
    }
    return `**${name}** holds a degree in **Computer Science** with advanced certifications in **Machine Learning** and **Full-Stack Engineering** 🎓`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach')) {
    return `You can reach out to **${name}** directly at **${context.profile.email || 'hello@yourname.dev'}**. He is **${context.profile.availableForWork ? 'currently open to roles and freelance projects' : 'available for select work'}** 📩`;
  }

  return `Hello! I'm **${name}**'s AI Assistant. What would you like to know about his work in **AI/ML**, **projects**, or **experience**? 🚀`;
}
