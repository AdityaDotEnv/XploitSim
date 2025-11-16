import React, { useState, useEffect } from "react";
import "../App.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 800);
  };

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        setStatus("");
      }, 3000); // change duration here if needed
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="contact-container">
      <div className="cform">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Fill out the form below.</p>

        <form onSubmit={handleSubmit}>
          <label>
            Your Name
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Your Message
            <textarea
              name="message"
              rows="5"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="success-message">✓ Your feedback has been submitted</p>
          )}
        </form>
      </div>

      <div className="cimage">
        <img
          src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=800&q=80"
          alt="Contact"
        />
      </div>
    </div>
  );
}
