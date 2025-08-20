import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Mail, 
  Clock, 
  TrendingUp, 
  Building, 
  Bell, 
  Home,
  Phone,
  MessageSquare,
  Users,
  Calendar
} from "lucide-react";

export default function Dashboard() {
  // Mock user ID - in real app would come from auth
  const mockUserId = "user-123";

  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/stats?userId=${mockUserId}`);
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    },
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'rental_inquiry':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'maintenance':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'viewing_request':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'visitor_entry':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'contacted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'converted':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Dashboard Header */}
        <div className="bg-dark dark:bg-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Home className="text-white text-xl mr-3" />
            <span className="text-white font-semibold">ChiCo Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary text-white text-sm font-semibold">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="p-6">
          {/* Loading Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                    <Skeleton className="w-5 h-5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Loading Table */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Dashboard Header */}
      <div className="bg-dark dark:bg-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Home className="text-white text-xl mr-3" />
          <span className="text-white font-semibold">ChiCo Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white" data-testid="button-notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-white text-sm font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400" data-testid="text-new-leads-label">New Leads Today</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100" data-testid="text-new-leads-count">
                    {stats?.newLeadsToday || 0}
                  </p>
                </div>
                <Mail className="text-blue-500 text-xl" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400" data-testid="text-response-time-label">Avg Response Time</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100" data-testid="text-response-time-value">
                    {stats?.averageResponseTime || 0} min
                  </p>
                </div>
                <Clock className="text-green-500 text-xl" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-600 dark:text-amber-400" data-testid="text-conversion-rate-label">Conversion Rate</p>
                  <p className="text-2xl font-bold text-amber-900 dark:text-amber-100" data-testid="text-conversion-rate-value">
                    {stats?.conversionRate || 0}%
                  </p>
                </div>
                <TrendingUp className="text-amber-500 text-xl" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400" data-testid="text-properties-label">Properties</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100" data-testid="text-properties-count">
                    {stats?.totalProperties || 0}
                  </p>
                </div>
                <Building className="text-purple-500 text-xl" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-dark dark:text-white">Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.recentLeads?.length > 0 ? (
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  {/* Table Header */}
                  <div className="grid grid-cols-5 gap-4 py-3 px-6 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider rounded-t-lg">
                    <div>Contact</div>
                    <div>Property</div>
                    <div>Type</div>
                    <div>Status</div>
                    <div>Response Time</div>
                  </div>
                  
                  {/* Table Body */}
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {stats.recentLeads.map((lead: any) => (
                      <div key={lead.id} className="grid grid-cols-5 gap-4 py-4 px-6" data-testid={`row-lead-${lead.id}`}>
                        <div className="flex items-center">
                          <Avatar className="w-8 h-8 mr-3">
                            <AvatarFallback className="bg-primary text-white text-sm font-semibold">
                              {getInitials(lead.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium text-dark dark:text-white" data-testid={`text-lead-name-${lead.id}`}>
                              {lead.name || 'Unknown'}
                            </div>
                            <div className="text-sm text-secondary dark:text-gray-400" data-testid={`text-lead-phone-${lead.id}`}>
                              {lead.phone}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-dark dark:text-white" data-testid={`text-lead-property-${lead.id}`}>
                          Property #{lead.propertyId?.slice(-4)}
                        </div>
                        <div>
                          <Badge className={getCategoryColor(lead.category)} data-testid={`badge-lead-category-${lead.id}`}>
                            {lead.category.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                          </Badge>
                        </div>
                        <div>
                          <Badge className={getStatusColor(lead.status)} data-testid={`badge-lead-status-${lead.id}`}>
                            {lead.status.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                          </Badge>
                        </div>
                        <div className="text-sm text-secondary dark:text-gray-400" data-testid={`text-lead-response-time-${lead.id}`}>
                          {lead.responseTime ? `${lead.responseTime} min` : '-'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8" data-testid="empty-leads-state">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No leads yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Leads will appear here once you start receiving inquiries</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button className="flex items-center justify-center space-x-2" data-testid="button-add-property">
            <Building className="w-4 h-4" />
            <span>Add Property</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-center space-x-2" data-testid="button-add-tenant">
            <Users className="w-4 h-4" />
            <span>Add Tenant</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-center space-x-2" data-testid="button-schedule-followup">
            <Calendar className="w-4 h-4" />
            <span>Schedule Follow-up</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
