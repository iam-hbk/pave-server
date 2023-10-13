import { Request, Response } from "express";
import { generateEmbeddings } from "../middlewares/generateQuizMiddleware";

export const uploadDocument = async (req: Request, res: Response) => {
  try {
    const filePath = req.body.filePath;
    const topic = req.body.topic as string;
    const numberOfQuestions = req.body.numberOfQuestions;
    console.log("\nfilePath", filePath);
    console.log("topic", topic);
    console.log("numberOfQuestions", numberOfQuestions, "\n\n");
    if (!filePath || topic.length < 1 || !numberOfQuestions)
      throw new Error("Error: Missing required parameters");

    const result = await generateEmbeddings(filePath, topic, numberOfQuestions);
    // loadDocument(req.file.path);
    if (!result) {
      throw new Error("Error generating embeddings");
    }
    // const dataBuffer = await fs.readFile(req.file.path);
    // const data = await pdf(dataBuffer);

    // console.log(data.text); // Log the content of the PDF

    return res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: (error as Error).message,
    });
  }
};
