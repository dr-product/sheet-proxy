// api/runPlan.js

import fetch from "node-fetch";

// This function runs every time someone sends a request to your proxy
export default async function handler(req, res) {
  if (req.method !== "POST") {
    // If the request is not POST, show an error
    return res.status(405).json({ error: "Only POST supported" });
  }

  try {
    // This is your working Google Apps Script URL
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbyXKV8XoIraVcHgOs42Zlf2REL5MaCyuZwJF3lxlkXyxRL5iPkwFNJKSWSVySU0LRzOYQ/exec?path=plan";

    // Send whatever GPT sends to this proxy → forward it to Google Script
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    // Take the response from Google Script and send it back to GPT
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
