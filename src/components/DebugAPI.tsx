import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DebugAPI = () => {
  const [testResult, setTestResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const testAPI = async (endpoint: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: "Test tweet about debugging",
          length: 100,
        }),
      });

      const data = await response.json();
      setTestResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setTestResult(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testSimple = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/.netlify/functions/test");
      const data = await response.json();
      setTestResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setTestResult(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const checkEnvironment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/.netlify/functions/check-env");
      const data = await response.json();
      setTestResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setTestResult(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>API Debug</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={() => testSimple()} disabled={isLoading}>
              Test Simple Function
            </Button>
            <Button onClick={() => checkEnvironment()} disabled={isLoading}>
              Check Environment
            </Button>
            <Button onClick={() => testAPI("/.netlify/functions/generate-tweet")} disabled={isLoading}>
              Test Generate Tweet
            </Button>
          </div>
          
          {testResult && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Result:</h3>
              <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto">
                {testResult}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DebugAPI; 