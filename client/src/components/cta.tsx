import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-primary py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to Stop Missing Leads?
        </h2>
        <p className="mt-6 text-xl text-blue-100 leading-relaxed">
          Join hundreds of small landlords who use ChiCo to respond faster, lease units quicker, and grow their rental business.
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-gray-50 px-8 py-4 text-lg font-semibold"
            data-testid="button-cta-start-trial"
          >
            Start 14-Day Free Trial
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold"
            data-testid="button-cta-schedule-demo"
          >
            Schedule Demo
          </Button>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-center sm:space-x-8 space-y-2 sm:space-y-0 text-blue-100">
          <div className="flex items-center justify-center">
            <Check className="mr-2 w-4 h-4" />
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center justify-center">
            <Check className="mr-2 w-4 h-4" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center justify-center">
            <Check className="mr-2 w-4 h-4" />
            <span>Setup in 5 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
}
