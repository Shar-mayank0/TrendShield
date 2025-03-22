import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Linkedin, Send, Twitter, Github } from "lucide-react";


export default function FooterSection(){
 

  // Footer policies
  const policies = [
    { title: "Privacy Policy", href: "#" },
    { title: "Terms of Service", href: "#" },
    { title: "Cookie Policy", href: "#" },
  ];

  return (
    <footer className="w-full bg-neutral-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="space-y-6">
            <h2 className="font-bold text-2xl text-[#3498db] font-['Open_Sans-Bold'  ] leading-8">
              TrendShield
            </h2>
            <p className="text-gray-400 text-base font-['Open_Sans-Regular'  ] leading-6">
              Advanced ML-powered platform for detecting and
              <br />
              preventing malicious pricing activities in real-time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#3498db]">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#3498db]">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#3498db]">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#3498db]">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#3498db]">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Subscribe column */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-white font-['Roboto-Bold'  ] leading-7">
              Subscribe
            </h3>
            <p className="text-gray-400 text-base font-['Open_Sans-Regular'  ] leading-6">
              Stay updated with our latest features and
              <br />
              releases
            </p>

            <div className="flex">
              <Input
                type="email"
                placeholder="Your email address"
                className="rounded-r-none bg-neutral-800 border-neutral-700 text-gray-400 font-['Open_Sans-Regular'  ]"
              />
              <Button
                type="submit"
                className="rounded-l-none bg-[#3498db] hover:bg-[#2980b9] px-4"
              >
                <Send size={20} />
              </Button>
            </div>

            <div className="pt-4">
              <h4 className="font-bold text-sm text-white font-['Roboto-Bold'  ] leading-5 mb-2">
                Contact Us
              </h4>
              <p className="text-gray-400 text-sm font-['Open_Sans-Regular'  ] leading-5">
                support@trendshield.in
                <br />
                +91 (800) 123-4567
              </p>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-12">
          <Separator className="bg-neutral-800" />
          <div className="flex flex-col md:flex-row justify-between items-center pt-6">
            <p className="text-gray-500 text-sm font-['Open_Sans-Regular'  ] leading-5">
              © 2023 TrendShield Technologies Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {policies.map((policy, index) => (
                <a
                  key={index}
                  href={policy.href}
                  className="text-gray-500 hover:text-gray-400 text-sm font-['Open_Sans-Regular'  ] leading-5"
                >
                  {policy.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
