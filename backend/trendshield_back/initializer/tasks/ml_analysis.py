from celery import shared_task
from ..ml_analyze import MLAnalyze

@shared_task
def ml_analysis(data, product_id):
    ml = MLAnalyze(data, product_id)
    return ml