import { GeneratedQuestion } from "../interfaces/quiz";
import { z } from "zod";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import {
  StructuredOutputParser,
  OutputFixingParser,
} from "langchain/output_parsers";

const outputParser = StructuredOutputParser.fromZodSchema(
  z
    .array(
      z.object({
        questionText: z.string(),
        options: z.array(z.string()),
        correctAnswer: z.number().min(0).max(3),
      })
    )
    .describe("An array of Questions type")
);

const SAMPLE_RESPONSE: GeneratedQuestion[] = [
  {
    questionText: "What is the capital of France?",
    options: ["Rome", "Madrid", "Paris", "Berlin"],
    correctAnswer: 2,
  },
  {
    questionText: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    questionText: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    correctAnswer: 3,
  },
];

const model = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0.5,
});

const outputFixingParser = OutputFixingParser.fromLLM(model, outputParser);

const prompt = new PromptTemplate({
  template: `
        Generate multiple-choice questions each question along with four answer options. 
        The topic is {topic} and here is some {context}. and the number of questions is {numberOfquestions}.
        Specify the correct answer by providing its index (0-3) in the array of options.
        Format the output as a JSON object which is an array and each object with the following keys: 
        "questionText" for the question, "options" for an array of answer choices, and "correctAnswer" for the index of the correct answer. 
        Example:{format_instructions}
      `,
  inputVariables: ["topic", "numberOfquestions","context"],
  partialVariables: {
    format_instructions: outputFixingParser.getFormatInstructions(),
  },
});

// Function to generate questions
export const generateQuizUsingOpenai = async (
  topic: string,
  numberOfquestions: number,
  context: string
): Promise<GeneratedQuestion[]> => {


  const answerFormattingChain = new LLMChain({
    llm: model,
    prompt,
    outputKey: "questions",
    outputParser: outputFixingParser,
  });

  const result = await answerFormattingChain.call({
    topic,
    numberOfquestions,
    context,
  });

  console.log("RESULT", JSON.stringify(result, null, 2));

  return result.questions;
};
