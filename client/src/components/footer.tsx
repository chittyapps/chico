import { Home } from "lucide-react";

const footerSections = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Integrations", href: "#" }
    ]
  },
  {
    title: "Support", 
    links: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Setup Guide", href: "#" },
      { name: "API Docs", href: "#" }
    ]
  }
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-dark dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Home className="text-primary text-2xl mr-3" />
              <span className="text-xl font-bold text-white">ChiCo</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Lead automation for small landlords. Never miss a rental inquiry again with SMS-based automation that works 24/7.
            </p>
          </div>
          
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4" data-testid={`text-footer-section-${index}`}>{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button 
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                      data-testid={`button-footer-link-${section.title.toLowerCase()}-${linkIndex}`}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400" data-testid="text-copyright">&copy; 2024 ChiCo. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <button className="text-gray-400 hover:text-white transition-colors" data-testid="button-privacy">Privacy</button>
            <button className="text-gray-400 hover:text-white transition-colors" data-testid="button-terms">Terms</button>
            <button className="text-gray-400 hover:text-white transition-colors" data-testid="button-security">Security</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
