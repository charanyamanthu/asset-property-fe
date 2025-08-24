import React, { useState } from "react";
import Card from "./Card";
import Button from "./Button";
import '../styles/ContactAgent.css';
import { sendContactRequest } from "../services/apiService";
import { validateContactForm } from "../utils/formValidation";

const ContactAgent = ({ propertyData }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: `Inquiry about property: ${propertyData?.location || 'N/A'}`, // Pre-fill message with property info
    viewProperty: true,
    dataConsent: false,
    propertyId: `${propertyData?.location || 'N/A'}` // Add property ID to form data
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check for data consent
    if (!formData.dataConsent) {
      setSubmitStatus({
        success: false,
        message: "Please agree to the data consent to proceed."
      });
      return;
    }
    
    // Use the validation utility
    const validationResult = validateContactForm(formData);
    if (!validationResult.isValid) {
      setSubmitStatus({
        success: false,
        message: validationResult.message
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      setSubmitStatus(null);
      
      // Use the API service
      await sendContactRequest({
        ...formData,
        requestDate: new Date().toISOString()
      });
      
      setSubmitStatus({
        success: true,
        message: "Your message has been sent successfully!"
      });
      
      // Show thank you message
      setShowThankYou(true);
      
      // Clear form after successful submission
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        message: "",
        viewProperty: true,
        dataConsent: false
      });
      
    } catch (error) {
      let errorMessage = "There was an error sending your message. Please try again later.";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setSubmitStatus({
        success: false,
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Thank You message component
  const ThankYouMessage = () => (
    <div className="thank-you-message">
      <h3>Thank you for your inquiry!</h3>
      <p>Our team will contact you soon. If you do not receive a response within 24 hours, please check your spam folder or call us directly.</p>
      <Button 
        type="button" 
        label="Submit another request" 
        onClick={() => setShowThankYou(false)}
      />
    </div>
  );

  return (
    <Card>
      <div className="contact-container">
        <h2 className="contact-title">Contact agent</h2>
        
        {submitStatus && (
          <div className={`status-message ${submitStatus.success ? 'success' : 'error'}`}>
            {submitStatus.message}
          </div>
        )}
        
        {showThankYou ? (
          <ThankYouMessage />
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label className="input-label">Full name</label>
              <input
                className="input-field"
                type="text"
                name="fullName"
                placeholder="Name Surname"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="input-label">Email</label>
              <input
                className="input-field"
                type="email"
                name="email"
                placeholder="email@address.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="input-label">Phone number</label>
              <input
                className="input-field"
                type="tel"
                name="phoneNumber"
                placeholder="+1 000 000 000"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="input-label">Your message</label>
              <textarea
                className="textarea-field"
                name="message"
                placeholder="Write your message here"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* Data Consent Checkbox */}
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="dataConsent"
                name="dataConsent"
                checked={formData.dataConsent}
                onChange={handleChange}
                required
              />
              <label htmlFor="dataConsent" className="checkbox-text">
                I agree that my data will be shared with the Samriddhi asset management team.
              </label>
            </div>

            {/* Disclaimer */}
            <div className="data-disclaimer">
              <small>
                Your information will only be used to respond to your inquiry. We do not sell or share your data with third parties.
              </small>
            </div>

            <Button 
              type="submit" 
              label="Send message" 
              icon="email" 
              isLoading={isSubmitting}
              disabled={isSubmitting}
            />
          </form>
        )}
      </div>
    </Card>
  );
};

export default ContactAgent;