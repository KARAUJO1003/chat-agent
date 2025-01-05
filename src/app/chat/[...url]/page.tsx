import { ChatWrapper } from "@/components/chat-wrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

async function reconstructeUrl({ url }: { url: string[] }) {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component)
  );
  return decodedComponents.join("/");
}

export default async function Page({ params: { url } }: PageProps) {
  const sessionCookie = (await cookies()).get("sessionId")?.value;
  const reconstructedUrl = await reconstructeUrl({
    url: url as string[],
  });
  const keyRedis = "indexed-urls";
  const isAlreadyIndexed = await redis.sismember(keyRedis, reconstructedUrl);
  const sessionId = (reconstructeUrl + "--" + sessionCookie).replace(
    /\//g,
    "-"
  );
  const initialMessages = await ragChat.history.getMessages({
    amount: 10,
    sessionId,
  });
  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });

    await redis.sadd(keyRedis, reconstructedUrl);
  }

  return (
    <ChatWrapper
      sessionId={sessionId}
      initialMessages={initialMessages}
    />
  );
}
