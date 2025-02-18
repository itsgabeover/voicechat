"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatApp from "./chat-app";

export default function FloatingChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent the default behavior
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleButtonClick}
        className="rounded-full w-12 h-12 p-0"
        variant="default"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
      {isChatOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-background border rounded-lg shadow-lg overflow-hidden">
          <ChatApp />
        </div>
      )}
    </div>
  );
}
