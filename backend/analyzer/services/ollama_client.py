import os
import json
import requests
from django.core.exceptions import ValidationError

OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://ollama:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3")

def run_ats_ai_analysis(cv_text: str, job_description: str, cover_letter_text: str = "") -> dict:
    """
    Calls local Ollama instance with structured JSON output enforcement.
    """
    system_prompt = (
        "You are an enterprise Applicant Tracking System (ATS) auditor and senior technical hiring manager. "
        "Analyze the provided Resume, Target Job Description, and optional Cover Letter. "
        "Evaluate strictly against realistic recruitment criteria. "
        "You MUST return ONLY a valid, parseable JSON object matching the requested schema with no extra text or markdown wraps."
    )

    user_prompt = f"""
    <job_description>
    {job_description}
    </job_description>

    <resume_text>
    {cv_text}
    </resume_text>

    <cover_letter>
    {cover_letter_text if cover_letter_text else "None Provided"}
    </cover_letter>

    Provide a thorough JSON analysis using exactly these keys:
    {{
      "overall_match_score": <int 0-100>,
      "skills_match_score": <int 0-100>,
      "quantified_impact_score": <int 0-100>,
      "formatting_readability_score": <int 0-100>,
      "missing_hard_skills": ["<skill1>", "<skill2>"],
      "missing_soft_skills": ["<skill1>", "<skill2>"],
      "bullet_corrections": [
        {{
          "original": "<exact weak bullet from resume>",
          "optimized": "<high-impact rewrite using Action Verb + Context + Quantifiable Metric Formula>",
          "reasoning": "<why this improves ATS scoring>"
        }}
      ],
      "recruiter_insights": {{
        "first_impression": "<summary of 10-second scan>",
        "red_flags": ["<risk or vague point>"],
        "strengths": ["<standout point>"]
      }},
      "interview_questions": [
        "<Predictive technical or behavioral question based on gaps in this CV>"
      ],
      "cover_letter_feedback": {{
        "score": <int 0-100 or null>,
        "critique": "<feedback on personalization and impact>",
        "suggested_improvements": ["<improvement 1>"]
      }}
    }}
    """

    payload = {
        "model": OLLAMA_MODEL,
        "system": system_prompt,
        "prompt": user_prompt,
        "stream": False,
        "format": "json",
        "options": {
            "temperature": 0.2
        }
    }

    try:
        response = requests.post(f"{OLLAMA_HOST}/api/generate", json=payload, timeout=300)
        response.raise_for_status()
        raw_output = response.json().get("response", "{}")
        parsed_data = json.loads(raw_output)
        return parsed_data
    except requests.exceptions.RequestException as e:
        raise ValidationError(f"Ollama AI Service unreachable: {str(e)}")
    except json.JSONDecodeError:
        raise ValidationError("AI Engine failed to emit valid structured JSON.")