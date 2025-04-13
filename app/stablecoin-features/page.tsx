import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, DollarSign, Lock, Star, Zap } from "lucide-react"
import Link from "next/link"

export default function StablecoinFeaturesPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Stablecoin Features</h1>
        <p className="text-muted-foreground mb-6">Explore the stablecoin-powered features of Solana Social</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Why USDC on Solana?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Lightning Fast Transactions</h3>
                <p className="text-sm">
                  Solana processes transactions in milliseconds, making USDC payments instant and seamless.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Minimal Transaction Fees</h3>
                <p className="text-sm">
                  Transactions cost fractions of a cent, making microtransactions and frequent transfers economical.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Stable Value</h3>
                <p className="text-sm">
                  USDC is pegged 1:1 to the US Dollar, providing stability in the volatile crypto market.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get Started with USDC</CardTitle>
              <CardDescription>Add USDC to your Solana Social wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <span>Connect your Solana wallet</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <span>Deposit USDC from an exchange or another wallet</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <span>Start using USDC across Solana Social features</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/deposit">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Deposit USDC
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="marketplace" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="escrow">Escrow</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="yield">Yield</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  Content Marketplace
                </CardTitle>
                <CardDescription>Buy and sell digital content using USDC on Solana</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="p-4">
                      <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                        <img src="/abstract-geometric-preview.png" alt="Digital Art" className="rounded-md" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <h3 className="font-medium">Digital Artwork</h3>
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
                      <h3 className="font-medium">Market Research</h3>
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
                      <h3 className="font-medium">Dev Tutorial</h3>
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
                </div>

                <div className="mt-6 text-center">
                  <Button asChild>
                    <Link href="/stablecoin-features/marketplace">
                      Explore Full Marketplace
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="escrow" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-blue-500" />
                  Collaboration Escrow
                </CardTitle>
                <CardDescription>Secure collaborations with USDC escrow contracts on Solana</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-medium mb-2">How Escrow Works</h3>
                  <p className="text-sm mb-4">
                    Our escrow system uses Solana smart contracts to hold USDC until project milestones are completed,
                    protecting both creators and clients.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="space-y-2">
                      <div className="bg-background rounded-full h-10 w-10 flex items-center justify-center mx-auto">
                        <span className="font-medium">1</span>
                      </div>
                      <h4 className="font-medium">Client Deposits USDC</h4>
                      <p className="text-xs text-muted-foreground">
                        Funds are locked in a secure Solana smart contract
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-background rounded-full h-10 w-10 flex items-center justify-center mx-auto">
                        <span className="font-medium">2</span>
                      </div>
                      <h4 className="font-medium">Creator Delivers Work</h4>
                      <p className="text-xs text-muted-foreground">Creator completes the agreed deliverables</p>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-background rounded-full h-10 w-10 flex items-center justify-center mx-auto">
                        <span className="font-medium">3</span>
                      </div>
                      <h4 className="font-medium">Funds Released</h4>
                      <p className="text-xs text-muted-foreground">USDC is automatically released to creator</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Active Escrow Contracts</h3>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Logo Design Project</h4>
                          <p className="text-sm text-muted-foreground">with @design_pro</p>
                        </div>
                        <Badge variant="outline" className="text-green-600">
                          <DollarSign className="h-3 w-3 mr-1" />
                          50 USDC
                        </Badge>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Status</span>
                          <span className="font-medium">In Progress</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Due Date</span>
                          <span>Apr 15, 2025</span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Content Writing</h4>
                          <p className="text-sm text-muted-foreground">with @writer_expert</p>
                        </div>
                        <Badge variant="outline" className="text-green-600">
                          <DollarSign className="h-3 w-3 mr-1" />
                          25 USDC
                        </Badge>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Status</span>
                          <span className="font-medium">Awaiting Approval</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Delivered</span>
                          <span>Apr 9, 2025</span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                        <Button size="sm">Approve & Release</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/stablecoin-features/escrow/create">Create New Escrow Contract</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Moderation Rewards
                </CardTitle>
                <CardDescription>Earn USDC by helping moderate content on Solana Social</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Content Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <span className="text-3xl font-bold text-green-600">0.05</span>
                        <span className="text-green-600 ml-1">USDC</span>
                        <p className="text-sm text-muted-foreground">per review</p>
                      </div>
                      <p className="text-sm">
                        Review flagged content and help determine if it violates community guidelines.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline">
                        Start Reviewing
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Fact Checking</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <span className="text-3xl font-bold text-green-600">0.1</span>
                        <span className="text-green-600 ml-1">USDC</span>
                        <p className="text-sm text-muted-foreground">per verification</p>
                      </div>
                      <p className="text-sm">
                        Verify claims in posts about crypto, blockchain technology, and market information.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline">
                        Start Fact Checking
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quality Curation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <span className="text-3xl font-bold text-green-600">0.2</span>
                        <span className="text-green-600 ml-1">USDC</span>
                        <p className="text-sm text-muted-foreground">per curation</p>
                      </div>
                      <p className="text-sm">
                        Curate high-quality content for featured sections and topic collections.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline">
                        Start Curating
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Your Reward Stats</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted p-4 rounded-md text-center">
                      <h4 className="text-sm text-muted-foreground">This Week</h4>
                      <p className="text-2xl font-bold text-green-600">1.45 USDC</p>
                    </div>
                    <div className="bg-muted p-4 rounded-md text-center">
                      <h4 className="text-sm text-muted-foreground">This Month</h4>
                      <p className="text-2xl font-bold text-green-600">5.80 USDC</p>
                    </div>
                    <div className="bg-muted p-4 rounded-md text-center">
                      <h4 className="text-sm text-muted-foreground">All Time</h4>
                      <p className="text-2xl font-bold text-green-600">12.35 USDC</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Claim Rewards (1.45 USDC)</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="yield" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Stablecoin Yield
                </CardTitle>
                <CardDescription>Earn interest on your USDC deposits through Solana DeFi protocols</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <h4 className="text-sm text-muted-foreground">Current APY</h4>
                      <p className="text-3xl font-bold text-green-600">5.8%</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-sm text-muted-foreground">Total Deposits</h4>
                      <p className="text-3xl font-bold">125,450 USDC</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-sm text-muted-foreground">Your Deposit</h4>
                      <p className="text-3xl font-bold">10.5 USDC</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Deposit Amount</Label>
                    <div className="flex gap-2">
                      <Input type="number" placeholder="0" />
                      <Button variant="outline" className="whitespace-nowrap">
                        Max: 25.5
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Minimum deposit: 1 USDC</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Lock Period (Optional)</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        No Lock
                      </Button>
                      <Button variant="outline" className="flex-1">
                        30 Days
                      </Button>
                      <Button variant="outline" className="flex-1">
                        90 Days
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Longer lock periods earn higher APY</p>
                  </div>

                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex justify-between mb-2">
                      <span>Estimated Annual Yield</span>
                      <span>0 USDC</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Yield is generated through Solana DeFi protocols and paid in USDC
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Your Yield Activity</h3>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Deposit</p>
                        <p className="text-sm text-muted-foreground">Apr 5, 2025</p>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        +10.5 USDC
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Yield Payment</p>
                        <p className="text-sm text-muted-foreground">Apr 8, 2025</p>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        +0.05 USDC
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Yield Payment</p>
                        <p className="text-sm text-muted-foreground">Apr 11, 2025</p>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        +0.07 USDC
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full">Deposit USDC</Button>
                <Button variant="outline" className="w-full">
                  Withdraw USDC
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
