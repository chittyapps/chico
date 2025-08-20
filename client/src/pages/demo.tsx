import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Home, MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";
import { Link } from "wouter";

export default function Demo() {
  const [visitorStep, setVisitorStep] = useState(1);
  const [tenantStep, setTenantStep] = useState(1);
  const [visitorName, setVisitorName] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [tenantResponse, setTenantResponse] = useState("");

  const handleVisitorSubmit = () => {
    if (visitorName && unitNumber) {
      setVisitorStep(2);
      setTimeout(() => setTenantStep(2), 1000);
    }
  };

  const handleTenantResponse = (response: string) => {
    setTenantResponse(response);
    setTenantStep(3);
    setTimeout(() => setVisitorStep(3), 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center" data-testid="link-home">
              <Home className="text-primary text-2xl mr-3" />
              <span className="text-xl font-bold text-dark dark:text-white">ChiCo Demo</span>
            </Link>
            <Link href="/">
              <Button variant="ghost" data-testid="button-back-home">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            See How ChiCo Works
          </h1>
          <p className="mt-4 text-xl text-secondary dark:text-gray-300">
            Live demo: Visitor entry system in action
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Visitor Side */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 text-blue-500" />
                Visitor Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {visitorStep === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
                    Step 1: Visitor Arrives
                  </h3>
                  <p className="text-secondary dark:text-gray-300 mb-4">
                    You're visiting a friend at Sunset Apartments. Text ChiCo to request entry.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="visitor-name">Your name</Label>
                      <Input
                        id="visitor-name"
                        placeholder="Enter your name"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        data-testid="input-visitor-name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="unit-number">Unit number</Label>
                      <Input
                        id="unit-number"
                        placeholder="e.g. 101"
                        value={unitNumber}
                        onChange={(e) => setUnitNumber(e.target.value)}
                        data-testid="input-unit-number"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleVisitorSubmit}
                      className="w-full"
                      disabled={!visitorName || !unitNumber}
                      data-testid="button-visitor-submit"
                    >
                      Send Text to ChiCo
                    </Button>
                  </div>
                </div>
              )}

              {visitorStep === 2 && (
                <div>
                  <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
                    Step 2: Waiting for Approval
                  </h3>
                  <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                    <div className="flex items-center mb-2">
                      <Clock className="text-blue-500 mr-2" />
                      <span className="font-medium text-dark dark:text-white">Message Sent</span>
                    </div>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      "Hi, {visitorName} here for unit {unitNumber}"
                    </p>
                  </div>
                  <p className="text-secondary dark:text-gray-300 mt-4">
                    ChiCo instantly notified the tenant. Waiting for their response...
                  </p>
                </div>
              )}

              {visitorStep === 3 && (
                <div>
                  <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
                    Step 3: Response Received
                  </h3>
                  <div className={`rounded-lg p-4 border ${
                    tenantResponse === 'YES' 
                      ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700'
                      : 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700'
                  }`}>
                    <div className="flex items-center mb-2">
                      {tenantResponse === 'YES' ? (
                        <CheckCircle className="text-green-500 mr-2" />
                      ) : (
                        <XCircle className="text-red-500 mr-2" />
                      )}
                      <span className="font-medium text-dark dark:text-white">
                        {tenantResponse === 'YES' ? 'Access Approved!' : 'Access Denied'}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      tenantResponse === 'YES' 
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {tenantResponse === 'YES' 
                        ? '✅ Welcome! You may enter the building.'
                        : '❌ Please contact the tenant directly.'
                      }
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tenant Side */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Home className="mr-2 text-green-500" />
                Tenant Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {tenantStep === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
                    Step 1: Waiting
                  </h3>
                  <p className="text-secondary dark:text-gray-300">
                    You're at home. Waiting for visitor notifications...
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 text-center">
                    <MessageSquare className="text-gray-400 mx-auto mb-2" size={32} />
                    <p className="text-gray-500 dark:text-gray-400">No notifications</p>
                  </div>
                </div>
              )}

              {tenantStep === 2 && (
                <div>
                  <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
                    Step 2: Visitor Request
                  </h3>
                  <div className="bg-amber-50 dark:bg-amber-900 rounded-lg p-4 border border-amber-200 dark:border-amber-700 mb-4">
                    <div className="flex items-center mb-2">
                      <MessageSquare className="text-amber-500 mr-2" />
                      <span className="font-medium text-dark dark:text-white">New Visitor Request</span>
                      <Badge className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100">
                        Just now
                      </Badge>
                    </div>
                    <p className="text-amber-700 dark:text-amber-300 text-sm mb-3">
                      🔔 Visitor request for unit {unitNumber}. {visitorName} is requesting entry.
                    </p>
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      Reply YES to approve, NO to deny, or SAVE to add to trusted list.
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleTenantResponse('YES')}
                      className="bg-green-500 hover:bg-green-600 text-white flex-1"
                      data-testid="button-tenant-yes"
                    >
                      YES
                    </Button>
                    <Button 
                      onClick={() => handleTenantResponse('NO')}
                      variant="destructive"
                      className="flex-1"
                      data-testid="button-tenant-no"
                    >
                      NO
                    </Button>
                    <Button 
                      onClick={() => handleTenantResponse('SAVE')}
                      variant="outline"
                      className="flex-1"
                      data-testid="button-tenant-save"
                    >
                      SAVE
                    </Button>
                  </div>
                </div>
              )}

              {tenantStep === 3 && (
                <div>
                  <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
                    Step 3: Response Sent
                  </h3>
                  <div className={`rounded-lg p-4 border ${
                    tenantResponse === 'YES' 
                      ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700'
                      : 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700'
                  }`}>
                    <div className="flex items-center mb-2">
                      <CheckCircle className="text-green-500 mr-2" />
                      <span className="font-medium text-dark dark:text-white">Response Sent</span>
                    </div>
                    <p className={`text-sm ${
                      tenantResponse === 'YES' 
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      You replied "{tenantResponse}" - visitor has been notified.
                    </p>
                  </div>
                  
                  <Button 
                    onClick={() => {
                      setVisitorStep(1);
                      setTenantStep(1);
                      setVisitorName("");
                      setUnitNumber("");
                      setTenantResponse("");
                    }}
                    variant="outline"
                    className="w-full mt-4"
                    data-testid="button-try-again"
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-2">
              That's It - Simple & Effective
            </h3>
            <p className="text-secondary dark:text-gray-300">
              No app downloads, no complicated setup. Visitors text, tenants approve with YES/NO, done. 
              This same simple approach works for rental inquiries, maintenance requests, and follow-ups.
            </p>
            <div className="mt-6">
              <Link href="/#pricing">
                <Button className="bg-primary hover:bg-blue-700 text-white" data-testid="button-demo-cta">
                  Start Your Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}