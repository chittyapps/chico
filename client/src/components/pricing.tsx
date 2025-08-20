import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Essential",
    description: "Perfect for individual landlords",
    price: "$59",
    period: "/month",
    features: [
      "Up to 5 properties",
      "Instant SMS responses",
      "Lead categorization", 
      "Response time tracking",
      "Email support",
      "Simple setup (5 minutes)"
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Professional",
    description: "For small property managers", 
    price: "$99",
    period: "/month",
    features: [
      "Up to 15 properties",
      "SMS + visitor entry system",
      "Lead nurturing follow-ups",
      "Tenant communication tools", 
      "Response analytics",
      "Phone support"
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "default" as const,
    popular: true
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-secondary dark:text-gray-300 max-w-3xl mx-auto">
            Start with a free trial. No setup fees, no hidden costs. Cancel anytime.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative ${
                plan.popular 
                  ? 'bg-primary border-primary dark:bg-primary dark:border-primary' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary'
              } transition-colors`}
              data-testid={`card-plan-${plan.name.toLowerCase()}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-accent text-white">Most Popular</Badge>
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className={`text-2xl font-bold ${plan.popular ? 'text-white' : 'text-dark dark:text-white'}`} data-testid={`text-plan-name-${index}`}>
                    {plan.name}
                  </h3>
                  <p className={`mt-2 ${plan.popular ? 'text-blue-100' : 'text-secondary dark:text-gray-300'}`} data-testid={`text-plan-description-${index}`}>
                    {plan.description}
                  </p>
                  <div className="mt-6">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-dark dark:text-white'}`} data-testid={`text-plan-price-${index}`}>
                      {plan.price}
                    </span>
                    <span className={`${plan.popular ? 'text-blue-100' : 'text-secondary dark:text-gray-400'}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center" data-testid={`feature-${plan.name.toLowerCase()}-${featureIndex}`}>
                      <Check className={`mr-3 ${plan.popular ? 'text-white' : 'text-accent'}`} />
                      <span className={`${plan.popular ? 'text-white' : 'text-dark dark:text-white'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.popular ? "secondary" : "outline"}
                  className={`w-full mt-8 ${
                    plan.popular 
                      ? 'bg-white text-primary hover:bg-gray-50' 
                      : 'bg-gray-100 dark:bg-gray-700 text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  data-testid={`button-plan-${plan.name.toLowerCase()}`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-secondary dark:text-gray-400">
            Need more than 15 properties? <button className="text-primary hover:underline" data-testid="button-enterprise-contact">Contact us</button> for custom pricing.
          </p>
        </div>
      </div>
    </section>
  );
}
