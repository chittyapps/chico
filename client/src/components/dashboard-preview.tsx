import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Home, Bell, Mail, Clock, BarChart3, Building } from "lucide-react";

const mockStats = [
  { label: "New Leads Today", value: "12", icon: Mail, color: "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400" },
  { label: "Avg Response Time", value: "2.3 min", icon: Clock, color: "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400" },
  { label: "Conversion Rate", value: "24%", icon: BarChart3, color: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400" },
  { label: "Properties", value: "8", icon: Building, color: "bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400" }
];

const mockLeads = [
  { 
    name: "Sarah Miller", 
    phone: "(555) 123-4567", 
    property: "Oak Street Apt", 
    category: "Rental Inquiry", 
    status: "Responded", 
    responseTime: "1.2 min",
    categoryColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    statusColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    initials: "SM",
    avatarColor: "bg-primary"
  },
  { 
    name: "Mike Johnson", 
    phone: "(555) 987-6543", 
    property: "Elm Street Units", 
    category: "Maintenance", 
    status: "In Progress", 
    responseTime: "0.8 min",
    categoryColor: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    statusColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    initials: "MJ",
    avatarColor: "bg-accent"
  },
  { 
    name: "Lisa Kim", 
    phone: "(555) 456-7890", 
    property: "Pine Avenue House", 
    category: "Viewing Request", 
    status: "Scheduled", 
    responseTime: "3.1 min",
    categoryColor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    statusColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    initials: "LK",
    avatarColor: "bg-purple-500"
  }
];

export default function DashboardPreview() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            Simple Dashboard for Busy Landlords
          </h2>
          <p className="mt-4 text-xl text-secondary dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to manage leads and communications in one clean interface.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden" data-testid="dashboard-preview">
          {/* Dashboard Header */}
          <div className="bg-dark dark:bg-gray-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Home className="text-white text-xl mr-3" />
              <span className="text-white font-semibold">ChiCo Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white">
                <Bell className="w-5 h-5" />
              </button>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-white text-sm font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {mockStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className={stat.color}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium" data-testid={`text-stat-label-${index}`}>{stat.label}</p>
                          <p className="text-2xl font-bold" data-testid={`text-stat-value-${index}`}>{stat.value}</p>
                        </div>
                        <Icon className="text-xl" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Leads Table */}
            <Card className="border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-dark dark:text-white">Recent Leads</h3>
              </div>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  {/* Table Header */}
                  <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div>Contact</div>
                    <div>Property</div>
                    <div>Type</div>
                    <div>Status</div>
                    <div>Response Time</div>
                  </div>
                  
                  {/* Table Body */}
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockLeads.map((lead, index) => (
                      <div key={index} className="grid grid-cols-5 gap-4 px-6 py-4" data-testid={`preview-lead-${index}`}>
                        <div className="flex items-center">
                          <Avatar className={`w-8 h-8 mr-3 ${lead.avatarColor}`}>
                            <AvatarFallback className="text-white text-sm font-semibold">
                              {lead.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium text-dark dark:text-white" data-testid={`text-preview-lead-name-${index}`}>
                              {lead.name}
                            </div>
                            <div className="text-sm text-secondary dark:text-gray-400" data-testid={`text-preview-lead-phone-${index}`}>
                              {lead.phone}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-dark dark:text-white" data-testid={`text-preview-lead-property-${index}`}>
                          {lead.property}
                        </div>
                        <div>
                          <Badge className={lead.categoryColor} data-testid={`badge-preview-lead-category-${index}`}>
                            {lead.category}
                          </Badge>
                        </div>
                        <div>
                          <Badge className={lead.statusColor} data-testid={`badge-preview-lead-status-${index}`}>
                            {lead.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-secondary dark:text-gray-400" data-testid={`text-preview-lead-response-time-${index}`}>
                          {lead.responseTime}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
