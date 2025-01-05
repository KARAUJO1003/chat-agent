"use client";
import { type Message, useChat } from "ai/react";
import { Messages } from "./messages";
import { ChatInput } from "./chat-input";
import { ChatInoutIndexedUrls } from "./chatinput-url-indexed";

export const ChatWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: Message[];
}) => {
  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    setInput,
    setMessages,
    isLoading,
    error,
  } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
    initialMessages,
  });

  return (
    <div className="max-w-2xl pt-16 mx-auto flex flex-col justify-between py-4">
      <ChatInoutIndexedUrls setMessages={setMessages} />
      <div className="flex flex-1 flex-col gap-4 h-full">
        <Messages
          messages={messages}
          isLoading={isLoading}
        />
        {error && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-red-500">{error.message}</div>
          </div>
        )}
      </div>

      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setInput={setInput}
      />
    </div>
  );
};
