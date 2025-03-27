from urllib import response
import requests
import re
import json
from bs4 import BeautifulSoup
from celery import shared_task
from zmq import NULL
from .models import ProductURLData, PriceHistData
import logging

logger = logging.getLogger(__name__)

class WebScraper:
    def __init__(self, product_url, product_id, site):
        self.product_url = product_url
        self.product_id = product_id
        self.site = site
        self.res = None
        self.scraperData = None

    def search_product(self):
        search_url = "https://www.pricebefore.com/search"
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        }
        response = requests.get(search_url, params={"q": self.product_url}, headers=headers)

        if response.status_code != 200:
            self.res = f"[ERROR] Failed to fetch {self.site} product {self.product_id}. Status Code: {response.status_code}"
            logger.info(self.res)
            return
        
        self.res = f"[INFO] Fetched {self.site} product {self.product_id}"
        logger.info(self.res)
        self.get_web_page_parser(response.text)

    def get_web_page_parser(self, html):
        soup = BeautifulSoup(html, "lxml")

        script_tag = soup.find("script", string=re.compile(r"var data =(.+?);"))
        if not script_tag:
            self.res = f"[ERROR] No script tag found for {self.site} product {self.product_id}"
            logger.info(self.res)
            return

        match = re.search(r"var data\s*=\s*(\{.*?\})\s*;", script_tag.string, re.DOTALL)
        if not match:
            self.res = f"[ERROR] No JSON data found in script tag for {self.site} product {self.product_id}"
            logger.info(self.res)
            return

        try:
            self.scraperData = json.loads(match.group(1).strip())  
            self.scraperData["site"] = self.site
            self.scraperData["prod_id"] = self.product_id
            self.res = f"[INFO] Successfully extracted product data"
            print(f"scrapeData type :{type(self.scraperData)}")            
        except json.JSONDecodeError as e:
            self.res = f"[ERROR] Failed to parse JSON: {e}"
            logger.info(self.res)
            return


    def save_product_data(self, product_data):
        # Save product data to the database
        pass





