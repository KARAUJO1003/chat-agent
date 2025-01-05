import { cn } from "@/lib/utils";
import { type Message as TMessage } from "ai/react";
import { Bot, MessageSquare } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
interface MessagesProps {
  messages: TMessage[];
  isLoading?: boolean;
}

export const Messages = ({ messages, isLoading }: MessagesProps) => {
  return (
    <ScrollArea className="px-4 snap-end py-6">
      <div className="flex gap-4 h-full flex-1 flex-col">
        {messages.length ? (
          messages.map((message, i) => (
            <Message
              key={i}
              content={message.content}
              isUserMessage={message.role === "user"}
            />
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-2">
            <MessageSquare className="size-8 text-blue-500" />
            <h3 className="font-semibold text-xl text-white">
              You&apos;re all set!
            </h3>
            <p className="text-zinc-500 text-sm">
              Ask your first question to get started.
            </p>
          </div>
        )}
        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

interface MessageProps {
  content: string;
  isUserMessage: boolean;
}

export const Message = ({ content, isUserMessage }: MessageProps) => {
  const avatarBotStyle = cn(
    [
      "flex justify-center items-center",
      "size-10 shrink-0 aspect-square rounded-full",
      "border border-zinc-700 bg-zinc-900",
    ],
    {
      "bg-blue-950 border-blue-700 text-zinc-200": isUserMessage,
    }
  );

  return (
    <div
      className={cn(["rounded-xl w-fit"], {
        "bg-zinc-800 ml-auto": isUserMessage,
        "bg-zinc-900/25": !isUserMessage,
      })}
    >
      <div className="px-6 py-4">
        <div
          className={cn(["max-w-3xl mx-auto flex items-start gap-4"], {
            "flex-row-reverse": isUserMessage,
          })}
        >
          {isUserMessage ? null : (
            <div className={avatarBotStyle}>
              <Bot className="size-5 text-white" />
            </div>
          )}

          <div className="flex flex-col w-full">
            <div className="flex items-center space-x-2">
              <span
                className={cn(
                  ["text-sm font-semibold text-gray-900 dark:text-white"],
                  {
                    "text-end w-full": isUserMessage,
                  }
                )}
              >
                {isUserMessage ? "Você" : "IA"}
              </span>
            </div>

            <p
              className={cn(
                [
                  "text-sm font-normal py-2.5 text-gray-900 dark:text-muted-foreground leading-normal",
                ],
                {
                  "text-end": isUserMessage,
                }
              )}
            >
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
