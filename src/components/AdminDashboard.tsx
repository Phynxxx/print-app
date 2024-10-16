"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Eye, CheckCircle, XCircle, LogOut } from "lucide-react"

// Mock data for demonstration
const dashboardData = {
  totalPagesPrinted: 15000,
  totalRevenue: 5000,
  pendingPrints: 25,
  completedPrints: 75,
}

const chartData = [
  { name: "Jan", prints: 400 },
  { name: "Feb", prints: 300 },
  { name: "Mar", prints: 500 },
  { name: "Apr", prints: 280 },
  { name: "May", prints: 200 },
  { name: "Jun", prints: 600 },
]

const pendingTasks = [
  { id: 1, name: "John Doe", document: "Report.pdf", pages: 10 },
  { id: 2, name: "Jane Smith", document: "Presentation.pptx", pages: 25 },
  { id: 3, name: "Bob Johnson", document: "Invoice.docx", pages: 2 },
]

const completedTasks = [
  { id: 4, name: "Alice Brown", document: "Thesis.pdf", pages: 100 },
  { id: 5, name: "Charlie Davis", document: "Flyer.jpg", pages: 1 },
]

const monthlySalesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 2800 },
  { month: "May", sales: 2000 },
  { month: "Jun", sales: 6000 },
  { month: "Jul", sales: 5500 },
  { month: "Aug", sales: 4800 },
  { month: "Sep", sales: 5200 },
  { month: "Oct", sales: 4700 },
  { month: "Nov", sales: 5900 },
  { month: "Dec", sales: 7000 },
]

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e:any) => {
    e.preventDefault()
    // In a real application, you would validate credentials here
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true)
    } else {
      alert("Invalid credentials")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(true)
    setUsername("")
    setPassword("")
  }

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit">Login</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold">Print Admin Dashboard</h1>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pages Printed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.totalPagesPrinted}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${dashboardData.totalRevenue}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Prints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.pendingPrints}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Prints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.completedPrints}</div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Print Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending" className="w-full">
                <TabsList>
                  <TabsTrigger value="pending">Pending Tasks</TabsTrigger>
                  <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
                </TabsList>
                <TabsContent value="pending">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-left">Document</th>
                          <th className="px-4 py-2 text-left">Pages</th>
                          <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingTasks.map((task) => (
                          <tr key={task.id}>
                            <td className="border px-4 py-2">{task.name}</td>
                            <td className="border px-4 py-2">{task.document}</td>
                            <td className="border px-4 py-2">{task.pages}</td>
                            <td className="border px-4 py-2">
                              <Button variant="outline" size="sm" className="mr-2">
                                <Eye className="mr-2 h-4 w-4" /> View
                              </Button>
                              <Button variant="outline" size="sm" className="mr-2">
                                <CheckCircle className="mr-2 h-4 w-4" /> Complete
                              </Button>
                              <Button variant="outline" size="sm">
                                <XCircle className="mr-2 h-4 w-4" /> Reject
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                <TabsContent value="completed">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-left">Document</th>
                          <th className="px-4 py-2 text-left">Pages</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedTasks.map((task) => (
                          <tr key={task.id}>
                            <td className="border px-4 py-2">{task.name}</td>
                            <td className="border px-4 py-2">{task.document}</td>
                            <td className="border px-4 py-2">{task.pages}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Detailed Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Pages per Order</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">18</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">4.8/5</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Repeat Customers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">68%</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Processing Time</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">2.3 hours</div>
                      </CardContent>
                    </Card>
                  </div>
               
                  <Card className="mt-6 pt-4">
                    <CardContent>
                  <div className="flex">
                  <ChartContainer
                    config={{
                      sales: {
                        label: "Monthly Sales",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlySalesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="sales" fill="var(--color-sales)" />
                      </BarChart>
                      </ResponsiveContainer>
                  </ChartContainer>
                
           
              <ChartContainer
                config={{
                  prints: {
                    label: "Number of Prints",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="prints" fill="var(--color-prints)" />
                  </BarChart>
                
                    </ResponsiveContainer>
                  </ChartContainer>
                  </div>
                  </CardContent>
                  </Card>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}