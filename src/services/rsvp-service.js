import apiClient from "./api-client.js";
import { getUsername } from "../utils/get-username.js";

function withUsername(data) {
  return { ...data, username: getUsername() };
}

export async function submitRsvp(data) {
  return apiClient.post("/send-telegram", {
    type: "rsvp",
    data: withUsername(data),
  });
}

export async function submitMessage(data) {
  return apiClient.post("/send-telegram", {
    type: "message",
    data: withUsername(data),
  });
}

export async function submitSurvey(data) {
  return apiClient.post("/send-telegram", {
    type: "survey",
    data: withUsername(data),
  });
}
