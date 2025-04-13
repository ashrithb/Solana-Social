import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  DollarSign,
  FileText,
  Lock,
  Shield,
  User,
  Users,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export default function CollaborationEscrowPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Collaboration Escrow</h1>
            <p className="text-muted-foreground mt-1">Secure transactions with USDC on Solana</p>
          </div>
          <Badge variant="outline" className="text-green-600 text-lg py-1.5 px-3 self-start">
            <Lock className="h-4 w-4 mr-1" />
            <span>Secure & Fast</span>
          </Badge>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <Lock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium">Secure Funds</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  USDC is locked in a secure Solana smart contract until work is approved
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-3">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium">Instant Payments</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Creators receive payment instantly when work is approved
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-amber-100 p-3 rounded-full mb-3">
                  <Shield className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-medium">Dispute Protection</h3>
                <p className="text-sm text-muted-foreground mt-1">Fair resolution process if disagreements arise</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="create">Create Escrow</TabsTrigger>
            <TabsTrigger value="manage">Manage Escrows</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>How Escrow Works</CardTitle>
                <CardDescription>Secure collaboration with USDC escrow on Solana</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-muted" />

                  <div className="relative z-10 flex mb-8">
                    <div className="bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    <div className="ml-6 mt-2">
                      <h3 className="text-lg font-medium">Client Creates Escrow</h3>
                      <p className="text-muted-foreground mt-1">
                        Client specifies project details, deliverables, timeline, and deposits USDC into the escrow
                        smart contract
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <User className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Client</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-sm">USDC</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <Lock className="h-4 w-4 text-amber-500" />
                        <span className="text-sm">Smart Contract</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex mb-8">
                    <div className="bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold">2</span>
                    </div>
                    <div className="ml-6 mt-2">
                      <h3 className="text-lg font-medium">Creator Accepts & Works</h3>
                      <p className="text-muted-foreground mt-1">
                        Creator reviews terms, accepts the project, and completes the work according to specifications
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <User className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Creator</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Deliverables</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Submission</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex mb-8">
                    <div className="bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold">3</span>
                    </div>
                    <div className="ml-6 mt-2">
                      <h3 className="text-lg font-medium">Client Reviews Work</h3>
                      <p className="text-muted-foreground mt-1">
                        Client reviews the submitted work and either approves it or requests revisions
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <User className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Client</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Review</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Approve/Revise</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex">
                    <div className="bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold">4</span>
                    </div>
                    <div className="ml-6 mt-2">
                      <h3 className="text-lg font-medium">Funds Released</h3>
                      <p className="text-muted-foreground mt-1">
                        Upon approval, the smart contract automatically releases USDC to the creator's wallet
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Lock className="h-4 w-4 text-amber-500" />
                        <span className="text-sm">Smart Contract</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-sm">USDC</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <User className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Creator</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-medium mb-2">Dispute Resolution</h3>
                  <p className="text-sm mb-4">
                    If a dispute arises, our resolution process ensures fair outcomes for both parties:
                  </p>
                  <ol className="list-decimal pl-5 text-sm space-y-2">
                    <li>Either party can initiate a dispute with supporting evidence</li>
                    <li>A neutral mediator from our verified pool reviews the case</li>
                    <li>Both parties can present their case and evidence</li>
                    <li>Mediator makes a decision within 72 hours</li>
                    <li>Funds are released according to the mediator's decision</li>
                  </ol>
                  <p className="text-sm mt-4">
                    Mediators are selected based on expertise and have no conflicts of interest. Their compensation
                    comes from a small platform fee, not from the disputed funds.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      Security Measures
                    </h3>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                        <span>Audited smart contracts by leading security firms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                        <span>Multi-signature authorization for large transactions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                        <span>Timelock mechanisms for added security</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                        <span>Emergency withdrawal functionality</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      Fees & Supported Coins
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Platform Fee</span>
                        <Badge variant="outline">1% of transaction</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Network Fee</span>
                        <Badge variant="outline">~0.000005 SOL</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Dispute Filing</span>
                        <Badge variant="outline">Free</Badge>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Supported Stablecoins</span>
                        <div className="flex items-center gap-1">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">USDC</Badge>
                          <Badge variant="outline">More coming soon</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Benefits of Escrow</CardTitle>
                <CardDescription>Why use Solana Social's escrow service for collaborations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Trust & Security</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Build trust with new collaborators without prior working history. Funds are secure and only
                          released when conditions are met.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Clock className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Speed & Efficiency</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Solana's fast blockchain ensures near-instant transactions when work is approved. No waiting
                          for bank transfers or payment processors.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Clear Documentation</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          All terms, deliverables, and timelines are clearly documented on-chain, preventing
                          misunderstandings and scope creep.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full">
                        <Users className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Fair for Everyone</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Clients know their funds are only released for satisfactory work. Creators know they'll be
                          paid when they deliver as promised.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-red-100 p-2 rounded-full">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Dispute Protection</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          If disagreements arise, our fair dispute resolution process protects both parties and ensures
                          equitable outcomes.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-indigo-100 p-2 rounded-full">
                        <DollarSign className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Low Fees</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Just 1% platform fee, significantly lower than traditional escrow services or freelance
                          platforms that charge 5-20%.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="#create">Create Your First Escrow</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Escrow</CardTitle>
                <CardDescription>Set up a secure collaboration with another user</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Collaboration Type</Label>
                    <Select defaultValue="custom">
                      <SelectTrigger>
                        <SelectValue placeholder="Select collaboration type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="design">Design Work</SelectItem>
                        <SelectItem value="content">Content Creation</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="marketing">Marketing Services</SelectItem>
                        <SelectItem value="custom">Custom Project</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Your Role</Label>
                      <Select defaultValue="client">
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="client">Client (I'm paying)</SelectItem>
                          <SelectItem value="creator">Creator (I'm providing service)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Collaborator Username</Label>
                      <Input placeholder="@username" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Project Title</Label>
                    <Input placeholder="E.g., Logo Design for My Brand" />
                  </div>

                  <div className="space-y-2">
                    <Label>Project Description</Label>
                    <Textarea
                      placeholder="Describe the project, deliverables, and any specific requirements"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Payment Amount (USDC)</Label>
                      <Input type="number" placeholder="0.00" />
                    </div>

                    <div className="space-y-2">
                      <Label>Due Date</Label>
                      <div className="relative">
                        <Input type="date" />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Milestone Structure (Optional)</Label>
                    <Select defaultValue="single">
                      <SelectTrigger>
                        <SelectValue placeholder="Select milestone structure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single Payment</SelectItem>
                        <SelectItem value="50-50">50% Upfront, 50% on Completion</SelectItem>
                        <SelectItem value="custom">Custom Milestones</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-muted p-4 rounded-md space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Escrow Amount</span>
                      <span>0.00 USDC</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Platform Fee (1%)</span>
                      <span>0.00 USDC</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Network Fee</span>
                      <span>~0.000005 SOL</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>0.00 USDC</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="terms" className="mt-1" />
                    <Label htmlFor="terms" className="text-sm font-normal">
                      I agree to the{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Escrow Terms & Conditions
                      </Link>{" "}
                      and understand that funds will be locked in the smart contract until the agreed conditions are
                      met.
                    </Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full">Create Escrow & Deposit Funds</Button>
                <p className="text-xs text-center text-muted-foreground">
                  You'll need to approve the transaction in your wallet. The funds will be transferred to the escrow
                  smart contract.
                </p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Escrow Templates</CardTitle>
                <CardDescription>Quick-start with pre-configured templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Content Creation</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">
                        For articles, blog posts, copywriting, and other written content
                      </p>
                      <div className="mt-2 text-sm">
                        <div className="flex justify-between">
                          <span>Typical Timeline:</span>
                          <span>3-7 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revision Rounds:</span>
                          <span>2 included</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Design Project</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">
                        For logos, graphics, UI/UX design, and visual assets
                      </p>
                      <div className="mt-2 text-sm">
                        <div className="flex justify-between">
                          <span>Typical Timeline:</span>
                          <span>7-14 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revision Rounds:</span>
                          <span>3 included</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Development</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">
                        For coding, web development, and technical projects
                      </p>
                      <div className="mt-2 text-sm">
                        <div className="flex justify-between">
                          <span>Typical Timeline:</span>
                          <span>14-30 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Milestones:</span>
                          <span>3 payment stages</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Consulting</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">
                        For advisory services, strategy, and expert consultation
                      </p>
                      <div className="mt-2 text-sm">
                        <div className="flex justify-between">
                          <span>Typical Timeline:</span>
                          <span>Hourly or retainer</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Deliverables:</span>
                          <span>Reports & calls</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="mt-6">
            <Tabs defaultValue="client" className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-6">
                <TabsTrigger value="client">As Client</TabsTrigger>
                <TabsTrigger value="creator">As Creator</TabsTrigger>
              </TabsList>

              <TabsContent value="client" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Active Escrows (As Client)</CardTitle>
                    <CardDescription>Escrow agreements where you're the client</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h3 className="font-medium">Logo Design Project</h3>
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
                            <div className="flex justify-between text-sm">
                              <span>Created</span>
                              <span>Apr 5, 2025</span>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm">Check Submission</Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h3 className="font-medium">Content Writing</h3>
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
                            <div className="flex justify-between text-sm">
                              <span>Due Date</span>
                              <span>Apr 12, 2025</span>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                              Request Changes
                            </Button>
                            <Button size="sm">Approve & Release</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Button variant="outline">View Completed Escrows</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="creator" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Active Escrows (As Creator)</CardTitle>
                    <CardDescription>Escrow agreements where you're the creator</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h3 className="font-medium">Social Media Strategy</h3>
                              <p className="text-sm text-muted-foreground">with @marketing_client</p>
                            </div>
                            <Badge variant="outline" className="text-green-600">
                              <DollarSign className="h-3 w-3 mr-1" />
                              75 USDC
                            </Badge>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Status</span>
                              <span className="font-medium">In Progress</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Due Date</span>
                              <span>Apr 20, 2025</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Created</span>
                              <span>Apr 7, 2025</span>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm">Submit Work</Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h3 className="font-medium">UI Design for DApp</h3>
                              <p className="text-sm text-muted-foreground">with @crypto_startup</p>
                            </div>
                            <Badge variant="outline" className="text-green-600">
                              <DollarSign className="h-3 w-3 mr-1" />
                              120 USDC
                            </Badge>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Status</span>
                              <span className="font-medium">Revision Requested</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Due Date</span>
                              <span>Apr 18, 2025</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Feedback Received</span>
                              <span>Apr 10, 2025</span>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                              View Feedback
                            </Button>
                            <Button size="sm">Submit Revision</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Button variant="outline">View Completed Escrows</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle>Escrow Analytics</CardTitle>
                <CardDescription>Your escrow activity and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted p-4 rounded-md text-center">
                    <h4 className="text-sm text-muted-foreground">Total Escrows</h4>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-xs text-muted-foreground">5 as client, 3 as creator</p>
                  </div>
                  <div className="bg-muted p-4 rounded-md text-center">
                    <h4 className="text-sm text-muted-foreground">Total Value</h4>
                    <p className="text-2xl font-bold text-green-600">345 USDC</p>
                    <p className="text-xs text-muted-foreground">Across all escrows</p>
                  </div>
                  <div className="bg-muted p-4 rounded-md text-center">
                    <h4 className="text-sm text-muted-foreground">Completion Rate</h4>
                    <p className="text-2xl font-bold">100%</p>
                    <p className="text-xs text-muted-foreground">0 disputes</p>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Escrows</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>April 2025</TableCell>
                      <TableCell>4</TableCell>
                      <TableCell>270 USDC</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          In Progress
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>March 2025</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>75 USDC</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>February 2025</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>50 USDC</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions about our escrow service</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How secure is the escrow smart contract?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Our escrow smart contracts have been audited by leading blockchain security firms including
                        Certik and Quantstamp. The contracts use time-tested escrow patterns with additional security
                        features like emergency withdrawal functionality and multi-signature authorization for large
                        transactions. The code is open-source and available for review on our GitHub repository.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>What happens if the creator doesn't deliver?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        If a creator fails to deliver by the agreed deadline, the client can initiate a dispute. If the
                        creator doesn't respond within 72 hours, the funds are automatically returned to the client. For
                        partial deliveries, our dispute resolution process will determine what percentage of the funds
                        should be released to each party based on the work completed.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I extend the deadline of an escrow?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Yes, deadlines can be extended if both parties agree. Either party can propose an extension, and
                        once the other party confirms, the smart contract will update the deadline automatically.
                        There's no limit to the number of extensions that can be agreed upon, and no additional fees for
                        extending deadlines.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>How does the dispute resolution process work?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Our dispute resolution process involves a neutral mediator from our verified pool. When a
                        dispute is filed, both parties have 48 hours to submit evidence and statements. The mediator
                        reviews all materials and makes a decision within 72 hours. Mediators are selected based on
                        expertise in the relevant field and have no conflicts of interest. Their compensation comes from
                        the platform fee, not from the disputed funds.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>What stablecoins are supported?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Currently, we support USDC on the Solana blockchain. We've chosen USDC due to its stability,
                        widespread adoption, and low transaction costs on Solana. We plan to add support for additional
                        stablecoins in the future based on community demand and security considerations.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>Can I create milestone-based payments?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Yes, our escrow system supports milestone-based payments. You can create multiple milestones
                        with specific deliverables and payment amounts for each. Funds for each milestone are released
                        only when that specific milestone is completed and approved. This is particularly useful for
                        longer projects where breaking down the work into smaller, manageable chunks makes sense.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger>What fees are charged for using the escrow service?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        We charge a 1% platform fee on the total transaction amount. This fee is used to maintain the
                        platform, cover dispute resolution costs, and fund ongoing development. There are also minimal
                        Solana network fees (typically less than $0.01) for executing the smart contract transactions.
                        There are no hidden fees or additional charges.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8">
                    <AccordionTrigger>Can I cancel an escrow after it's created?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        An escrow can be canceled if both parties agree. If work hasn't started, the full amount minus
                        network fees will be returned to the client. If work has started but isn't complete, the parties
                        can agree on a partial payment for work done so far. If the parties can't agree on cancellation
                        terms, the dispute resolution process can be used to determine a fair outcome.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/terms">Terms of Service</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/support">Contact Support</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
