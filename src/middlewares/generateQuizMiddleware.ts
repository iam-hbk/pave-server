import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { dowloadDocument } from "./../../utils/index";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "langchain/schema/runnable";
import { Document } from "langchain/document";
import { generateQuizUsingOpenai } from "./quizChain";

export const generateEmbeddings = async (
  filePath: string,
  topic: string,
  numberOfQuestions: number
) => {
  console.log("Process started Generating...", filePath);
  const splitter = new RecursiveCharacterTextSplitter();

  try {
    try {
      await dowloadDocument(filePath);
    } catch (error) {
      throw new Error("Error downloading file");
    }

    //Load the document
    const loader = new PDFLoader("src/course-material/downloaded-file.pdf");
    const rawDocuments = await loader.load();

    //split the document into chunks
    const splittedDocs = await splitter.splitDocuments(rawDocuments);

    // Load the docs into the vector store
    const vectorStore = await HNSWLib.fromDocuments(
      splittedDocs,
      new OpenAIEmbeddings()
    );

    // Initialize a retriever wrapper around the vector store
    const vectorStoreRetriever = vectorStore.asRetriever();
    
    const context = await vectorStore.similaritySearch(topic);
    // Serialize the documents into a string
    const serializedDocs = (docs: Array<Document>) =>
      docs.map((doc) => doc.pageContent).join("\n\n");
    const serializedContext = serializedDocs(context);

    const resutl = await generateQuizUsingOpenai(
      topic,
      numberOfQuestions,
      serializedContext
    );

    return resutl;
  } catch (error) {
    console.log("ERROR", error);
    return false;
  } finally {
    console.log("Process ended Generating...", filePath);
  }
};
