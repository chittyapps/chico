import { Button } from "@/components/ui/button";
import { Check, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <h1 className="text-4xl font-bold text-dark dark:text-white sm:text-5xl lg:text-6xl leading-tight">
              Stop Losing Tenants to <span className="text-primary">Slow Responses</span>
            </h1>
            <p className="mt-6 text-xl text-secondary dark:text-gray-300 leading-relaxed">
              Simple SMS automation for individual landlords. Respond to rental inquiries instantly, even when you're at your day job. No complex setup, no enterprise features you don't need.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary text-white hover:bg-blue-700 dark:bg-primary dark:hover:bg-blue-600 px-8 py-4 text-lg"
                data-testid="button-start-trial-hero"
              >
                Start 14-Day Free Trial
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-300 dark:border-gray-600 text-dark dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 text-lg"
                onClick={() => window.location.href = '/demo'}
                data-testid="button-watch-demo"
              >
                <Play className="w-4 h-4 mr-2" />
                Try Live Demo
              </Button>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-secondary dark:text-gray-400">
              <div className="flex items-center">
                <Check className="text-accent w-4 h-4 mr-2" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center">
                <Check className="text-accent w-4 h-4 mr-2" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center">
                <Check className="text-accent w-4 h-4 mr-2" />
                <span>5-minute setup</span>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1626&h=1000" 
              alt="Property management dashboard showing lead automation in action" 
              className="rounded-xl shadow-2xl w-full"
              data-testid="img-hero-dashboard"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
