import { Server, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import { sendNotifications } from "./expoNotifications";

//pipelines
import session, { newSessionPipeline } from "../models/classSession";
import user, { walletChangePipeline } from "../models/user";
import attendance, { newAttendancePipeline } from "../models/attendance";

export function setupSocket(server: HTTPServer): void {
  console.log("Setting up socket.io server...");
  const io = new Server(server);

  io.on("connection", (socket: Socket) => {
    console.log("New client connected");

    // Watch for changes in the session collection
    const newSessionStream = session.watch(newSessionPipeline);
    const walletChangeStream = user.watch(walletChangePipeline);
    const attendanceChangeStream = attendance.watch(newAttendancePipeline);

    newSessionStream.on("change", (change: any) => {
      console.log(
        "A new session has been created or updated:",
        change.fullDocument
      );

      // Emit the change data to the client
      socket.emit("newClassSession", change);

      // If you want to send push notifications
      // const tokens: string[] = []; // Fetch the push tokens for the users you want to notify
      // const message = "A new session has been created or updated!";
      // sendNotifications(tokens, message).catch(console.error);
    });

    walletChangeStream.on("change", (change: any) => {
      console.log("Wallet change detected:", change);
      io.emit("wallet change", change);
    });

    attendanceChangeStream.on("change", (change: any) => {
      console.log("Attendance change detected:", change);
      io.emit("newAttendance", change);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      newSessionStream.close();
      walletChangeStream.close(); // Close the walletChangeStream as well
    });

    // Handle potential errors from the streams
    newSessionStream.on("error", (error: any) => {
      console.error("Error in newSessionStream:", error);
    });

    walletChangeStream.on("error", (error: any) => {
      console.error("Error in walletChangeStream:", error);
    });

    attendanceChangeStream.on("error", (error: any) => {
      console.error("Error in attendanceChangeStream:", error);
    });
  });
}
