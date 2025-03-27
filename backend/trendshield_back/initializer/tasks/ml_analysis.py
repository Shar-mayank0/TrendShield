from celery import shared_task
from ..ml_analyze import MLAnalyze
import pandas as pd

@shared_task
def ml_analysis(data, product_id):
    ml = MLAnalyze(data, product_id)
    ml.get_data(ml.dates, ml.prices)
    
    # Convert Series to lists for JSON serialization
    analyzeData = {
        "prices": ml.prices,  
        "dates": ml.dates,  
        "anomalies": ml.anomalies.tolist() if isinstance(ml.anomalies, pd.Series) else ml.anomalies,  
        "clusters": ml.clusters.tolist() if isinstance(ml.clusters, pd.Series) else ml.clusters  
    }
    return analyzeData