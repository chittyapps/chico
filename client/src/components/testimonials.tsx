import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Carlos Martinez",
    title: "3 rental units, Orlando",
    initials: "CM",
    color: "bg-primary",
    quote: "I work construction during the day and was missing calls from potential tenants. Now ChiCo responds instantly even when I'm on a job site. Filled my vacant unit in 2 weeks instead of 2 months."
  },
  {
    name: "Sarah Chen", 
    title: "4 properties, Denver",
    initials: "SC",
    color: "bg-accent",
    quote: "Finally, something simple that just works. No confusing dashboards or features I don't need. Just fast responses to people who want to rent my units."
  },
  {
    name: "Mike Johnson",
    title: "2 duplexes, Nashville", 
    initials: "MJ",
    color: "bg-blue-500",
    quote: "Paid for itself with the first lease. Instead of losing prospects to landlords who respond faster, I'm the one getting them now. Setup took 10 minutes."
  }
];

export default function Testimonials() {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            What Small Landlords Say
          </h2>
          <p className="mt-4 text-xl text-secondary dark:text-gray-300">
            Real results from property owners like you
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-50 dark:bg-gray-800" data-testid={`testimonial-${index}`}>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Avatar className={`w-12 h-12 mr-4 ${testimonial.color}`}>
                    <AvatarFallback className="text-white font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-dark dark:text-white" data-testid={`text-testimonial-name-${index}`}>
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-secondary dark:text-gray-400" data-testid={`text-testimonial-title-${index}`}>
                      {testimonial.title}
                    </p>
                  </div>
                </div>
                <p className="text-secondary dark:text-gray-300 leading-relaxed" data-testid={`text-testimonial-quote-${index}`}>
                  "{testimonial.quote}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
