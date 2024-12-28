'use client'

import { useState } from 'react'
import { ArrowLeft, Settings2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { api } from '../../../../convex/_generated/api'
import { useMutation } from 'convex/react'

export const DashboardEmailComposer = () => {
    const sendEmail = useMutation(api.users.sendEmail);

  const [showCommands, setShowCommands] = useState(false);
  const [email, setEmail] = useState({
    to: "",
    body: "",
    subject: "",
  });

  const handleSendEmail = async () => {
    await sendEmail({
      to: email.to,
      body: email.body,
      subject: email.subject,
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings2 className="h-4 w-4" />
          </Button>
          <span>Templates</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2" />
            just now
          </span>
          <Button variant="outline" size="sm">Test email</Button>
          <Button onClick={handleSendEmail} size="sm">Send</Button>
        </div>
      </header>

      {/* Main Content */}
      <ScrollArea className="flex-1">
        <div className="container max-w-3xl mx-auto py-8 px-4">
          <div className="space-y-6">
            {/* Email Form */}
            <div className="grid grid-cols-[1fr,200px] gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Input 
                    id="from" 
                    defaultValue="Acme <acme@example.com>" 
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Input 
                    id="to" 
                    placeholder="Recipients" 
                    className="bg-background"
                    value={email.to}
                    onChange={(e) => setEmail({ ...email, to: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="Subject" 
                    className="bg-background"
                    value={email.subject}
                    onChange={(e) => setEmail({ ...email, subject: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="replyTo">Reply-To</Label>
                  <Input 
                    id="replyTo" 
                    placeholder="Reply-To address" 
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="when">When</Label>
                  <Input 
                    id="when" 
                    type="datetime-local" 
                    className="bg-background"
                  />
                </div>
              </div>
            </div>

            {/* Editor Area */}
            <div className="min-h-[500px] relative">
              <div className="absolute inset-0">
                <Textarea 
                  className="min-h-full resize-none border-0 focus-visible:ring-0" 
                  placeholder="Write your email..."
                  onKeyDown={(e) => {
                    if (e.key === '/' && !showCommands) {
                      e.preventDefault()
                      setShowCommands(true)
                    }
                  }}
                  value={email.body}
                  onChange={(e) => setEmail({ ...email, body: e.target.value })}
                />
              </div>
              {showCommands && (
                <div className="absolute bottom-4 left-4 right-4 bg-popover text-popover-foreground p-4 rounded-lg shadow-lg border">
                  <p className="text-sm text-muted-foreground">Press '/' for commands</p>
                  {/* Command palette content would go here */}
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

