import requests
import re
import json
from bs4 import BeautifulSoup
import json

from celery import shared_task
from ..models import ProductURLData, PriceHistData


class WEbScraper:
    def __init__(self):

        pass
    def get_web_page_parser(self, html, Product_ID, site):
        soup = BeautifulSoup(html, "lxml")
        find_script = soup.findAll("script", src=None, type=None, string=re.compile("var data =(.+?);\n"))
        pattern = "var data =(.+?);\n"
        if find_script:
            json_html = re.findall(pattern, find_script[0].text)
            if json_html:
                json_data = json.loads(''.join(json_html))
                if site == "amazon":
                    if site == "amazon":
                        global amazon_prod_list
                        amazon_prod_list.append(Product_ID)
                    elif site == "flipkart":
                        global flipkart_prod_list
                        flipkart_prod_list.append(Product_ID)
                json_data["site"] = site
                json_data["prod_id"] = Product_ID

                # upload to daatabase functionallity TODO

            else:
                print("No data found")
        else:
            print("No script found")

    def search_flipkart_product(self):
        fp = "https://www.pricebefore.com/search"
        proxy = next(self.proxy_setter())
        for i in range(len(self.flipkart_url_list)):
            q = self.flipkart_url_list[i]
            payload = {'q': q}
            r = requests.get(fp, params=payload)
            print(r.url, r.status_code)
            html = r.text
            product_id = self.flipkart_p_ID[i]
            print(r.headers['Content-Type'])
            # Pass the HTML to the get_web_page_parser method
            self.get_web_page_parser(html, product_id, "flipkart")
            print(f"Product searched: {product_id}")

    def search_amazon_product(self):
        fp = "https://www.pricebefore.com/search"
        for i in range(len(self.amazon_url_list)):
            q = self.amazon_url_list[i]
            payload = {'q': q}
            r = requests.get(fp, params=payload)
            print(r.url, r.status_code)
            html = r.text
            product_id = self.amazon_p_ID[i]
            print(r.headers['Content-Type'])
            # Pass the HTML to the get_web_page_parser method
            self.get_web_page_parser(html, product_id, "amazon")
            print(f"Product searched: {product_id}")

