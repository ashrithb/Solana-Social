import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, ArrowUpRight, Clock, DollarSign, Info, LineChart, Percent, Shield } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function StablecoinYieldPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Stablecoin Yield</h1>
            <p className="text-muted-foreground mt-1">Earn interest on your USDC through Solana DeFi</p>
          </div>
          <Badge variant="outline" className="text-green-600 text-lg py-1.5 px-3 self-start">
            <Percent className="h-4 w-4 mr-1" />
            <span>5.8% APY</span>
          </Badge>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-green-50 to-white border-green-100">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="text-sm text-muted-foreground">Your Deposits</h4>
                <p className="text-3xl font-bold">10.5 USDC</p>
                <p className="text-sm text-green-600">+0.12 USDC earned</p>
              </div>
              <div className="text-center">
                <h4 className="text-sm text-muted-foreground">Total Pool</h4>
                <p className="text-3xl font-bold">125,450 USDC</p>
                <p className="text-sm text-muted-foreground">From 1,245 users</p>
              </div>
              <div className="text-center">
                <h4 className="text-sm text-muted-foreground">Next Payout</h4>
                <p className="text-3xl font-bold">12h 24m</p>
                <p className="text-sm text-muted-foreground">Daily compounding</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>

          <TabsContent value="deposit" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Deposit USDC</CardTitle>
                <CardDescription>Earn yield on your stablecoin deposits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                    <Select defaultValue="none">
                      <SelectTrigger>
                        <SelectValue placeholder="Select lock period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Lock (5.8% APY)</SelectItem>
                        <SelectItem value="30">30 Days (6.5% APY)</SelectItem>
                        <SelectItem value="90">90 Days (7.2% APY)</SelectItem>
                        <SelectItem value="180">180 Days (8.0% APY)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">Longer lock periods earn higher APY</p>
                  </div>

                  <div className="bg-muted p-4 rounded-md space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Deposit Amount</span>
                      <span>0 USDC</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Annual Yield (5.8% APY)</span>
                      <span>0 USDC</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Network Fee</span>
                      <span>~0.000005 SOL</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Daily Earnings (Estimated)</span>
                      <span>0 USDC</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-medium">Important Information</p>
                      <p className="text-sm mt-1">
                        While stablecoin yields are generally lower risk than other crypto investments, all DeFi
                        activities carry some risk. Please read our risk disclosure in the Info tab before depositing.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Deposit USDC</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Yield Strategies</CardTitle>
                <CardDescription>How your USDC earns yield</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Solana DeFi Lending</h4>
                        <p className="text-sm text-muted-foreground">Lending to verified borrowers</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">4.2% APY</p>
                      <p className="text-sm text-muted-foreground">40% allocation</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <LineChart className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Liquidity Provision</h4>
                        <p className="text-sm text-muted-foreground">AMM liquidity pools</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">6.5% APY</p>
                      <p className="text-sm text-muted-foreground">35% allocation</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 p-2 rounded-full">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Stablecoin Strategies</h4>
                        <p className="text-sm text-muted-foreground">Yield aggregation</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">7.2% APY</p>
                      <p className="text-sm text-muted-foreground">25% allocation</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Combined APY</span>
                    <span className="font-medium text-green-600">5.8%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Our smart contract automatically allocates your deposit across these strategies to optimize yield
                    while managing risk.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdraw" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Withdraw USDC</CardTitle>
                <CardDescription>Withdraw your deposited USDC and earned yield</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Available to Withdraw</Label>
                    <div className="flex items-center gap-2 bg-muted p-3 rounded-md">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-xl font-bold">10.62 USDC</span>
                      <span className="text-sm text-muted-foreground ml-2">(10.5 deposit + 0.12 yield)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Withdraw Amount</Label>
                    <div className="flex gap-2">
                      <Input type="number" placeholder="0" />
                      <Button variant="outline" className="whitespace-nowrap">
                        Max
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-md space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Withdraw Amount</span>
                      <span>0 USDC</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Network Fee</span>
                      <span>~0.000005 SOL</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>You will receive</span>
                      <span>0 USDC</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-medium">No Lock Period</p>
                      <p className="text-sm mt-1">
                        Your funds are not currently locked and can be withdrawn immediately. Locked deposits would show
                        remaining lock time here.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Withdraw USDC</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Your deposit and withdrawal history</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Balance After</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Apr 11, 2025</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Yield Payment
                        </Badge>
                      </TableCell>
                      <TableCell className="text-green-600">+0.07 USDC</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">10.62 USDC</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Apr 8, 2025</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Yield Payment
                        </Badge>
                      </TableCell>
                      <TableCell className="text-green-600">+0.05 USDC</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">10.55 USDC</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Apr 5, 2025</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Deposit
                        </Badge>
                      </TableCell>
                      <TableCell className="text-green-600">+10.5 USDC</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">10.5 USDC</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="flex justify-center mt-6">
                  <Button variant="outline">Load More</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>How Stablecoin Yield Works</CardTitle>
                <CardDescription>Understanding how your USDC earns interest</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <p>
                    Solana Social's stablecoin yield program allows you to earn interest on your USDC deposits through
                    various DeFi strategies on the Solana blockchain. Here's how it works:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="space-y-2">
                      <div className="bg-muted rounded-full h-10 w-10 flex items-center justify-center mx-auto">
                        <span className="font-medium">1</span>
                      </div>
                      <h4 className="font-medium">Deposit USDC</h4>
                      <p className="text-xs text-muted-foreground">
                        Deposit your USDC into our smart contract on Solana
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-muted rounded-full h-10 w-10 flex items-center justify-center mx-auto">
                        <span className="font-medium">2</span>
                      </div>
                      <h4 className="font-medium">Automated Strategies</h4>
                      <p className="text-xs text-muted-foreground">
                        Your funds are allocated across optimized DeFi strategies
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-muted rounded-full h-10 w-10 flex items-center justify-center mx-auto">
                        <span className="font-medium">3</span>
                      </div>
                      <h4 className="font-medium">Earn Daily Yield</h4>
                      <p className="text-xs text-muted-foreground">
                        Receive daily yield payments directly to your deposit
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Supported Stablecoins</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                        <div className="bg-green-100 p-2 rounded-full">
                          <DollarSign className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">USDC</h4>
                          <p className="text-sm text-muted-foreground">USD Coin on Solana</p>
                        </div>
                        <Badge className="ml-auto">5.8% APY</Badge>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-md opacity-60">
                        <div className="bg-green-100 p-2 rounded-full">
                          <DollarSign className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">USDT</h4>
                          <p className="text-sm text-muted-foreground">Tether on Solana</p>
                        </div>
                        <Badge className="ml-auto">Coming Soon</Badge>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">APY History</h3>
                    <div className="h-48 bg-muted rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">APY chart visualization would appear here</p>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Past 30 days average: 5.7% APY</span>
                      <span>All-time high: 6.2% APY</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Disclosure</CardTitle>
                <CardDescription>Important information about stablecoin yield risks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <p>
                    While we take extensive measures to secure your funds and work only with reputable DeFi protocols,
                    all financial activities carry some level of risk. Please be aware of the following:
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 mt-0.5 text-amber-500" />
                      <div>
                        <p className="font-medium">Smart Contract Risk</p>
                        <p className="text-sm text-muted-foreground">
                          While all smart contracts used in our yield strategies are audited, there is always a risk of
                          undiscovered vulnerabilities.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 mt-0.5 text-amber-500" />
                      <div>
                        <p className="font-medium">Stablecoin Depeg Risk</p>
                        <p className="text-sm text-muted-foreground">
                          Although USDC is designed to maintain a 1:1 peg with the US Dollar, there is a risk that this
                          peg could break under extreme market conditions.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 mt-0.5 text-amber-500" />
                      <div>
                        <p className="font-medium">Variable APY</p>
                        <p className="text-sm text-muted-foreground">
                          Yield rates are variable and can change based on market conditions. Past performance is not
                          indicative of future results.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-md">
                    <p className="text-sm">
                      We mitigate these risks by diversifying across multiple strategies, working only with audited
                      protocols, and implementing strict security measures. Our smart contract is audited by leading
                      blockchain security firms and includes emergency withdrawal functionality.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How often is yield distributed?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Yield is calculated and distributed daily. Your earnings are automatically added to your deposit
                        balance and begin earning compound interest immediately.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Are there any fees?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        There is a 0.5% performance fee on yield earned, which helps support the platform's development
                        and security measures. There are no deposit or withdrawal fees beyond the standard Solana
                        network transaction fees, which are typically less than $0.01.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What happens if I withdraw before my lock period ends?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Early withdrawals from locked deposits are subject to a fee of 50% of the earned yield. Your
                        original deposit amount is always available for withdrawal without penalty, but you'll forfeit
                        half of any interest earned if you withdraw before the lock period ends.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How are the yield strategies selected?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Our team of DeFi experts continuously evaluates Solana DeFi protocols based on security,
                        reliability, and yield potential. We only integrate with protocols that have undergone thorough
                        security audits and have established track records. The allocation across strategies is
                        algorithmically optimized to balance risk and reward.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Is my deposit insured?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Unlike traditional bank deposits, DeFi deposits are not covered by government insurance programs
                        like FDIC. However, we maintain a security fund that covers up to 5% of total deposits in case
                        of unforeseen events. This fund is designed to provide a first line of defense against potential
                        losses.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="gap-2">
                  View Smart Contract
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="gap-2">
                  View Audit Reports
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
