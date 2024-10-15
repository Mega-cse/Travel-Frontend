import React, { useState } from 'react';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('We\'ll get back to you soon!');
    // Optionally, you can also clear the form here if needed
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mt-5" style={styles.container}>
      <h1 className="text-center" style={styles.heading}>Any enquiry Contact Us?</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="message" style={styles.label}>Message</label>
          <textarea
            className="form-control"
            id="message"
            rows="4"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            style={styles.textarea}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" style={styles.button}>Send</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '50px',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '10px',
  },
  form: {
    marginTop: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Contact;
