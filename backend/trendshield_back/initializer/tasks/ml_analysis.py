from celery import shared_task
from ..ml_analyze import MLAnalyze

@shared_task
def ml_analysis(data):
    ml = MLAnalyze(data)
    return ml