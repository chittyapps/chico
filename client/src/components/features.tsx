import { MessageSquare, Users, DoorOpen, BarChart3, Bot, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: MessageSquare,
    title: "Instant SMS Responses",
    description: "Reply to rental inquiries within 2 minutes, even when you're busy. Simple, effective automation that just works.",
    color: "text-primary bg-primary/10"
  },
  {
    icon: DoorOpen,
    title: "Visitor Text Entry",
    description: "Visitors text to enter your building. Tenants approve with YES/NO. No more missed deliveries or lost packages.",
    color: "text-blue-500 bg-blue-500/10"
  },
  {
    icon: BarChart3,
    title: "Response Time Tracking",
    description: "See how fast you're responding to leads. Track what's working so you can lease units faster.",
    color: "text-amber-500 bg-amber-500/10"
  },
  {
    icon: Bot,
    title: "Basic Lead Sorting",
    description: "Automatically organize rental inquiries, maintenance requests, and general questions into separate categories.",
    color: "text-purple-500 bg-purple-500/10"
  },
  {
    icon: RefreshCw,
    title: "Simple Follow-ups",
    description: "Send follow-up messages to interested prospects. Schedule viewings and convert more leads to leases.",
    color: "text-green-500 bg-green-500/10"
  },
  {
    icon: Users,
    title: "One-Person Friendly",
    description: "Built for individual landlords, not property management companies. Easy setup, no training required.",
    color: "text-accent bg-accent/10"
  }
];

export default function Features() {
  return (
    <section id="features" className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            Just the Essentials - No Bloat
          </h2>
          <p className="mt-4 text-xl text-secondary dark:text-gray-300 max-w-3xl mx-auto">
            Built specifically for individual landlords who need fast responses without complex property management software.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="bg-white dark:bg-gray-900 hover:shadow-md transition-shadow"
                data-testid={`card-feature-${index}`}
              >
                <CardContent className="p-8">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${feature.color}`}>
                    <Icon className="text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark dark:text-white mb-4" data-testid={`text-feature-title-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="text-secondary dark:text-gray-300 leading-relaxed" data-testid={`text-feature-description-${index}`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
