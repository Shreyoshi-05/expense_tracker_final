
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import "../css/form.css";

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", import.meta.env.VITE_WEB3FORM_ACCESS_KEY);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => 
      res.json()
  );

    if (res.success) {
      console.log("Success", res);
      toast.success(res.message);
    }
  };


  return (
    <div className="contact_container">
      <Toaster />
      <div className="contact_card">

        <h2 className="contact_title">📩 Contact Us</h2>
        <p className="contact_subtitle">
          Have questions, feedback, or need help? We'd love to hear from you.
        </p>

        <form className="contact_form" onSubmit={onSubmit}>
          <div className="form_group">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" name="name"/>
          </div>

          <div className="form_group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" name="email"/>
          </div>

          <div className="form_group">
            <label>Message</label>
            <textarea placeholder="Write your message..." rows="4" name="message"></textarea>
          </div>

          <button className="contact_btn" type="submit">Send Message</button>
        </form>

        <div className="contact_info">
          <p>📧 support@yourapp.com</p>
          <p>📍 Kolkata, India</p>
        </div>

      </div>
    </div>
  );
};

export default Contact;