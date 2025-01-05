"use client";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useChat } from "ai/react";
import { toast } from "sonner";
import { useMemo } from "react";

const indexedUrlSchema = z.object({
  url: z
    .string({ message: "Digite uma URL válida." })
    .url({ message: "URL inválida" }),
});
type TIndexedUrl = z.infer<typeof indexedUrlSchema>;
type SetMessages = ReturnType<typeof useChat>["setMessages"];
export const ChatInoutIndexedUrls = ({
  setMessages,
}: {
  setMessages: SetMessages;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const getChatUrl = useMemo(() => {
    const url = pathname.split("/chat/")[1];
    return url ?? "";
  }, [pathname]);

  const form = useForm<TIndexedUrl>({
    resolver: zodResolver(indexedUrlSchema),
    defaultValues: {
      url: getChatUrl,
    },
  });

  async function onSubmit(formData: TIndexedUrl) {
    router.push(`/chat/${formData.url}`);
    toast.success("URL definida com sucesso!");
    setMessages([]);
  }

  return (
    <motion.header
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
      className="border p-0.5 mx-auto z-30 w-[95%] sm:w-full rounded-full fixed left-1/2 -translate-x-1/2 top-4 max-w-2xl text-white flex items-center justify-center"
    >
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            [
              "relative focus-within:ring-1 focus-within:ring-offset-2 ring-primary ring-offset-zinc-700 flex-1 h-full min-h-10 flex bg-zinc-900 rounded-full px-6 items-center",
            ],
            {
              "ring-destructive ring-offset-zinc-800":
                form.formState.errors.url,
            }
          )}
          initial={{
            y: -100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="https://seuwebsiteaqui.com"
                    className={cn([
                      "peer border-none focus-visible:ring-0 w-full flex-1 focus-visible:ring-offset-0",
                    ])}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            className="absolute right-1 size-8 rounded-full"
            variant="default"
            size="icon"
            type="submit"
          >
            <ArrowRight className="size-4" />
          </Button>
        </motion.form>
      </Form>
    </motion.header>
  );
};
