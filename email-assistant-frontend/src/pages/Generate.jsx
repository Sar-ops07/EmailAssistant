import { useState } from "react";
import axios from "axios";
import "./Generate.css";

function Generate() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");

  const generateReply = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:9878/api/email/generate",
        {
          emailContent,
          tone,
        }
      );

      const text =
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data);

      setReply(text);

      // Save to history
      const history = JSON.parse(localStorage.getItem("history") || "[]");
      history.unshift({ emailContent, reply: text, time: new Date() });
      localStorage.setItem("history", JSON.stringify(history));
    } catch (error) {
      setReply("Error while generating reply.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gen-bg">
      <div className="gen-container glass-card">
        <h1 className="gen-title">Generate Email Reply</h1>

        <textarea
          className="gen-input"
          rows="6"
          placeholder="Paste the original email here..."
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
        />

        <select
          className="gen-select"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="">Select Tone</option>
          <option value="Professional">Professional</option>
          <option value="Casual">Casual</option>
          <option value="Friendly">Friendly</option>
        </select>

        <button
          className="gen-btn"
          onClick={generateReply}
          disabled={!emailContent || loading}
        >
          {loading ? "Generating..." : "Generate Reply"}
        </button>

        <textarea
          className="gen-output"
          rows="6"
          placeholder="Generated reply will appear here..."
          value={reply}
          readOnly
        />

        <button
          className="copy-btn"
          onClick={() => navigator.clipboard.writeText(reply)}
          disabled={!reply}
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}

export default Generate;
