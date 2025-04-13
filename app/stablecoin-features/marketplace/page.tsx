import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Filter, Search, Upload } from "lucide-react"

export default function MarketplacePage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Content Marketplace</h1>
        <p className="text-muted-foreground mb-6">Buy and sell digital content using USDC on Solana</p>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Categories</h3>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <input type="checkbox" id="digital-art" className="mr-2" />
                      <label htmlFor="digital-art" className="text-sm">
                        Digital Art
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="research" className="mr-2" />
                      <label htmlFor="research" className="text-sm">
                        Research Reports
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="tutorials" className="mr-2" />
                      <label htmlFor="tutorials" className="text-sm">
                        Tutorials
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="templates" className="mr-2" />
                      <label htmlFor="templates" className="text-sm">
                        Templates
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="ebooks" className="mr-2" />
                      <label htmlFor="ebooks" className="text-sm">
                        E-Books
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Price Range</h3>
                  <div className="flex items-center gap-2">
                    <Input type="number" placeholder="Min" className="h-8" />
                    <span>-</span>
                    <Input type="number" placeholder="Max" className="h-8" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Sort By</h3>
                  <Select defaultValue="newest">
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sell Your Content</CardTitle>
                <CardDescription>Monetize your digital content with USDC payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  List your digital content on the marketplace and receive USDC payments directly to your wallet.
                </p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>0% platform fee for limited time</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Instant USDC payments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Set your own prices</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  List New Content
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="w-full md:w-3/4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle>Browse Content</CardTitle>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search..." className="pl-8" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="w-full justify-start mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="featured">Featured</TabsTrigger>
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                    <TabsTrigger value="new">New</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="p-4">
                          <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                            <img src="/abstract-geometric-preview.png" alt="Digital Art" className="rounded-md" />
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <h3 className="font-medium">Digital Artwork Collection</h3>
                          <p className="text-sm text-muted-foreground">by @digital_artist</p>
                          <div className="flex justify-between items-center mt-2">
                            <Badge variant="outline" className="text-green-600">
                              <DollarSign className="h-3 w-3 mr-1" />5 USDC
                            </Badge>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="p-4">
                          <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                            <img src="/data-insights-glimpse.png" alt="Research Report" className="rounded-md" />
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <h3 className="font-medium">Solana DeFi Market Research</h3>
                          <p className="text-sm text-muted-foreground">by @crypto_analyst</p>
                          <div className="flex justify-between items-center mt-2">
                            <Badge variant="outline" className="text-green-600">
                              <DollarSign className="h-3 w-3 mr-1" />
                              10 USDC
                            </Badge>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="p-4">
                          <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                            <img src="/coding-tutorial-preview.png" alt="Tutorial Video" className="rounded-md" />
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <h3 className="font-medium">Solana Smart Contract Tutorial</h3>
                          <p className="text-sm text-muted-foreground">by @solana_dev</p>
                          <div className="flex justify-between items-center mt-2">
                            <Badge variant="outline" className="text-green-600">
                              <DollarSign className="h-3 w-3 mr-1" />3 USDC
                            </Badge>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="p-4">
                          <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                            <img
                              src="/placeholder.svg?height=200&width=200&query=ebook cover"
                              alt="E-Book"
                              className="rounded-md"
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <h3 className="font-medium">Stablecoin Economics E-Book</h3>
                          <p className="text-sm text-muted-foreground">by @defi_writer</p>
                          <div className="flex justify-between items-center mt-2">
                            <Badge variant="outline" className="text-green-600">
                              <DollarSign className="h-3 w-3 mr-1" />8 USDC
                            </Badge>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="p-4">
                          <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                            <img
                              src="/placeholder.svg?height=200&width=200&query=design template"
                              alt="Design Template"
                              className="rounded-md"
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <h3 className="font-medium">Crypto Dashboard UI Kit</h3>
                          <p className="text-sm text-muted-foreground">by @ui_designer</p>
                          <div className="flex justify-between items-center mt-2">
                            <Badge variant="outline" className="text-green-600">
                              <DollarSign className="h-3 w-3 mr-1" />
                              15 USDC
                            </Badge>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="p-4">
                          <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                            <img
                              src="/placeholder.svg?height=200&width=200&query=data analysis"
                              alt="Data Analysis"
                              className="rounded-md"
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <h3 className="font-medium">Solana Ecosystem Data Report</h3>
                          <p className="text-sm text-muted-foreground">by @data_scientist</p>
                          <div className="flex justify-between items-center mt-2">
                            <Badge variant="outline" className="text-green-600">
                              <DollarSign className="h-3 w-3 mr-1" />
                              12 USDC
                            </Badge>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex justify-center">
                      <Button variant="outline">Load More</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="featured" className="space-y-6">
                    {/* Featured content would go here */}
                    <div className="text-center py-8 text-muted-foreground">Featured content coming soon</div>
                  </TabsContent>

                  <TabsContent value="trending" className="space-y-6">
                    {/* Trending content would go here */}
                    <div className="text-center py-8 text-muted-foreground">Trending content coming soon</div>
                  </TabsContent>

                  <TabsContent value="new" className="space-y-6">
                    {/* New content would go here */}
                    <div className="text-center py-8 text-muted-foreground">New content coming soon</div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
