import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  FileText,
  Lock,
  MessageSquare,
  Shield,
  Upload,
} from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import Link from "next/link"

export default function EscrowDetailsPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Logo Design Project</h1>
              <Badge variant="outline" className="text-green-600">
                <DollarSign className="h-3 w-3 mr-1" />
                50 USDC
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">Escrow ID: ESC-8f72a1</p>
          </div>
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">In Progress</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Client</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar>
                  <img src="/abstract-user-icon.png" alt="Client" />
                </Avatar>
                <div>
                  <p className="font-medium">@username</p>
                  <p className="text-xs text-muted-foreground">Client</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Creator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar>
                  <img src="/creative-workspace.png" alt="Creator" />
                </Avatar>
                <div>
                  <p className="font-medium">@design_pro</p>
                  <p className="text-xs text-muted-foreground">Designer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Created</span>
                  <span>Apr 5, 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Due Date</span>
                  <span className="font-medium">Apr 15, 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Time Remaining</span>
                  <span className="text-amber-600">4 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-sm">
                    Design a modern, minimalist logo for my blockchain startup. The logo should convey trust,
                    innovation, and security. I need both light and dark versions, along with brand guidelines for
                    usage. The final deliverables should include vector files (AI, EPS, SVG) and raster formats (PNG,
                    JPG) in various sizes.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Modern and minimalist design</li>
                    <li>Color scheme: blue, teal, and white</li>
                    <li>Must work well on both light and dark backgrounds</li>
                    <li>Should be recognizable at small sizes (favicon, app icon)</li>
                    <li>Include both logomark and logotype versions</li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Contract Terms</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Revision Policy</p>
                      <p className="text-sm text-muted-foreground">Up to 3 rounds of revisions</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Intellectual Property</p>
                      <p className="text-sm text-muted-foreground">Full transfer to client upon payment</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Cancellation Terms</p>
                      <p className="text-sm text-muted-foreground">Pay for work completed</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Dispute Resolution</p>
                      <p className="text-sm text-muted-foreground">Platform mediation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Escrow Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>

                <div className="bg-muted p-4 rounded-md space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Escrow Amount</span>
                    <span>50 USDC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Released</span>
                    <span>0 USDC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Remaining</span>
                    <span>50 USDC</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Status</span>
                    <span className="text-amber-600">In Progress</span>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md">
                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-medium">Funds Locked in Escrow</p>
                      <p className="text-sm mt-1">
                        50 USDC is securely locked in the escrow smart contract and will be released to the creator upon
                        successful completion of the project.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  View on Solana
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Milestones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-muted" />

                  <div className="relative z-10 flex mb-8">
                    <div className="bg-green-100 text-green-700 rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <div className="ml-6 mt-2">
                      <h3 className="text-lg font-medium">Initial Concepts</h3>
                      <p className="text-muted-foreground mt-1">Delivery of 3-5 initial logo concepts for review</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                        <span className="text-sm text-muted-foreground">Apr 8, 2025</span>
                        <Badge variant="outline" className="ml-auto">
                          <DollarSign className="h-3 w-3 mr-1" />
                          20 USDC
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex mb-8">
                    <div className="bg-amber-100 text-amber-700 rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-8 w-8" />
                    </div>
                    <div className="ml-6 mt-2">
                      <h3 className="text-lg font-medium">Revisions & Refinement</h3>
                      <p className="text-muted-foreground mt-1">Refinement of selected concept based on feedback</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          In Progress
                        </Badge>
                        <span className="text-sm text-muted-foreground">Due Apr 12, 2025</span>
                        <Badge variant="outline" className="ml-auto">
                          <DollarSign className="h-3 w-3 mr-1" />
                          15 USDC
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex">
                    <div className="bg-muted rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="ml-6 mt-2">
                      <h3 className="text-lg font-medium">Final Deliverables</h3>
                      <p className="text-muted-foreground mt-1">Delivery of all final files and brand guidelines</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">Pending</Badge>
                        <span className="text-sm text-muted-foreground">Due Apr 15, 2025</span>
                        <Badge variant="outline" className="ml-auto">
                          <DollarSign className="h-3 w-3 mr-1" />
                          15 USDC
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Milestone Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 mt-0.5" />
                      <div>
                        <p className="font-medium">Milestone 2: Revisions & Refinement</p>
                        <p className="text-sm mt-1">
                          The creator is currently working on revisions based on your feedback. You'll be notified when
                          they submit the revised designs.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Feedback for Creator</h3>
                    <Textarea
                      placeholder="Provide additional feedback or instructions for the current milestone..."
                      className="min-h-[100px]"
                    />
                    <Button className="w-full">Send Feedback</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Files</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Initial Concepts</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-3">
                          <img
                            src="/abstract-geometric-logo.png"
                            alt="Logo Concept 1"
                            className="max-h-full max-w-full"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Concept 1</p>
                            <p className="text-xs text-muted-foreground">Uploaded Apr 8, 2025</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-3">
                          <img
                            src="/abstract-geometric-logo.png"
                            alt="Logo Concept 2"
                            className="max-h-full max-w-full"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Concept 2</p>
                            <p className="text-xs text-muted-foreground">Uploaded Apr 8, 2025</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-3">
                          <img
                            src="/abstract-geometric-logo.png"
                            alt="Logo Concept 3"
                            className="max-h-full max-w-full"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Concept 3</p>
                            <p className="text-xs text-muted-foreground">Uploaded Apr 8, 2025</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Upload Files</h3>
                  <div className="border-2 border-dashed border-muted rounded-md p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Drag and drop files here</p>
                    <p className="text-xs text-muted-foreground mt-1">or</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Browse Files
                    </Button>
                    <p className="text-xs text-muted-foreground mt-4">
                      Supported formats: PNG, JPG, PDF, AI, EPS, SVG, ZIP (max 50MB)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Messages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <img src="/abstract-user-icon.png" alt="Client" />
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="font-medium text-sm">@username</span>
                          <span className="text-xs text-muted-foreground">Client</span>
                          <span className="text-xs text-muted-foreground ml-auto">Apr 8, 2025</span>
                        </div>
                        <p className="text-sm">
                          I really like concept 2! Could we try a version with slightly more rounded corners and perhaps
                          a bit more space between the icon and the text?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <img src="/creative-workspace.png" alt="Creator" />
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="font-medium text-sm">@design_pro</span>
                          <span className="text-xs text-muted-foreground">Designer</span>
                          <span className="text-xs text-muted-foreground ml-auto">Apr 9, 2025</span>
                        </div>
                        <p className="text-sm">
                          Thanks for the feedback! I'll work on those adjustments and have the revised version ready for
                          you by tomorrow. Would you like me to try any different color variations as well?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <img src="/abstract-user-icon.png" alt="Client" />
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="font-medium text-sm">@username</span>
                          <span className="text-xs text-muted-foreground">Client</span>
                          <span className="text-xs text-muted-foreground ml-auto">Apr 9, 2025</span>
                        </div>
                        <p className="text-sm">
                          Yes, that would be great! Maybe try a slightly darker shade of blue for better contrast?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Send Message</h3>
                  <Textarea placeholder="Type your message here..." className="min-h-[100px]" />
                  <Button className="w-full">Send Message</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/stablecoin-features/escrow">Back to Escrows</Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">
              <Shield className="h-4 w-4 mr-2" />
              Report Issue
            </Button>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
