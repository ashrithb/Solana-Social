import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Calendar, FileText, Lock, Plus, Trash } from "lucide-react"
import Link from "next/link"

export default function CreateEscrowPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Create Escrow Contract</h1>
          <p className="text-muted-foreground mt-1">Set up a secure collaboration with detailed terms</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Define the parties and project details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                <Label>Collaborator</Label>
                <div className="flex gap-2">
                  <Input placeholder="@username" />
                  <Button variant="outline" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Enter username or select from contacts</p>
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
                className="min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground">Be as specific as possible to avoid misunderstandings</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select defaultValue="design">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="content">Content Creation</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Final Deadline</Label>
                <div className="relative">
                  <Input type="date" />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Structure</CardTitle>
            <CardDescription>Define how and when payments will be released</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Payment Type</Label>
              <Select defaultValue="milestone">
                <SelectTrigger>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Payment on Completion</SelectItem>
                  <SelectItem value="split">50/50 Split (Half upfront, half on completion)</SelectItem>
                  <SelectItem value="milestone">Milestone-Based Payments</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Milestones</h3>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Milestone
                </Button>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Milestone 1: Initial Concept</h4>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input placeholder="E.g., Delivery of initial concept designs" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Amount (USDC)</Label>
                        <Input type="number" placeholder="0.00" />
                      </div>
                      <div className="space-y-2">
                        <Label>Due Date</Label>
                        <Input type="date" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Milestone 2: Final Delivery</h4>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input placeholder="E.g., Delivery of final files with all revisions" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Amount (USDC)</Label>
                        <Input type="number" placeholder="0.00" />
                      </div>
                      <div className="space-y-2">
                        <Label>Due Date</Label>
                        <Input type="date" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted p-4 rounded-md space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Escrow Amount</span>
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
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Additional Terms</CardTitle>
            <CardDescription>Define additional conditions and requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Revision Policy</Label>
              <Select defaultValue="2rounds">
                <SelectTrigger>
                  <SelectValue placeholder="Select revision policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unlimited">Unlimited revisions until satisfied</SelectItem>
                  <SelectItem value="2rounds">2 rounds of revisions included</SelectItem>
                  <SelectItem value="3rounds">3 rounds of revisions included</SelectItem>
                  <SelectItem value="custom">Custom revision policy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Cancellation Terms</Label>
              <Select defaultValue="standard">
                <SelectTrigger>
                  <SelectValue placeholder="Select cancellation terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard (Pay for work completed)</SelectItem>
                  <SelectItem value="strict">Strict (No refunds after work begins)</SelectItem>
                  <SelectItem value="flexible">Flexible (Full refund if canceled within 24h)</SelectItem>
                  <SelectItem value="custom">Custom cancellation terms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Intellectual Property Rights</Label>
              <Select defaultValue="transfer">
                <SelectTrigger>
                  <SelectValue placeholder="Select IP rights" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transfer">Full transfer to client upon payment</SelectItem>
                  <SelectItem value="license">License to client, creator retains ownership</SelectItem>
                  <SelectItem value="custom">Custom IP arrangement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Additional Terms (Optional)</Label>
              <Textarea
                placeholder="Any additional terms or conditions for this collaboration"
                className="min-h-[100px]"
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="font-medium">Important</p>
                  <p className="text-sm mt-1">
                    All terms defined here will be encoded into the smart contract and cannot be changed after both
                    parties agree, unless both parties consent to amendments.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Review & Create</CardTitle>
            <CardDescription>Review all details before creating the escrow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" className="mt-1" />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to the{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Escrow Terms & Conditions
                  </Link>{" "}
                  and understand that funds will be locked in the smart contract until the agreed conditions are met.
                </Label>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" id="confirm" className="mt-1" />
                <Label htmlFor="confirm" className="text-sm font-normal">
                  I confirm that all details provided are accurate and I have sufficient USDC in my wallet to fund this
                  escrow.
                </Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full">
              <Lock className="h-4 w-4 mr-2" />
              Create Escrow & Deposit Funds
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              You'll need to approve the transaction in your wallet. The funds will be transferred to the escrow smart
              contract.
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
