
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface AnalyticsData {
  date: string;
  comments_sent: number;
  connections_sent: number;
  connections_accepted: number;
  engagement_rate: number;
}

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Mock data for demo since tables are not ready yet
      const mockData: AnalyticsData[] = [
        { date: '2024-01-01', comments_sent: 25, connections_sent: 10, connections_accepted: 7, engagement_rate: 15.5 },
        { date: '2024-01-02', comments_sent: 30, connections_sent: 12, connections_accepted: 9, engagement_rate: 18.2 },
        { date: '2024-01-03', comments_sent: 22, connections_sent: 8, connections_accepted: 6, engagement_rate: 12.8 },
        { date: '2024-01-04', comments_sent: 35, connections_sent: 15, connections_accepted: 11, engagement_rate: 22.1 },
        { date: '2024-01-05', comments_sent: 28, connections_sent: 11, connections_accepted: 8, engagement_rate: 16.7 },
      ];
      
      setAnalyticsData(mockData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalStats = analyticsData.reduce(
    (acc, day) => ({
      comments: acc.comments + day.comments_sent,
      connections: acc.connections + day.connections_sent,
      accepted: acc.accepted + day.connections_accepted,
    }),
    { comments: 0, connections: 0, accepted: 0 }
  );

  const averageEngagement = analyticsData.length > 0 
    ? analyticsData.reduce((acc, day) => acc + day.engagement_rate, 0) / analyticsData.length 
    : 0;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Analytics & Performance</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.comments}</div>
            <p className="text-sm text-green-600">+12% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Connections Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.connections}</div>
            <p className="text-sm text-blue-600">+8% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Connections Accepted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.accepted}</div>
            <p className="text-sm text-green-600">{((totalStats.accepted / totalStats.connections) * 100).toFixed(1)}% acceptance rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Engagement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageEngagement.toFixed(1)}%</div>
            <p className="text-sm text-purple-600">+5% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Daily Engagement Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="comments_sent" stroke="#8884d8" name="Comments" />
                <Line type="monotone" dataKey="connections_sent" stroke="#82ca9d" name="Connections" />
                <Line type="monotone" dataKey="connections_accepted" stroke="#ffc658" name="Accepted" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="comments_sent" fill="#8884d8" name="Comments" />
                <Bar dataKey="connections_sent" fill="#82ca9d" name="Connections" />
                <Bar dataKey="connections_accepted" fill="#ffc658" name="Accepted" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
