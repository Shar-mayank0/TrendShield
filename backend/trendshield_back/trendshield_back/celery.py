from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

from django.conf import settings
from matplotlib.pylab import f



os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'trendshield_back.settings')
app = Celery('trendshield_back')
app.conf.enable_utc = False
app.conf.update(timezone='Asia/Kolkata')

app.config_from_object(settings, namespace='CELERY')

app.autodiscover_tasks(['initializer.tasks'])

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
    
