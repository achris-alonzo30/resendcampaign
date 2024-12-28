"use client";

import { useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DashboardAppSidebar } from "@/features/dashboard/components/DashboardAppSidebar"
import { Button } from "@/components/ui/button";
import { Archive, Clock, Forward, MoreVertical, Reply, Trash2, Users } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { DashboardEmailComposer } from "@/features/dashboard/components/DashboardEmailComposer";

export default function DashboardPage() {
  const [selectedEmail, setSelectedEmail] = useState(0)
  
  const emails = [
    {
      id: 1,
      sender: "William Smith",
      avatar: "WS",
      subject: "Meeting Tomorrow",
      preview: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we...",
      timestamp: "Oct 22, 2023, 9:00:00 AM",
      replyTo: "williamsmith@example.com",
      tags: ["meeting", "work", "important"],
      fullContent: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William"
    },
    {
      id: 2,
      sender: "Alice Smith",
      avatar: "AS",
      subject: "Re: Project Update",
      preview: "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I...",
      timestamp: "about 1 year ago",
      tags: ["work", "important"],
      fullContent: "Thank you for the project update..."
    },
    // Add more email objects as needed
  ]
  return (
    <SidebarProvider>
      <DashboardAppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Inbox</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Right Section - Email Content */}
        {/* <div className="flex-1 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex gap-2">
              <Button size="icon" variant="ghost">
                <Archive className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Clock className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost">
                <Reply className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Forward className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <ScrollArea className="flex-1">
            {emails[selectedEmail] && (
              <div className="p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <div className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center">
                      {emails[selectedEmail].avatar}
                    </div>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="font-semibold text-lg">
                          {emails[selectedEmail].subject}
                        </h2>
                        <div className="text-sm text-muted-foreground">
                          From: {emails[selectedEmail].sender}
                        </div>
                        {emails[selectedEmail].replyTo && (
                          <div className="text-sm text-muted-foreground">
                            Reply-To: {emails[selectedEmail].replyTo}
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {emails[selectedEmail].timestamp}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pl-12 whitespace-pre-line">
                  {emails[selectedEmail].fullContent}
                </div>
              </div>
            )}
          </ScrollArea>
          <div className="p-4 border-t">
            <Textarea
              placeholder="Reply to email..."
              className="resize-none"
            />
            <div className="flex justify-between mt-2">
              <Button size="sm" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Mute thread
              </Button>
              <Button size="sm">Send</Button>
            </div>
          </div>
        </div> */}
        <DashboardEmailComposer />
      </SidebarInset>
    </SidebarProvider>
  )
}
