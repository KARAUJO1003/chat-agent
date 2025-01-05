"use client";
import { type useChat } from "ai/react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"];
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"];
type SetInput = ReturnType<typeof useChat>["setInput"];

interface ChatInputProps {
  input: string;
  handleInputChange: HandleInputChange;
  handleSubmit: HandleSubmit;
  setInput: SetInput;
}

export const ChatInput = ({
  input,
  handleInputChange,
  handleSubmit,
  setInput,
}: ChatInputProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="focus-within:ring-1 ring-primary focus-within:ring-offset-2 ring-offset-zinc-900 flex flex-col gap-2 items-center p-2 rounded-xl bg-zinc-800 border">
        <Textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
              setInput("");
            }
          }}
          placeholder="Digite uma mensagem no prompt..."
          className="peer max-h-32 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <div className="border w-full">
          <Button
            type="submit"
            className="w-full"
          >
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
};
