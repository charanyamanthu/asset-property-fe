import React from 'react';
import '../styles/TermsOfService.css';

const TermsOfService = ({ onBack }) => {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1 className="terms-title">Terms of Service</h1>
        <p className="terms-date">
          <strong>Effective Date:</strong> March 1, 2025 
          <strong className="terms-last-updated">Last Updated:</strong> March 23, 2025
        </p>

        <section className="terms-intro">
          <p>
            Welcome to <strong>Samriddhi Assets</strong> ("Company", "we", "us", "our"),  hereinafter referred to as <strong>Samriddhi</strong> in this document.
            These <strong>Terms of Service</strong> govern your use of our website <strong>www.samriddhiassets.com</strong> and related services.
          </p>
          <p>
            By accessing our website or using our services, you agree to these Terms. 
            If you <strong>do not agree</strong>, please do not use our website or services.
          </p>
        </section>

        <section className="terms-section">
          <h2>1. Definitions</h2>
          <ul>
            <li><strong>"User"</strong> refers to anyone who visits our website or interacts with our services.</li>
            <li><strong>"Services"</strong> refers to property inquiries, rental management, and other property-related offerings by Samriddhi.</li>
            <li><strong>"Website"</strong> refers to <strong>www.samriddhiassets.com</strong>.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>2. Use of Our Services</h2>
          <p>To use our services, you must:</p>
          <ul className="check-list">
            <li>Be at least <strong>18 years old</strong> or have parental/guardian consent.</li>
            <li>Provide <strong>accurate and complete information</strong> when submitting inquiries.</li>
            <li>Comply with all applicable <strong>Canadian laws</strong> and <strong>Ontario real estate regulations</strong>.</li>
          </ul>

          <p>🚫 You <strong>agree NOT to</strong>:</p>
          <ul className="x-list">
            <li>Use our services for fraudulent, illegal, or unauthorized purposes.</li>
            <li>Submit false or misleading property inquiries.</li>
            <li>Interfere with the website's functionality or security.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>3. Property Inquiries & Transactions</h2>
          <ul>
            <li>Samriddhi <strong>does not own or manage properties</strong>; we only act as an intermediary between users and property management teams.</li>
            <li>Inquiry submissions <strong>do not guarantee</strong> property availability or response from property managers.</li>
            <li>Any agreements between landlords, tenants, or buyers <strong>are separate contracts</strong> that do not involve Samriddhi.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>4. Payments & Fees</h2>
          <ul>
            <li>Our website currently <strong>does not process payments</strong> or charge fees for submitting inquiries.</li>
            <li>If paid services are introduced in the future, payment terms will be outlined separately.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>5. Intellectual Property</h2>
          <p>
            All content on our website, including <strong>logos, text, images, and designs</strong>, is owned by Samriddhi or used with permission. You <strong>may not</strong>:
          </p>
          <ul className="x-list">
            <li>Copy, modify, or distribute our content without permission.</li>
            <li>Use our branding for commercial purposes without written consent.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>6. Privacy Policy</h2>
          <p>
            Your use of our services is also governed by our <strong>Privacy Policy</strong>, which explains how we handle personal information.
          </p>
        </section>

        <section className="terms-section">
          <h2>7. Disclaimers & Limitation of Liability</h2>
          <ul>
            <li>Our website and services are provided <strong>"as is"</strong> without warranties of any kind.</li>
            <li>Samriddhi <strong>is not responsible</strong> for financial losses, property disputes, or damages arising from transactions.</li>
            <li>We <strong>do not guarantee</strong> uninterrupted website availability.</li>
          </ul>
          <p>
            To the maximum extent permitted by law, <strong>Samriddhi shall not be liable</strong> for any indirect, incidental, or consequential damages related to your use of our services.
          </p>
        </section>

        <section className="terms-section">
          <h2>8. Termination of Services</h2>
          <p>We reserve the right to:</p>
          <ul className="check-list">
            <li>Suspend or terminate access for users who violate our Terms.</li>
            <li>Modify or discontinue any part of our services without prior notice.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>9. Governing Law</h2>
          <p>
            These Terms shall be governed by the <strong>laws of Ontario, Canada</strong>. Any disputes shall be resolved in <strong>Ontario courts</strong>.
          </p>
        </section>

        <section className="terms-section">
          <h2>10. Changes to These Terms</h2>
          <p>
            We may update these Terms periodically. Changes will be posted on this page with a revised <strong>"Last Updated"</strong> date. Continued use of our services after changes means you <strong>accept the revised Terms</strong>.
          </p>
        </section>

        <section className="terms-section">
          <h2>11. Contact Us</h2>
          <p>
            For any questions or concerns, you can contact us at:
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

export default TermsOfService;