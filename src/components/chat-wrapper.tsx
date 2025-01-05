"use client";
import { type Message, useChat } from "ai/react";
import { Messages } from "./messages";
import { ChatInput } from "./chat-input";

export const ChatWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: Message[];
}) => {
  const { input, handleInputChange, handleSubmit, messages, setInput } =
    useChat({
      api: "/api/chat-stream",
      body: { sessionId },
      initialMessages,
    });

  return (
    <div className="max-w-2xl pt-24 mx-auto h-screen flex flex-col justify-between py-4">
      <div className="flex flex-1 flex-col gap-4 h-full">
        <Messages messages={messages} />
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
