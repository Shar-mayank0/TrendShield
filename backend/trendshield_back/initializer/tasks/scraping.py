from email import message
from celery import shared_task
from ..scraper import WEbScraper

@shared_task
def scrape_data():
    message = "Scraping Task Completed"
    return message

@shared_task
def test_worker():
    scraper = WEbScraper()
    scraper.test_worker()
    return "done! from initializer/tasks/scraping.py"
