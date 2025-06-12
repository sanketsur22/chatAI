"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  Plus,
  Settings,
  User,
  X,
  Trash2,
  Edit3,
  LogOut,
} from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
}

export function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const { user, isLoaded } = useUser();
  const [chatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Getting Started",
      timestamp: new Date("2024-01-01T12:00:00Z"),
      preview: "Hello! I'm your AI assistant...",
    },
    {
      id: "2",
      title: "File Upload Help",
      timestamp: new Date("2023-12-31T12:00:00Z"),
      preview: "How to upload documents...",
    },
    {
      id: "3",
      title: "Code Review",
      timestamp: new Date("2023-12-30T12:00:00Z"),
      preview: "Can you review this React component...",
    },
  ]);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed md:relative inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 border-r
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        md:block
      `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Chat History</h2>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onClose}
                  className="md:hidden"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Sessions */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-2">
              {chatSessions.map((session) => (
                <Card
                  key={session.id}
                  className="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <h3 className="font-medium text-sm truncate">
                          {session.title}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 truncate mb-1">
                        {session.preview}
                      </p>
                      <p className="text-xs text-gray-400">
                        {session.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Edit3 className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-red-500"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>

          {/* Sidebar Footer */}
          <div className="p-4 border-t space-y-2">
            {isLoaded && user ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 px-2 py-1">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user.imageUrl}
                      alt={user.username || "User"}
                    />
                    <AvatarFallback>
                      {user.username?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      {user.fullName || user.username}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <SignOutButton>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500 hover:text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </SignOutButton>
                </div>
              </div>
            ) : (
              <div className="flex justify-center py-4">
                <div className="w-6 h-6 border-t-2 border-blue-600 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
