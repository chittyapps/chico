const steps = [
  {
    number: "1",
    title: "Add Your Properties",
    description: "Simply enter your property addresses and tenant contact information. Takes less than 5 minutes per property.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    alt: "Small landlord managing properties on laptop",
    bgColor: "bg-primary"
  },
  {
    number: "2",
    title: "Leads Start Coming In",
    description: "When someone texts about your rental, ChiCo instantly categorizes the lead and sends an appropriate response.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    alt: "Rental property maintenance worker",
    bgColor: "bg-accent"
  },
  {
    number: "3",
    title: "Track & Convert",
    description: "Monitor response times, follow up automatically, and convert more leads into signed leases.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    alt: "Modern apartment building entrance",
    bgColor: "bg-blue-500"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            How ChiCo Works
          </h2>
          <p className="mt-4 text-xl text-secondary dark:text-gray-300 max-w-3xl mx-auto">
            Set up in minutes, not hours. Start automating your rental leads today.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="text-center" data-testid={`step-${index + 1}`}>
                <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <span className="text-white text-xl font-bold">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-dark dark:text-white mb-4" data-testid={`text-step-title-${index + 1}`}>
                  {step.title}
                </h3>
                <p className="text-secondary dark:text-gray-300 leading-relaxed mb-6" data-testid={`text-step-description-${index + 1}`}>
                  {step.description}
                </p>
                <img 
                  src={step.image} 
                  alt={step.alt}
                  className="rounded-lg shadow-md w-full"
                  data-testid={`img-step-${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
