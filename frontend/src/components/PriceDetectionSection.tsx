"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function PriceDetectionSection() {
  const scrollToVisualization = () => {
    const element = document.getElementById("visualization-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const UrlSearch = (p_url: string) => {
    const amazonProductPage = /https:\/\/www\.amazon\.in(\/.*)?\/dp\/.*/;
    const flipkartproductpage = /https:\/\/www\.flipkart\.com(\/.*)?\/p\/.*/;
    if (flipkartproductpage.test(p_url)){
      const params = new URLSearchParams(new URL(p_url).search);
      const pid = params.get('pid'); // Ensure 'pid' matches the updated Flipkart parameter key
      if (pid === null) {
        console.log("'pid' parameter is not present in the URL");
      } else {
        console.log(`'pid' parameter value is: ${pid}`);
      }
      console.log('Flipkart product page detected');
      const url_Data = {Product_ID: pid, Product_URL: p_url, site: 'Flipkart'};
      console.log(url_Data);
      console.log('Product ID:', pid);
      console.log('Product URL:', p_url);
      fetch(`https://backend.trendshield.in/initializer/get_url/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(url_Data),
      })
      .then(response => response.text())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
    else if (amazonProductPage.test(p_url)){
      const params = new URLSearchParams(new URL(p_url).search);
      const asin = params.get('pd_rd_i');
      if (asin === null) {
        console.log("'asin' parameter is not present in the URL");
      } else {
        console.log(`'asin' parameter value is: ${asin}`);
      }
      console.log('Amazon product page detected');
      const url_Data = {Product_ID: asin, Product_URL: p_url, site: 'Amazon'};
      console.log(url_Data);
      console.log('Product ID:', asin);
      console.log('Product URL:', p_url);
      fetch(`https://backend.trendshield.in/initializer/get_url/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(url_Data),
      })
      .then(response => response.text())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
    else if (p_url === '') {
      alert('Please enter a URL');
    }
    else{
      alert('Please enter a valid Amazon or Flipkart URL');
    }
     
  }

  return (
    <section className="w-full bg-neutral-900 text-white">
      {/* Navigation Bar */}
      <header className="w-full border-b border-gray-800 py-4 px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
            {/* Logo and Search */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Logo placeholder */}
              {/* <img src="" alt="Logo" className="w-8 h-8" /> */}

              {/* Search field - responsive width */}
                <form onSubmit={(e) => {
                e.preventDefault();
                const inputElement = e.currentTarget.querySelector('input');
                if (inputElement) {
                  UrlSearch(inputElement.value);
                }
                }} className="flex items-center flex-1 sm:w-[240px] md:w-[303px] bg-[#fcfcfc05] rounded-[10px] border border-solid border-gray-700 px-2 py-2">
                <Search className="w-4 h-4 text-gray-400" />
                <Input
                  className="border-0 bg-transparent text-xs text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 h-5 px-2"
                  placeholder="Enter Product URL"
                />
                <Button type="submit" onClick={scrollToVisualization} className="hidden sm:block bg-[#3498db] hover:bg-[#2980b9] text-white text-xs ml-2 px-2 py-2 rounded-[10px]">
                  Search
                </Button>
                </form>
            </div>

            {/* Button moved below on mobile */}
            <div className="w-full sm:w-auto mt-2 sm:mt-0">
                <Button className="hidden  md:block bg-[#3498db] hover:bg-[#3498db] text-white text-xs w-full sm:w-auto ">
                Extension coming soon!!
                </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 sm:py-16">
        {/* Heading - responsive font sizes */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-['Roboto-Bold'] leading-tight sm:leading-[60px] mb-4">
          <span className="text-[#3498db]">Malicious Price</span>
          <br className="sm:hidden" />
          <span className="text-white"> Detection Dashboard</span>
        </h1>

        {/* Subtitle - responsive text */}
        <p className="text-lg sm:text-xl md:text-2xl font-normal font-['Open_Sans-Regular'] leading-tight sm:leading-8 mb-8 sm:mb-12">
          Visualizing ML-driven insights to protect businesses from pricing
          anomalies and market manipulation.
        </p>

        {/* Info Card */}
        <Card className="w-full bg-neutral-800 border-0 rounded-lg">
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-xl font-bold text-[#3498db] mb-3 font-['Roboto-Bold']">
              Understanding Malicious Pricing
            </h2>

            <p className="text-sm sm:text-base text-white mb-4 sm:mb-6 font-['Open_Sans-Regular'] leading-snug sm:leading-6">
              Our dashboard uses advanced machine learning algorithms (DBSCAN
              and K-Means) to identify suspicious price patterns that may
              indicate market manipulation or errors.
            </p>

            <p className="text-sm sm:text-base mb-4 sm:mb-6 font-['Open_Sans-Regular'] leading-snug sm:leading-6">
              <span className="font-bold text-[#e74c3c]">
                For non-technical users:
              </span>
              <span className="text-white">
                {" "}
                Red markers on the charts indicate potential pricing anomalies
                that deserve attention. Explore the data by interacting with the
                visualization tools below.
              </span>
            </p>

            <Button
              className="bg-[#3498db] hover:bg-[#2980b9] text-white w-full sm:w-auto"
              onClick={scrollToVisualization}
            >
              Explore Visualizations
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
