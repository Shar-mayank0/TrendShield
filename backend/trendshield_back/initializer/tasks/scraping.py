from email import message
from celery import shared_task
from ..scraper import WebScraper

@shared_task
def scrape_data(product_url, product_id, site):
    scraper = WebScraper(product_url, product_id, site)
    res =  scraper.res
    

