import { Server, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import { sendNotifications } from "./expoNotifications";

//pipelines
import session, { newSessionPipeline } from "../models/classSession";
import user, { walletChangePipeline } from "../models/user";

export function setupSocket(server: HTTPServer): void {
  console.log("Setting up socket.io server...");
  const io = new Server(server);

  io.on("connection", (socket: Socket) => {
    console.log("New client connected");

    // Watch for changes in the session collection
    const newSessionStream = session.watch(newSessionPipeline);
    const walletChangeStream = user.watch(walletChangePipeline);

    newSessionStream.on("change", (change: any) => {
      // Adjust the type of 'change' based on your setup
      console.log(
        "A new session has been created or updated:",
        change.fullDocument
      );
      socket.emit("newClassSession", change.fullDocument);

      // Trigger push notifications
      // const tokens: string[] = []; // Fetch the push tokens for the users you want to notify
      // const message = "A new session has been created or updated!";
      // sendNotifications(tokens, message).catch(console.error);
    });
    walletChangeStream.on("change", (change:any) => {
      console.log("Wallet change detected:", change);
      io.emit("wallet change", change);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      newSessionStream.close();
    });
  });
}
