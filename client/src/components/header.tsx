import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#how-it-works", label: "How It Works" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center" data-testid="link-home">
            <Home className="text-primary text-2xl mr-3" />
            <span className="text-xl font-bold text-dark dark:text-white">ChiCo</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-secondary hover:text-dark dark:text-gray-300 dark:hover:text-white transition-colors"
                data-testid={`button-nav-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                {item.label}
              </button>
            ))}
            <Button variant="ghost" className="text-secondary hover:text-dark dark:text-gray-300 dark:hover:text-white" data-testid="button-login">
              Login
            </Button>
            <Button className="bg-primary text-white hover:bg-blue-700 dark:bg-primary dark:hover:bg-blue-600" data-testid="button-start-trial">
              Start Free Trial
            </Button>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" data-testid="button-mobile-menu">
                  <Menu className="text-xl" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-6">
                  {navigationItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className="text-left py-2 text-secondary hover:text-dark dark:text-gray-300 dark:hover:text-white transition-colors"
                      data-testid={`button-mobile-nav-${item.label.toLowerCase().replace(' ', '-')}`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <Button variant="ghost" className="justify-start text-secondary hover:text-dark dark:text-gray-300 dark:hover:text-white" data-testid="button-mobile-login">
                    Login
                  </Button>
                  <Button className="bg-primary text-white hover:bg-blue-700 dark:bg-primary dark:hover:bg-blue-600" data-testid="button-mobile-start-trial">
                    Start Free Trial
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
