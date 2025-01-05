"use client";
import { type useChat } from "ai/react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-4 w-[95%] max-w-2xl sm:w-full mx-auto"
    >
      <div className="focus-within:ring-1 ring-primary focus-within:ring-offset-2 ring-offset-zinc-900 flex flex-col gap-2 items-center p-2 rounded-xl bg-zinc-800/50 backdrop-blur-md border">
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
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="border w-full"
        >
          <Button
            disabled={!input.trim()}
            type="submit"
            className="w-full flex disabled:cursor-not-allowed p-0 items-center overflow-clip gap-2 font-semibold hover:bg-gradient-to-tr from-amber-500 to-pink-400 text-white"
          >
            <motion.div
              className="w-full flex-1 h-full flex items-center justify-center gap-2"
              animate={{
                background: [
                  "linear-gradient(90deg, #f59e0b, #ec4899)",
                  "linear-gradient(90deg, #2dd4bf, #fde68a)",
                  "linear-gradient(90deg, #d946ef, #06b6d4)",
                ],
              }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              Enviar <Sparkles className="size-4" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </form>
  );
};
