import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Check, AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function Debug() {
  const [clickCount, setClickCount] = useState(0);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testBasicClick = () => {
    setClickCount(prev => prev + 1);
    addResult("Basic button click works!");
  };

  const testAlert = () => {
    alert("Alert test works!");
    addResult("Alert dialog works!");
  };

  const testConsole = () => {
    console.log("Console log test from debug page");
    addResult("Console log test executed");
  };

  const testNavigation = () => {
    addResult("Navigation test starting...");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="flex items-center text-primary hover:text-blue-700 mb-4">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-dark dark:text-white">Button Debug Page</h1>
          <p className="text-secondary dark:text-gray-300 mt-2">
            Testing if JavaScript interactions work properly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Test Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Interaction Tests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Button 
                  onClick={testBasicClick}
                  className="w-full"
                  data-testid="button-basic-test"
                >
                  Basic Click Test (Count: {clickCount})
                </Button>
              </div>

              <div>
                <Button 
                  onClick={testAlert}
                  variant="outline"
                  className="w-full"
                  data-testid="button-alert-test"
                >
                  Alert Test
                </Button>
              </div>

              <div>
                <Button 
                  onClick={testConsole}
                  variant="secondary"
                  className="w-full"
                  data-testid="button-console-test"
                >
                  Console Log Test
                </Button>
              </div>

              <div>
                <Button 
                  onClick={testNavigation}
                  variant="destructive"
                  className="w-full"
                  data-testid="button-navigation-test"
                >
                  Navigation Test (Goes to Home)
                </Button>
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm text-secondary dark:text-gray-300 mb-2">
                  Quick Status Check:
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-1" />
                    React: Working
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-1" />
                    Vite: Hot reload active
                  </div>
                  <div className="flex items-center">
                    {clickCount > 0 ? (
                      <Check className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-500 mr-1" />
                    )}
                    Clicks: {clickCount > 0 ? 'Working' : 'Not tested'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Results */}
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-64 overflow-y-auto">
                {testResults.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No tests run yet. Click the buttons to test functionality.
                  </p>
                ) : (
                  <div className="space-y-1">
                    {testResults.map((result, index) => (
                      <div key={index} className="text-sm text-dark dark:text-white font-mono">
                        {result}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button 
                onClick={() => setTestResults([])}
                variant="outline"
                size="sm"
                className="mt-4"
                data-testid="button-clear-results"
              >
                Clear Results
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="font-semibold text-dark dark:text-white mb-2">Debug Instructions:</h3>
          <ol className="text-sm text-secondary dark:text-gray-300 space-y-1">
            <li>1. Try clicking each button above</li>
            <li>2. Check if the click count increases</li>
            <li>3. See if alerts appear</li>
            <li>4. Open browser console (F12) to check for errors</li>
            <li>5. Test navigation back to home page</li>
          </ol>
        </div>
      </div>
    </div>
  );
}