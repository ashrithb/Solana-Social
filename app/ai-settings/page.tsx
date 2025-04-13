import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Bot, Shield, Sparkles } from "lucide-react"

export default function AISettingsPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI Settings</h1>
        <p className="text-muted-foreground mb-6">Configure how AI features work with your account</p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Content Generation
              </CardTitle>
              <CardDescription>Configure how AI generates content for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ai-suggestions" className="flex-1">
                    <div>AI post suggestions</div>
                    <div className="text-sm text-muted-foreground">
                      Receive AI-generated post ideas based on your interests
                    </div>
                  </Label>
                  <Switch id="ai-suggestions" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="ai-completion" className="flex-1">
                    <div>Smart completion</div>
                    <div className="text-sm text-muted-foreground">AI will help complete your posts as you type</div>
                  </Label>
                  <Switch id="ai-completion" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="ai-trending" className="flex-1">
                    <div>Trending topic insights</div>
                    <div className="text-sm text-muted-foreground">Get AI analysis of trending topics</div>
                  </Label>
                  <Switch id="ai-trending" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Creativity level</Label>
                  <span className="text-sm text-muted-foreground">Balanced</span>
                </div>
                <Slider defaultValue={[50]} max={100} step={1} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Conservative</span>
                  <span>Balanced</span>
                  <span>Creative</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Content Moderation
              </CardTitle>
              <CardDescription>Configure how AI moderates content on your feed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content-filter" className="flex-1">
                    <div>Content filtering</div>
                    <div className="text-sm text-muted-foreground">
                      Filter potentially harmful or inappropriate content
                    </div>
                  </Label>
                  <Switch id="content-filter" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="spam-detection" className="flex-1">
                    <div>Spam detection</div>
                    <div className="text-sm text-muted-foreground">Automatically detect and hide spam content</div>
                  </Label>
                  <Switch id="spam-detection" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sentiment-analysis" className="flex-1">
                    <div>Sentiment analysis</div>
                    <div className="text-sm text-muted-foreground">Analyze sentiment of posts and comments</div>
                  </Label>
                  <Switch id="sentiment-analysis" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Moderation strictness</Label>
                  <span className="text-sm text-muted-foreground">Balanced</span>
                </div>
                <Slider defaultValue={[50]} max={100} step={1} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Lenient</span>
                  <span>Balanced</span>
                  <span>Strict</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Personalization
              </CardTitle>
              <CardDescription>Configure how AI personalizes your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="personalized-feed" className="flex-1">
                    <div>Personalized feed</div>
                    <div className="text-sm text-muted-foreground">
                      AI will curate your feed based on your interests
                    </div>
                  </Label>
                  <Switch id="personalized-feed" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="connection-suggestions" className="flex-1">
                    <div>Connection suggestions</div>
                    <div className="text-sm text-muted-foreground">
                      Receive AI-powered suggestions for new connections
                    </div>
                  </Label>
                  <Switch id="connection-suggestions" defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Data usage</h4>
                <p className="text-sm text-muted-foreground">
                  Your data is used to train our AI models to provide better personalization. You can opt out at any
                  time, but this may reduce the quality of AI features.
                </p>
                <div className="flex items-center justify-between mt-2">
                  <Label htmlFor="data-collection" className="flex-1">
                    <div>Allow data collection for AI training</div>
                  </Label>
                  <Switch id="data-collection" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Settings</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
