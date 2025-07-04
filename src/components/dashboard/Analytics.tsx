
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const Analytics = () => {
  const weeklyData = [
    { name: 'Mon', comments: 12, connections: 8, likes: 25 },
    { name: 'Tue', comments: 15, connections: 12, likes: 32 },
    { name: 'Wed', comments: 8, connections: 6, likes: 18 },
    { name: 'Thu', comments: 20, connections: 15, likes: 45 },
    { name: 'Fri', comments: 18, connections: 10, likes: 38 },
    { name: 'Sat', comments: 5, connections: 3, likes: 12 },
    { name: 'Sun', comments: 7, connections: 4, likes: 15 },
  ];

  const engagementTrend = [
    { name: 'Week 1', rate: 65 },
    { name: 'Week 2', rate: 72 },
    { name: 'Week 3', rate: 68 },
    { name: 'Week 4', rate: 78 },
  ];

  const industryData = [
    { name: 'SaaS', value: 35, color: '#8884d8' },
    { name: 'Fintech', value: 25, color: '#82ca9d' },
    { name: 'AI/ML', value: 20, color: '#ffc658' },
    { name: 'E-commerce', value: 12, color: '#ff7300' },
    { name: 'Other', value: 8, color: '#00ff88' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="comments" fill="#8884d8" name="Comments" />
                <Bar dataKey="connections" fill="#82ca9d" name="Connections" />
                <Bar dataKey="likes" fill="#ffc658" name="Likes" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Rate Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Target Industries</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {industryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">3.2x</div>
                <div className="text-sm text-blue-600">Response Rate</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-sm text-green-600">Connection Accept Rate</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-sm text-purple-600">Total Conversations</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">23</div>
                <div className="text-sm text-orange-600">Qualified Leads</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
