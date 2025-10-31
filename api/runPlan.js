// api/runPlan.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST supported" });
  }

  try {
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbyXKV8XoIraVcHgOs42Zlf2REL5MaCyuZwJF3lxlkXyxRL5iPkwFNJKSWSVySU0LRzOYQ/exec?path=plan";

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    // Read as text first — Apps Script sometimes double-encodes JSON
    let raw = await response.text();
    let data;

    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.warn("Response was not valid JSON:", raw.slice(0, 200));
      data = { error: "Invalid JSON from Apps Script", raw };
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
