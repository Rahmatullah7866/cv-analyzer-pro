from django.urls import path
from .views import AnalyzeDocumentsView, HealthCheckView

urlpatterns = [
    path('analyze/', AnalyzeDocumentsView.as_view(), name='analyze-documents'),
    path('health/', HealthCheckView.as_view(), name='health-check'),
]