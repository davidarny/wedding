import apiClient from "./api-client.js";

export async function submitRsvp(data) {
  return apiClient.post("/send-telegram", {
    type: "rsvp",
    data,
  });
}

export async function submitMessage(data) {
  return apiClient.post("/send-telegram", {
    type: "message",
    data,
  });
}

export async function submitSurvey(data) {
  return apiClient.post("/send-telegram", {
    type: "survey",
    data,
  });
}
