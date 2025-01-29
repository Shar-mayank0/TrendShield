from urllib import response
import requests
import re
import json
from bs4 import BeautifulSoup
from celery import shared_task
from .models import ProductURLData, PriceHistData
import logging

logger = logging.getLogger(__name__)

class WebScraper:
    def __init__(self, product_url, product_id, site):
        self.search_product(product_url, product_id, site)
        self.res = f"scraping started for {product_id} from {site}"

    def test_worker(self):
        for i in range(100000000):
            if i == 99999999:
                print("counting done ")
        print("Worker is working ending task done HORRAYYY!!! initializer/scraping.py")

    # this method gets the html of the page and the product id and 
    # the site name and then parses the html to get the data in the
    #  script tag and then converts it to json and then uploads it to the database
    def get_web_page_parser(self, html, product_id, site):
        soup = BeautifulSoup(html, "lxml")

        # Extract the first script tag containing product data
        script_tag = soup.find("script", string=re.compile(r"var data =(.+?);"))
        if not script_tag:
            self.res = f"[ERROR] No script tag found for {site} product {product_id}"
            logger.info(self.res)
            return
        match = re.search(r"var data =(.+?);", script_tag.string)
        if not match:
            self.res = f"[ERROR] No JSON data found in script tag for {site} product {product_id}"
            logger.info(self.res)
            return

        try:
            json_data = json.loads(match.group(1))  # Extract and parse JSON
            json_data["site"] = site
            json_data["prod_id"] = product_id
            self.res = f"[INFO] Successfully extracted product data: {json_data}"
            logger.info(self.res)

            # TODO: Upload to database
        except json.JSONDecodeError as e:
            self.res = f"[ERROR] Failed to parse JSON: {e}"
            logger.info(self.res)

        
        # this method searches the flipkart product and then calls the get_web_page_parser method 

    def search_product(self, product_url, product_id, site):
        search_url = "https://www.pricebefore.com/search"
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        }
        response = requests.get(search_url, params={"q": product_url}, headers=headers)

        if response.status_code != 200:
            self.res = f"[ERROR] Failed to fetch {site} product {product_id}. Status Code: {response.status_code}"
            logger.info(self.res)
            return
        
        self.res = f"[INFO] Fetched {site} product {product_id}"
        logger.info(self.res)
        self.get_web_page_parser(response.text, product_id, site)

    def save_product_data(self, product_data):
        # Save product data to the database
        pass





