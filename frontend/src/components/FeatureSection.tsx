import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function FeaturesSection() {
  // Data for insights table
  const insightData = [
    {
      date: "Aug 12, 2023",
      eventType: "Price Spike",
      eventColor: "red",
      confidence: "96.2%",
      impact: "High",
    },
    {
      date: "Aug 10, 2023",
      eventType: "Unusual Pattern",
      eventColor: "yellow",
      confidence: "88.7%",
      impact: "Medium",
    },
    {
      date: "Aug 08, 2023",
      eventType: "Price Drop",
      eventColor: "red",
      confidence: "97.5%",
      impact: "High",
    },
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto max-w-[1504px]">
        <Card className="mb-8 shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a] rounded-lg overflow-hidden">
          <CardHeader className="pb-0 pt-6 px-6">
            <CardTitle className="text-xl text-[#2c3e50] font-bold font-['Roboto-Bold'  ]">
              Recent Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-4">
            <div className="overflow-auto max-h-[199px]">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-normal text-xs tracking-[0.60px] text-gray-500 font-['Open_Sans-Regular'  ]">
                      DATE
                    </TableHead>
                    <TableHead className="font-normal text-xs tracking-[0.60px] text-gray-500 font-['Open_Sans-Regular'  ]">
                      EVENT TYPE
                    </TableHead>
                    <TableHead className="font-normal text-xs tracking-[0.60px] text-gray-500 font-['Open_Sans-Regular'  ]">
                      CONFIDENCE
                    </TableHead>
                    <TableHead className="font-normal text-xs tracking-[0.60px] text-gray-500 font-['Open_Sans-Regular'  ]">
                      IMPACT
                    </TableHead>
                    <TableHead className="font-normal text-xs tracking-[0.60px] text-gray-500 font-['Open_Sans-Regular'  ]">
                      ACTION
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {insightData.map((insight, index) => (
                    <TableRow key={index} className="border-t border-solid">
                      <TableCell className="font-normal text-sm text-gray-900 font-['Open_Sans-Regular'  ]">
                        {insight.date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`bg-${insight.eventColor}-100 text-${insight.eventColor}-800 border-0 rounded-full px-2 py-0.5 font-bold text-xs font-['Open_Sans-Bold'  ]`}
                        >
                          {insight.eventType}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-normal text-sm text-gray-500 font-['Open_Sans-Regular'  ]">
                        {insight.confidence}
                      </TableCell>
                      <TableCell className="font-normal text-sm text-gray-500 font-['Open_Sans-Regular'  ]">
                        {insight.impact}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-sm text-blue-600 font-['Open_Sans-Regular'  ]"
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
