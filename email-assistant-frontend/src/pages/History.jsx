import "./History.css";

function History() {
  const history = JSON.parse(localStorage.getItem("history") || "[]");

  return (
    <div className="history-bg">
      <h1 className="history-title">History</h1>

      <div className="history-list">
        {history.length === 0 && <p>No history yet.</p>}

        {history.map((item, index) => (
          <div className="history-card glass-card" key={index}>
            <p><strong>Original Email:</strong> {item.emailContent}</p>
            <p><strong>AI Reply:</strong> {item.reply}</p>
            <small>{new Date(item.time).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
