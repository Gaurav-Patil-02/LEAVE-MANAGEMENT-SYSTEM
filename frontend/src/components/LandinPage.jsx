import React  from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/login");
  };


  return (
    <>
      <nav className="navbar">
        <div className="logo">HYSCALER</div>
        <input type="checkbox" id="menu-toggle" hidden />
        <label htmlFor="menu-toggle" className="menu-icon">
          <i className="fas fa-bars"></i>
        </label>
        <ul className="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <div id="particles-js">
        <section className="hero">
          <div className="hero-left">
            <h1>
              Employee Leave Management
              <br />
              System
            </h1>
            <p className="tagline">
              A simple yet powerful system designed exclusively for HyScaler to
              manage employee leaves with clarity, efficiency, and transparency
              across all teams.
            </p>
            <div className="buttons">
              <button className="btn primary" onClick={onClickHandler}>
                Login
              </button>
            </div>
          </div>
          <div className="hero-right">
            <img
              src="/assets/img/illustration/illustration-28.webp"
              alt="Gaurav"
              className="floating-img"
            />
          </div>
        </section>
      </div>

      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-img">
              <img
                src="/assets/img/illustration/illustration-6.webp"
                alt="Profile"
                className="floating-img"
              />
            </div>
            <div className="about-content">
              <h5 className="section-subtitle"></h5>
              <h2>About</h2>
              <p>
              This project is a custom-built Employee Leave Management System designed specifically for HyScaler. It provides a simple and efficient way for employees to apply for leave and for managers to review, approve, or reject requests with ease. With real-time leave balance tracking and a clear approval workflow, the system helps streamline internal HR processes and improve transparency across teams. Built using React, Node.js, and MySQL, this solution is tailored to meet HyScaler’s internal operational needs with a focus on usability and performance.
              </p>

             
            </div>
          </div>
        </div>
      </section>

  

      <section className="services" id="services">
        <div className="services-heading">
    <h2>Our Services</h2>
    <p>Streamlined services to manage employee leaves effortlessly.</p>
  </div>
    <div className="services-container">
      <div className="service-box" onClick={onClickHandler}>
        <h3>Role-Based User Access</h3>
        <p>Designed with separate access levels for employees and managers, the system ensures secure authentication and provides relevant features based on user roles, maintaining operational control and data integrity.</p>
      </div>
      <div className="service-box" onClick={onClickHandler}>
        <h3>Leave Request Workflow</h3>
        <p>Employees can apply for different types of leave by filling out a detailed form. All requests are automatically sent to the appropriate manager for review, approval, or rejection along with optional comments.</p>
      </div>
      <div className="service-box" onClick={onClickHandler}>
        <h3> Leave Balance Tracking</h3>
        <p>The system tracks vacation and sick leave balances for each employee. Balances are updated in real-time as leave is approved or rejected, ensuring transparency and accuracy in available days.</p>
      </div>
      <div className="service-box" onClick={onClickHandler}>
        <h3>Leave Calendar View</h3>
        <p>A calendar-based view highlights approved leaves, helping teams and managers stay informed about employee availability and plan projects or shifts accordingly.</p>
      </div>
    </div>
  </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea rows="5" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" className="btn primary">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <h3>GAURAV.DEV</h3>
          <p>Engineering web experiences with structure & soul 💻❤️</p>
          <div className="social-icons">
            <a
              href="https://github.com/Gaurav-Patil-02"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/gaurav-patil-5572a6311/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://instagram.com/gaurav_0.2"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <p className="copyright">© 2025 Gaurav Patil.</p>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
