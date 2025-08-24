import React from 'react';
import '../styles/PrivacyPolicy.css';

const PrivacyPolicy = ({ onBack }) => {
  return (
    <div className="privacy-policy">
      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-date">
          <strong>Effective Date:</strong> March 1, 2025 
          <strong className="privacy-last-updated">Last Updated:</strong> March 23, 2025
        </p>

        <section className="privacy-section">
          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong>Samriddhi Assets</strong> ("Company," "we," "our," "us"),hereinafter referred to as <strong>Samriddhi</strong> in this document. Your privacy is important to us, and we are committed to 
            protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect 
            your information when you visit our website <strong>www.samriddhiassets.com</strong> and use our property management services.
          </p>
          <p>
            By using our website and services, you agree to the terms of this Privacy Policy.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Information We Collect</h2>
          <p>
            We only collect limited personal information necessary for processing property inquiries. The types of information we collect include:
          </p>
          <h3>(a) Personal Information:</h3>
          <ul>
            <li>Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
          </ul>

          <h3>(b) Automatically Collected Information (Non-Personal):</h3>
          <ul>
            <li>Browser type & device information</li>
            <li>IP Address</li>
            <li>Website usage data (e.g., pages visited, time spent on the site)</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>3. How We Use Your Information</h2>
          <p>We use the information collected <strong>only to</strong>:</p>
          <ul>
            <li>Forward your inquiry <strong>via email</strong> to the property management team.</li>
            <li>Allow the team to contact you regarding your request.</li>
          </ul>
          <p className="important-notice">
            🚫 <strong>We do not store your personal information</strong> on our servers.
          </p>
        </section>

        <section className="privacy-section">
          <h2>4. How We Share Your Information</h2>
          <ul>
            <li>We <strong>do not</strong> sell, rent, or share your personal information with third parties.</li>
            <li>Your details are <strong>only shared via email</strong> with the property management team to facilitate your inquiry.</li>
            <li>We may disclose information if required by law or legal processes.</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>5. Data Security</h2>
          <ul>
            <li>Since we do not store your data, there is no long-term data retention.</li>
            <li>We use <strong>secure email transmission protocols</strong> to protect your information.</li>
            <li>While we take precautions, no online transmission is 100% secure.</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>6. Your Rights & Choices</h2>
          <p>
            As a user, you have the right to:
          </p>
          <ul>
            <li><strong>Choose not to submit your details</strong> if you do not wish to share them with our team.</li>
            <li><strong>Contact us</strong> if you have concerns about how your inquiry is handled at <strong>info@samriddhiassets.com</strong>.</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>7. Cookies & Tracking Technologies</h2>
          <ul>
            <li>We <strong>do not use cookies</strong> to track personal data.</li>
            <li>Third-party analytics services (e.g., Google Analytics) may collect anonymized usage data.</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>8. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are <strong>not responsible</strong> for their privacy policies or content.
          </p>
        </section>

        <section className="privacy-section">
          <h2>9. Updates to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Any changes will be posted here with a revised <strong>"Last Updated"</strong> date.
          </p>
        </section>

        <section className="privacy-section">
          <h2>10. Contact Us</h2>
          <p>
            For any privacy concerns, you can contact us at:
          </p>
          <div className="contact-info">
            <p>📧 <strong>Email:</strong> info@samriddhiassets.com</p>
          </div>
        </section>

        <button className="back-button" onClick={onBack}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;