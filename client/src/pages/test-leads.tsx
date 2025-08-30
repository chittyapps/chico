import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Home, MessageSquare, Send } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";

interface TestLead {
  phone: string;
  message: string;
  propertyId: string;
}

export default function TestLeads() {
  const [phone, setPhone] = useState("+1555123456");
  const [message, setMessage] = useState("");
  const [propertyId] = useState("test-property-id");
  const [lastResult, setLastResult] = useState<any>(null);

  const createLeadMutation = useMutation({
    mutationFn: async (leadData: TestLead) => {
      return await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      }).then(res => res.json());
    },
    onSuccess: (data) => {
      setLastResult(data);
    },
  });

  const testMessages = [
    "Hi, is the 2 bedroom apartment still available?",
    "My toilet is broken and won't stop running. Can someone fix it?",
    "Can I schedule a viewing for this weekend?",
    "I'm here for unit 101",
    "When is rent due this month?",
    "The heating isn't working in my apartment",
    "Looking for a place to rent, budget around $1200",
    "Hi Sarah, it's Mike - visiting unit 205"
  ];

  const handleSubmit = (testMessage?: string) => {
    const messageToSend = testMessage || message;
    if (messageToSend.trim()) {
      createLeadMutation.mutate({
        phone,
        message: messageToSend,
        propertyId
      });
      if (!testMessage) {
        setMessage("");
      }
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'rental_inquiry':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'maintenance':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'viewing_request':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'visitor_entry':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'payment':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getUrgencyColor = (urgency: number) => {
    if (urgency >= 4) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    if (urgency >= 3) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center" data-testid="link-home">
              <Home className="text-primary text-2xl mr-3" />
              <span className="text-xl font-bold text-dark dark:text-white">ChiCo - Lead Testing</span>
            </Link>
            <Link href="/">
              <Button variant="ghost" data-testid="button-back-home">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            Test Lead Categorization
          </h1>
          <p className="mt-4 text-xl text-secondary dark:text-gray-300">
            See how ChiCo automatically categorizes different types of messages
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Side */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 text-blue-500" />
                Send Test Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  data-testid="input-phone"
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  data-testid="input-message"
                />
              </div>
              
              <Button 
                onClick={() => handleSubmit()}
                className="w-full"
                disabled={!message.trim() || createLeadMutation.isPending}
                data-testid="button-submit"
              >
                <Send className="w-4 h-4 mr-2" />
                {createLeadMutation.isPending ? "Processing..." : "Test Categorization"}
              </Button>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
                  Quick Test Messages
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {testMessages.map((testMsg, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-left justify-start h-auto p-3 text-sm"
                      onClick={() => handleSubmit(testMsg)}
                      disabled={createLeadMutation.isPending}
                      data-testid={`button-test-${index}`}
                    >
                      "{testMsg}"
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Side */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 text-green-500" />
                Categorization Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              {lastResult ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="font-medium text-dark dark:text-white mb-2">Original Message:</h3>
                    <p className="text-secondary dark:text-gray-300 italic">"{lastResult.message}"</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-dark dark:text-white">Category:</span>
                      <Badge className={getCategoryColor(lastResult.category)} data-testid="result-category">
                        {lastResult.category.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-dark dark:text-white">Urgency:</span>
                      <Badge className={getUrgencyColor(lastResult.urgency)} data-testid="result-urgency">
                        {lastResult.urgency}/5
                      </Badge>
                    </div>

                    <div>
                      <span className="text-dark dark:text-white font-medium">Auto-Response:</span>
                      <div className="mt-2 bg-blue-50 dark:bg-blue-900 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                        <p className="text-blue-700 dark:text-blue-300 text-sm" data-testid="result-response">
                          {lastResult.metadata?.aiCategorization?.suggestedResponse}
                        </p>
                      </div>
                    </div>

                    {lastResult.metadata?.aiCategorization?.extractedInfo && Object.keys(lastResult.metadata.aiCategorization.extractedInfo).length > 0 && (
                      <div>
                        <span className="text-dark dark:text-white font-medium">Extracted Info:</span>
                        <div className="mt-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          {Object.entries(lastResult.metadata.aiCategorization.extractedInfo).map(([key, value]) => 
                            value ? (
                              <div key={key} className="flex justify-between text-sm">
                                <span className="text-secondary dark:text-gray-300">{key}:</span>
                                <span className="text-dark dark:text-white" data-testid={`result-info-${key}`}>{String(value)}</span>
                              </div>
                            ) : null
                          )}
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-secondary dark:text-gray-400 pt-2 border-t">
                      Response Time: {lastResult.responseTime || 0} minutes
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No messages tested yet</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Send a message to see how ChiCo categorizes it
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-2">
              Smart Categorization Without API Costs
            </h3>
            <p className="text-secondary dark:text-gray-300">
              ChiCo uses intelligent keyword matching to categorize leads instantly. No expensive AI API calls required - 
              this keeps your costs low while still providing smart automation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}