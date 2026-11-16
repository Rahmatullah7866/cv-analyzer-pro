from django.db import models

class AnalysisRecord(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    cv_filename = models.CharField(max_length=255)
    has_cover_letter = models.BooleanField(default=False)
    job_title = models.CharField(max_length=255, blank=True)
    target_job_description = models.TextField()
    
    # Raw Parsed Text (Securely stored)
    raw_cv_text = models.TextField()
    raw_cover_letter_text = models.TextField(blank=True, null=True)

    # Scored Metrics
    overall_match_score = models.IntegerField(default=0)
    skills_match_score = models.IntegerField(default=0)
    quantified_impact_score = models.IntegerField(default=0)
    formatting_readability_score = models.IntegerField(default=0)
    
    # Detailed AI JSON outputs
    missing_hard_skills = models.JSONField(default=list)
    missing_soft_skills = models.JSONField(default=list)
    bullet_corrections = models.JSONField(default=list)
    recruiter_insights = models.JSONField(default=dict)
    interview_questions = models.JSONField(default=list)
    cover_letter_feedback = models.JSONField(default=dict)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Scan {self.id} - Score: {self.overall_match_score}% ({self.cv_filename})"