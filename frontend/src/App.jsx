
import { useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("overview");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const MAX_LENGTH = 1000;

  const changePage = (page) => {
    setActivePage(page);
    setResult(null);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // DEMO MESSAGE ANALYSIS
  const analyzeMessage = () => {
    const cleanedMessage = message.trim();

    if (!cleanedMessage) {
      setError("Please enter a message before proceeding.");
      setResult(null);
      return;
    }

    if (cleanedMessage.length < 5) {
      setError("Please enter a longer message for analysis.");
      setResult(null);
      return;
    }

    setError("");

    const lowerMessage = cleanedMessage.toLowerCase();

    const scamKeywords = [
      "otp", "urgent", "kyc", "blocked", "verify",
      "upi", "pin", "click here", "refund", "prize",
      "account suspended", "bank details", "ನಿಮ್ಮ",
      "ತಕ್ಷಣ", "ಲಿಂಕ್"
    ];

    const matchedKeywords = scamKeywords.filter((keyword) =>
      lowerMessage.includes(keyword)
    );

    const isSuspicious = matchedKeywords.length > 0;

    setResult({
      prediction: isSuspicious ? "scam" : "legitimate",
      confidence: isSuspicious ? 85 : 78,
      matchedKeywords,
      notice: "This is a demonstration result based on simple keyword matching, not a trained ML prediction."
    });
  };

  // CLEAR MESSAGE
  const clearMessage = () => {
    setMessage("");
    setResult(null);
    setError("");
  };

  return (
    <div className="app">
      {/* NAVIGATION */}
      <header className="professional-nav">
        <div className="container">
          <a
            href="#"
            className="brand"
            onClick={(e) => {
              e.preventDefault();
              changePage("overview");
            }}
          >
            <span className="brand-icon">🛡</span>
            <span>VaaniGuard</span>
          </a>

          <nav className="nav-links">
            <a
              href="#"
              className={activePage === "overview" ? "active-link" : ""}
              onClick={(e) => {
                e.preventDefault();
                changePage("overview");
              }}
            >
              Overview
            </a>

            <a
              href="#"
              className={activePage === "capabilities" ? "active-link" : ""}
              onClick={(e) => {
                e.preventDefault();
                changePage("capabilities");
              }}
            >
              Capabilities
            </a>
          </nav>

          <button
            className="nav-button"
            onClick={() => changePage("analyze")}
          >
            Analyze Message
          </button>
        </div>
      </header>

      <main className="container">
        {/* OVERVIEW PAGE */}
        {activePage === "overview" && (
          <div className="overview-page">
            <section className="professional-hero">
              <div className="hero-content">
                <div className="hero-badge">
                  <span>✦</span>
                  INTELLIGENT DIGITAL PAYMENT PROTECTION
                </div>

                <h1>
                  Every Message
                  <span> Deserves a Security Check.</span>
                </h1>

                <p className="professional-subtitle">
                  Understand suspicious digital payment messages with
                  context-aware NLP designed for Kannada, English and
                  Kannada-English communication.
                </p>

                <div className="hero-actions">
                  <button
                    className="nav-button"
                    onClick={() => changePage("analyze")}
                  >
                    Check a Message →
                  </button>

                  <button
                    className="secondary-button"
                    onClick={() => changePage("capabilities")}
                  >
                    Explore Capabilities
                  </button>
                </div>

                <div className="hero-trust">
                  <span>⌁ Multilingual Understanding</span>
                  <span>◈ Explainable AI</span>
                  <span>◇ Digital Safety</span>
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-orbit orbit-one"></div>
                <div className="hero-orbit orbit-two"></div>

                <div className="hero-shield">
                  <span>🛡</span>
                  <div className="shield-glow"></div>
                </div>

                <div className="language-card language-card-top">
                  <span className="language-dot"></span>
                  Kannada
                </div>

                <div className="language-card language-card-bottom">
                  <span className="language-dot"></span>
                  English · Kanglish
                </div>

                <div className="visual-caption">
                  <span>VAANIGUARD</span>
                  <p>Context-aware message protection</p>
                </div>
              </div>
            </section>

            <section className="overview-problem">
              <div>
                <span className="section-label">THE CHALLENGE</span>
                <h2>Digital Scams Are Not Always Easy to Recognize</h2>
              </div>

              <p>
                Fraudulent messages may appear as genuine bank alerts,
                KYC requests, OTP requests, refund offers or UPI payment
                notifications. Informal language and mixed-language
                expressions can make suspicious messages harder to identify.
              </p>
            </section>

            <section className="overview-mission">
              <span className="section-label">OUR OBJECTIVE</span>
              <h2>Making Digital Communication Safer</h2>

              <p>
                VaaniGuard is an NLP-based framework designed
                to identify suspicious patterns in multilingual digital
                payment messages and provide understandable explanations
                to support safer user decisions.
              </p>

              <button
                className="text-button"
                onClick={() => changePage("capabilities")}
              >
                Discover how it works →
              </button>
            </section>
          </div>
        )}

        {/* CAPABILITIES PAGE */}
        {activePage === "capabilities" && (
          <div className="capabilities-page">
            <section className="capabilities-hero">
              <span className="section-label">VAANIGUARD TECHNOLOGY</span>
              <h1>Built to Understand. Designed to Protect.</h1>
              <p>
                Explore the core capabilities of our
                Kannada-English digital payment scam detection framework.
              </p>
            </section>

            <section className="capability-details">
              <article className="capability-item">
                <div className="capability-number">01</div>
                <div>
                  <h2>Multilingual Language Processing</h2>
                  <p>
                    Designed to handle Kannada, English and Kannada-English
                    code-mixed messages, including Romanized Kannada and
                    informal expressions.
                  </p>
                </div>
              </article>

              <article className="capability-item">
                <div className="capability-number">02</div>
                <div>
                  <h2>Context-Aware Scam Identification</h2>
                  <p>
                    Focuses on suspicious patterns such as OTP requests,
                    KYC updates, payment links, refund claims, urgency
                    and impersonation.
                  </p>
                </div>
              </article>

              <article className="capability-item">
                <div className="capability-number">03</div>
                <div>
                  <h2>Explainable AI</h2>
                  <p>
                    Aims to highlight the words and message patterns
                    that contribute to a suspicious classification,
                    rather than showing only a prediction.
                  </p>
                </div>
              </article>

              <article className="capability-item">
                <div className="capability-number">04</div>
                <div>
                  <h2>Digital Safety Recommendations</h2>
                  <p>
                    Designed to provide practical guidance, helping
                    users recognize risky requests and protect
                    sensitive payment information.
                  </p>
                </div>
              </article>
            </section>

            <section className="workflow-section">
              <span className="section-label">PROPOSED WORKFLOW</span>
              <h2>How VaaniGuard Is Designed to Work</h2>

              <div className="workflow-steps">
                <div className="workflow-step">
                  <span>01</span>
                  <h3>Message Input</h3>
                  <p>User enters a digital payment message.</p>
                </div>

                <div className="workflow-step">
                  <span>02</span>
                  <h3>Language Processing</h3>
                  <p>Text is prepared for NLP-based analysis.</p>
                </div>

                <div className="workflow-step">
                  <span>03</span>
                  <h3>Scam Detection</h3>
                  <p>The model evaluates message patterns.</p>
                </div>

                <div className="workflow-step">
                  <span>04</span>
                  <h3>Results</h3>
                  <p>The prediction and probability scores are displayed.</p>
                </div>
              </div>
            </section>

            <button
              className="nav-button capability-cta"
              onClick={() => changePage("analyze")}
            >
              Try Message Analysis →
            </button>
          </div>
        )}

        {/* MESSAGE ANALYSIS PAGE */}
        {activePage === "analyze" && (
          <div className="analyze-page">
            <section className="analyze-intro">
              <span className="section-label">MESSAGE SECURITY CHECK</span>
              <h1>Analyze a Digital Payment Message</h1>
              <p>
                Enter an SMS, WhatsApp message or UPI notification
                to check for potentially suspicious activity.
              </p>
            </section>

            <section className="detection-card">
              <div className="card-heading">
                <h2>Message Analysis</h2>
                <span className="status">
                  ● {result ? "Analysis complete" : "Awaiting message"}
                </span>
              </div>

              <p>Paste your message in the box below.</p>

              <textarea
                value={message}
                maxLength={MAX_LENGTH}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setResult(null);
                  setError("");
                }}
                placeholder="Paste your SMS, WhatsApp message or UPI notification..."
              />

              <div className="input-footer">
                <span>
                  {message.length}/{MAX_LENGTH} characters
                </span>

                <div className="input-actions">
                  <button
                    type="button"
                    className="clear-button"
                    onClick={clearMessage}
                    disabled={!message}
                  >
                    Clear
                  </button>

                  <button
                    type="button"
                    onClick={analyzeMessage}
                    disabled={!message.trim()}
                  >
                    Analyze Message →
                  </button>
                </div>
              </div>

              {error && (
                <p className="analysis-error" role="alert">
                  {error}
                </p>
              )}

              {result && (
                <div className="result-preview">
                  <div className="result-preview-heading">
                    <span className="section-label">
                      VAANIGUARD DEMO ANALYSIS
                    </span>
                    <span className="demo-tag">DEMO RESULT</span>
                  </div>

                  <h2>Scam Detection Results</h2>

                  <p className="result-description">
                    Your message has been checked using a simple
                    demonstration keyword-matching approach.
                  </p>

                  <div className="result-status-grid">
                    <div className="result-status-card">
                      <span>CLASSIFICATION</span>
                      <strong>
                        {result.prediction.toUpperCase()}
                      </strong>
                      <p>Demo classification</p>
                    </div>

                    <div className="result-status-card">
                      <span>DEMO SCORE</span>
                      <strong>{result.confidence}%</strong>
                      <p>Illustrative score, not ML confidence</p>
                    </div>
                  </div>

                  <div className="result-detail">
                    <h3>◈ Matched Suspicious Keywords</h3>
                    <p>
                      {result.matchedKeywords.length > 0
                        ? result.matchedKeywords.join(", ")
                        : "No configured suspicious keywords were found."}
                    </p>
                  </div>

                  <div className="result-detail">
                    <h3>✦ Important Notice</h3>
                    <p>{result.notice}</p>
                    <p>
                      Do not treat a legitimate demo result as proof
                      that a message is safe. Never share your OTP,
                      UPI PIN or banking credentials.
                    </p>
                  </div>
                </div>
              )}
            </section>

            <div className="analysis-reminder">
              <strong>Safety reminder:</strong> Never share your OTP,
              UPI PIN, password or banking credentials with anyone.
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="professional-footer">
        <strong>VaaniGuard</strong>
        <p>Protecting Digital Payments Through Intelligent NLP</p>
        <span>© 2026 VaaniGuard | Academic Project</span>
      </footer>
    </div>
  );
}

export default App;
