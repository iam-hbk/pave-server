// src/notifications/expoNotifications.ts

import {
  Expo,
  ExpoPushMessage,
  ExpoPushReceipt,
  ExpoPushTicket,
} from "expo-server-sdk";

// Create a new Expo SDK client
let expo = new Expo();

export async function sendNotifications(
  tokens: string[],
  message: string
): Promise<void> {
  // Create the messages that you want to send to clients
  let messages: ExpoPushMessage[] = [];

  for (let pushToken of tokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    // Construct a message
    messages.push({
      to: pushToken,
      sound: "default",
      body: message,
      data: { someData: "goes here" },
    });
  }

  // Send notifications
  let chunks = expo.chunkPushNotifications(messages);
  let tickets: ExpoPushTicket[] = [];

  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }

  // Optionally, you might want to wait for the receipts
  // if you want to handle delivery confirmation
  // let receiptIds = tickets.filter(ticket => ticket.status === 'ok').map(ticket => ticket.id);
  // let receipts: ExpoPushReceipt[] = [];

  // let receiptChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  // for (let chunk of receiptChunks) {
  //   try {
  //     let receiptsChunk = await expo.getPushNotificationReceiptsAsync(chunk);
  //     receipts.push(...Object.values(receiptsChunk));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
}
