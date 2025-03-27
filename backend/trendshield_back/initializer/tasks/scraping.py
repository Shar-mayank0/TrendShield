from celery import shared_task
from ..scraper import WebScraper
import json

@shared_task
def scrape_data(product_url, product_id, site):
    scraper = WebScraper(product_url, product_id, site)
    scraper.search_product()  # Ensure this runs before accessing the data

    res = scraper.res
    data = scraper.scraperData

    # Ensure data is valid JSON
    try:
        json.dumps(data)  # This will raise an error if `data` is not serializable
    except Exception as e:
        print(f"Error serializing data: {e}")
        return res, "{}"

    return res, json.dumps(data)
