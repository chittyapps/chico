import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ROICalculator() {
  const [monthlyLeads, setMonthlyLeads] = useState(20);
  const [averageRent, setAverageRent] = useState(1200);
  const [currentResponseTime, setCurrentResponseTime] = useState(4);

  const calculateROI = useCallback(() => {
    // Conservative estimate: 20% improvement in conversion with faster response times
    const improvementRate = 0.20;
    const currentConversionRate = 0.12; // Assume 12% baseline conversion
    const improvedConversionRate = currentConversionRate * (1 + improvementRate);
    
    const additionalLeases = monthlyLeads * (improvedConversionRate - currentConversionRate);
    const additionalRevenue = additionalLeases * averageRent;
    const chicoCost = 99; // Professional plan cost (reality-checked pricing)
    const monthlyProfit = additionalRevenue - chicoCost;
    const roiPercentage = chicoCost > 0 ? (monthlyProfit / chicoCost) * 100 : 0;

    return {
      additionalLeases: Math.round(additionalLeases * 10) / 10,
      additionalRevenue: Math.round(additionalRevenue),
      monthlyProfit: Math.round(monthlyProfit),
      roiPercentage: Math.round(roiPercentage)
    };
  }, [monthlyLeads, averageRent, currentResponseTime]);

  const results = calculateROI();

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            Calculate Your ROI
          </h2>
          <p className="mt-4 text-xl text-secondary dark:text-gray-300">
            See how much ChiCo can save you by preventing missed leads
          </p>
        </div>

        <Card className="bg-white dark:bg-gray-900 shadow-lg">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-dark dark:text-white mb-6">Your Current Situation</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="monthly-leads" className="block text-sm font-medium text-dark dark:text-white mb-2">
                      Monthly leads received
                    </Label>
                    <Input
                      id="monthly-leads"
                      type="number"
                      value={monthlyLeads}
                      onChange={(e) => setMonthlyLeads(Number(e.target.value) || 0)}
                      className="w-full"
                      data-testid="input-monthly-leads"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="average-rent" className="block text-sm font-medium text-dark dark:text-white mb-2">
                      Average rent per unit
                    </Label>
                    <Input
                      id="average-rent"
                      type="number"
                      value={averageRent}
                      onChange={(e) => setAverageRent(Number(e.target.value) || 0)}
                      className="w-full"
                      data-testid="input-average-rent"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="response-time" className="block text-sm font-medium text-dark dark:text-white mb-2">
                      Current response time (hours)
                    </Label>
                    <Input
                      id="response-time"
                      type="number"
                      value={currentResponseTime}
                      onChange={(e) => setCurrentResponseTime(Number(e.target.value) || 0)}
                      className="w-full"
                      data-testid="input-response-time"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-dark dark:text-white mb-6">With ChiCo</h3>
                
                <div className="bg-green-50 dark:bg-green-900 rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-dark dark:text-gray-200">Faster responses improve conversion by:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400" data-testid="text-improvement-rate">+20%</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-dark dark:text-gray-200">Additional leases per month:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400" data-testid="text-additional-leases">
                        {results.additionalLeases}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-dark dark:text-gray-200">Additional monthly revenue:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400" data-testid="text-additional-revenue">
                        ${results.additionalRevenue.toLocaleString()}
                      </span>
                    </div>
                    
                    <hr className="border-green-200 dark:border-green-700" />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-dark dark:text-gray-200">ChiCo cost:</span>
                      <span className="text-dark dark:text-gray-200" data-testid="text-chico-cost">$99</span>
                    </div>
                    
                    <div className="flex justify-between text-lg font-bold text-green-600 dark:text-green-400">
                      <span>Monthly ROI:</span>
                      <span data-testid="text-monthly-roi">{results.roiPercentage.toLocaleString()}%</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-secondary dark:text-gray-400 mt-4">
                  * Based on industry averages. Just one additional lease per month pays for ChiCo for over a year.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
