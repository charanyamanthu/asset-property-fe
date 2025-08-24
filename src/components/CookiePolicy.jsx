import React from 'react';
import '../styles/CookiePolicy.css';

const CookiePolicy = ({ onBack }) => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1 className="policy-title">Cookie Policy</h1>
        <p className="policy-date">
          <strong>Effective Date:</strong> January 1, 2025 
          <strong className="policy-last-updated">Last Updated:</strong> March 15, 2025
        </p>

        <section className="policy-intro">
          <p>
            At <strong>Samriddhi Assets</strong> ("Company", "we", "us", "our"), we are committed to respecting your privacy and ensuring transparency. 
            This Cookie Policy explains that we do <strong>not use cookies</strong> on our website, <strong>www.samriddhiassets.com</strong>.
          </p>
        </section>

        <section className="policy-section">
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on a user's device when they visit a website. 
            These files are used to remember user preferences, track activity, or provide functionality 
            like personalized content and advertising.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Our Use of Cookies</h2>
          <p>
            At present, we do <strong>not</strong> use any cookies or other tracking technologies on our website. 
            We do not collect any personal data via cookies, and we do not track users across websites 
            for advertising or analytical purposes.
          </p>
        </section>

        <section className="policy-section">
          <h2>3. Third-Party Cookies</h2>
          <p>
            We do not have any third-party services or partners that use cookies on our website at this time. 
            Our website does not utilize any third-party analytics, advertising, or tracking cookies.
          </p>
        </section>

        <section className="policy-section">
          <h2>4. Cookie Consent</h2>
          <p>
            Since we do not use cookies on our website, we do not require any cookie consent banners 
            or prompts to collect or track your data.
          </p>
        </section>

        <section className="policy-section">
          <h2>5. Updates to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy in the future if our practices change. 
            If we decide to use cookies or tracking technologies, we will update this policy accordingly 
            and notify you about the changes. Please review this page periodically to stay informed 
            about any updates.
          </p>
        </section>

        <section className="policy-section">
          <h2>6. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Cookie Policy, please feel free to contact us at:
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

export default CookiePolicy;