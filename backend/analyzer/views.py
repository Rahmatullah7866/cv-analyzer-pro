from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.text import get_valid_filename
from .services.file_parser import extract_text_from_file
from .services.ollama_client import run_ats_ai_analysis
from .models import AnalysisRecord
from .serializers import AnalysisRecordSerializer

class AnalyzeDocumentsView(APIView):
    def post(self, request, *args, **kwargs):
        cv_file = request.FILES.get('cv')
        cover_letter_file = request.FILES.get('cover_letter')
        job_description = request.data.get('job_description', '').strip()
        job_title = request.data.get('job_title', '').strip()

        if not cv_file:
            return Response({"error": "A CV file (.pdf or .docx) is required."}, status=status.HTTP_400_BAD_REQUEST)
        if not job_description:
            return Response({"error": "Target Job Description text is required."}, status=status.HTTP_400_BAD_REQUEST)

        # 1. Parse and validate CV
        try:
            cv_filename = get_valid_filename(cv_file.name)
            raw_cv_text = extract_text_from_file(cv_file)
            if len(raw_cv_text) < 50:
                return Response({"error": "CV text could not be read or is too short."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": f"CV processing failed: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        # 2. Parse optional Cover Letter
        raw_cover_letter_text = ""
        if cover_letter_file:
            try:
                raw_cover_letter_text = extract_text_from_file(cover_letter_file)
            except Exception as e:
                return Response({"error": f"Cover Letter processing failed: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        # 3. Perform AI Evaluation via Ollama
        try:
            ai_result = run_ats_ai_analysis(raw_cv_text, job_description, raw_cover_letter_text)
        except Exception as e:
            return Response({"error": f"AI ATS Engine failure: {str(e)}"}, status=status.HTTP_502_BAD_GATEWAY)

        # 4. Persist to MySQL
        record = AnalysisRecord.objects.create(
            cv_filename=cv_filename,
            has_cover_letter=bool(cover_letter_file),
            job_title=job_title or "Target Role",
            target_job_description=job_description,
            raw_cv_text=raw_cv_text,
            raw_cover_letter_text=raw_cover_letter_text,
            overall_match_score=ai_result.get("overall_match_score", 0),
            skills_match_score=ai_result.get("skills_match_score", 0),
            quantified_impact_score=ai_result.get("quantified_impact_score", 0),
            formatting_readability_score=ai_result.get("formatting_readability_score", 0),
            missing_hard_skills=ai_result.get("missing_hard_skills", []),
            missing_soft_skills=ai_result.get("missing_soft_skills", []),
            bullet_corrections=ai_result.get("bullet_corrections", []),
            recruiter_insights=ai_result.get("recruiter_insights", {}),
            interview_questions=ai_result.get("interview_questions", []),
            cover_letter_feedback=ai_result.get("cover_letter_feedback", {})
        )

        serializer = AnalysisRecordSerializer(record)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class HealthCheckView(APIView):
    def get(self, request):
        return Response({"status": "healthy", "service": "cv-analyzer-backend"}, status=status.HTTP_200_OK)