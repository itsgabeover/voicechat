"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatApp from "./chat-app";
import { TranscriptProvider } from "@/app/contexts/TranscriptContext";
import { EventProvider } from "@/app/contexts/EventContext";

export default function FloatingChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="rounded-full w-12 h-12 p-0"
        variant="default"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
      {isChatOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-background border rounded-lg shadow-lg overflow-hidden">
          <TranscriptProvider>
            <EventProvider>
              <ChatApp />
            </EventProvider>
          </TranscriptProvider>
        </div>
      )}
    </div>
  );
}
