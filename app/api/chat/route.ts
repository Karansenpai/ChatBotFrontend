import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export async function POST(req: Request) {
  const { messages, model } = await req.json()

  // Map the model name to the actual model ID
  const modelId = model === "Luminous" ? "gpt-3.5-turbo" : "gpt-4"

  const result = streamText({
    model: openai(modelId),
    messages,
  })

  return result.toDataStreamResponse()
}

