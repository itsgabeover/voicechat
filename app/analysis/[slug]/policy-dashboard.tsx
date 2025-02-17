import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { AnalysisResult } from "@/types";



const PolicyDashboard: React.FC<{ analysis: AnalysisResult }> = ({ analysis }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Policy Analysis Dashboard</h1>

      {/* Policy Details */}
      <Card>
        <CardHeader>
          <CardTitle>Policy Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Product Name:</strong> {analysis.policyDetails.productName}
          </p>
          <p>
            <strong>Issuer:</strong> {analysis.policyDetails.issuer}
          </p>
          <p>
            <strong>Product Type:</strong> {analysis.policyDetails.productType}
          </p>
          <p>
            <strong>Death Benefit:</strong> $
            {analysis.policyDetails.deathBenefit.toLocaleString()}
          </p>
          <p>
            <strong>Annual Premium:</strong> $
            {analysis.policyDetails.annualPremium.toLocaleString()}
          </p>
          <p>
            <strong>Riders:</strong> {analysis.policyDetails.riders.join(", ")}
          </p>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {/* Key Categories */}
      <Tabs defaultValue={analysis.keyCategories[0].title} className="w-full">
        {/* Ensure tabs are above content with margin-bottom */}
        <div className="sticky top-0 bg-white z-10 pb-2">
          <TabsList className="flex flex-wrap gap-2 overflow-auto">
            {analysis.keyCategories.map((category) => (
              <TabsTrigger key={category.title} value={category.title}>
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Ensure content is pushed below the tabs */}
        <div className="mt-6">
          {analysis.keyCategories.map((category) => (
            <TabsContent
              key={category.title}
              value={category.title}
              className="mt-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {category.quotes.map((quote, index) => (
                    <p key={index} className="mb-2">
                      "{quote}"
                    </p>
                  ))}
                  <p>
                    <strong>Hidden Gem:</strong> {category.hiddengem}
                  </p>
                  <p>
                    <strong>Blind Spot:</strong> {category.blindspot}
                  </p>
                  <p>
                    <strong>Red Flag:</strong> {category.redflag}
                  </p>
                  <p>
                    <strong>Client Implications:</strong>{" "}
                    {category.clientImplications}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </div>
      </Tabs>

      <Separator className="my-6" />

      {/* Standard Time Points */}
      <Card>
        <CardHeader>
          <CardTitle>Standard Time Points</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time Point</TableHead>
                <TableHead>Death Benefit</TableHead>
                <TableHead>Cash Value</TableHead>
                <TableHead>Net Surrender Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analysis.standardTimePoints.map((point) => (
                <TableRow key={point.timePoint}>
                  <TableCell>{point.timePoint}</TableCell>
                  <TableCell>
                    ${point.values.deathBenefitAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    ${point.values.cashValue.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    ${point.values.netSurrenderValue.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {/* Final Thoughts */}
      <Card>
        <CardHeader>
          <CardTitle>Final Thoughts</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{analysis.finalThoughts}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PolicyDashboard;
