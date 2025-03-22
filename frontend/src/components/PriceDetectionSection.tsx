import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function PriceDetectionSection(){

  return (

    <section className="w-full bg-neutral-900 text-white ">
      {/* Navigation Bar */}
      <header className="w-full border-b border-gray-800 py-5 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-start gap-4">
              {/* Logo placeholder */}
              <img src="" alt="Logo" className="w-10 h-10" />

              {/* Search field */}
              <div className="flex items-center w-[303px] bg-[#fcfcfc05] rounded-[10px] border border-solid border-gray-700 px-3.5 py-2.5">
                <Search className="w-5 h-5 text-gray-400" />
                <Input
                  className="border-0 bg-transparent text-xs text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 h-5 px-2"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button className="bg-[#3498db] hover:bg-[#2980b9] text-white">
            Extension coming soon!!
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Heading */}
        <h1 className="text-6xl font-bold font-['Roboto-Bold'  ] leading-[60px] mb-4">
          <span className="text-[#3498db]">Malicious Price</span>
          <span className="text-white"> Detection Dashboard</span>
        </h1>

        {/* Subtitle */}
        <p className="text-2xl font-normal font-['Open_Sans-Regular'  ] leading-8 mb-12">
          Visualizing ML-driven insights to protect businesses from
          <br />
          pricing anomalies and market manipulation.
        </p>

        {/* Info Card */}
        <Card className="w-full max-w-[768px] bg-neutral-800 border-0 rounded-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-[#3498db] mb-4 font-['Roboto-Bold'  ]">
              Understanding Malicious Pricing
            </h2>

            <p className="text-base text-white mb-6 font-['Open_Sans-Regular'  ] leading-6">
              Our dashboard uses advanced machine learning algorithms (DBSCAN
              and K-Means) to identify
              <br />
              suspicious price patterns that may indicate market manipulation or
              errors.
            </p>

            <p className="text-base mb-6 font-['Open_Sans-Regular'  ] leading-6">
              <span className="font-bold text-[#e74c3c]">
                For non-technical users:
              </span>
              <span className="text-white">
                {" "}
                Red markers on the charts indicate potential pricing anomalies
                that
                <br />
                deserve attention. Explore the data by interacting with the
                visualization tools below.
              </span>
            </p>

            <Button className="bg-[#3498db] hover:bg-[#2980b9] text-white">
              Explore Visualizations
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
