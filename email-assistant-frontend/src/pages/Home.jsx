import "./Home.css";

function Home() {
  return (
    <div className="home-bg">

      {/* NAVBAR */}
      <nav className="glass-nav">
        <h2 className="nav-logo">Email AI Assistant</h2>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/generate">Generate</a>
          <a href="/history">History</a>
          <a href="/about">About</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-left glass-card">
          <h1 className="hero-title">
            Write Emails Smarter,<br /> Faster, and Professionally.
          </h1>
          <p className="hero-subtitle">
            Your personal AI-powered email assistant — crafted to help you reply faster and in the perfect tone.
          </p>

          <a href="/generate" className="hero-btn">
            Start Writing →
          </a>
        </div>

        <div className="hero-right">
          <img
  src="https://cdn-icons-png.flaticon.com/512/9956/9956732.png"
  alt="AI Assistant Illustration"
  className="hero-illustration"
/>

        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="features-grid">
        <div className="feature glass-card">
          <h3>💡 AI-Powered Writing</h3>
          <p>Generate high-quality email responses instantly.</p>
        </div>
        <div className="feature glass-card">
          <h3>🎧 Tone Customization</h3>
          <p>Choose between Professional, Friendly, or Casual.</p>
        </div>
        <div className="feature glass-card">
          <h3>⚡ Instant Replies</h3>
          <p>Boost productivity with one-click smart responses.</p>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-container glass-card">
        <h2>Ready to improve your email writing?</h2>
        <a href="/generate" className="cta-btn">Generate My First Email →</a>
      </section>

      {/* FOOTER */}
      <footer className="glass-footer">
        <p>© 2025 Email AI Assistant — All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default Home;
