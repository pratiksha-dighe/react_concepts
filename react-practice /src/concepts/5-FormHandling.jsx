import { useState } from 'react'

function FormHandling() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    country: '',
    subscribe: false
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.username) newErrors.username = 'Username is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (formData.email && !formData.email.includes('@')) newErrors.email = 'Invalid email'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (!formData.country) newErrors.country = 'Country is required'
    
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true)
      setErrors({})
      console.log('Form submitted:', formData)
    } else {
      setErrors(newErrors)
      setSubmitted(false)
    }
  }

  const handleReset = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      country: '',
      subscribe: false
    })
    setSubmitted(false)
    setErrors({})
  }

  return (
    <div>
      <h2 className="section-title">5️⃣ Form Handling</h2>
      
      <div className="card">
        <h3 className="subsection-title">Controlled Components</h3>
        <div className="code-block">
{`const [input, setInput] = useState('');

const handleChange = (e) => {
  setInput(e.target.value);
};

return (
  <input 
    value={input}
    onChange={handleChange}
    placeholder="Type something"
  />
);`}
        </div>
      </div>

      <div className="card">
        <h3 className="subsection-title">Form Example</h3>
        
        {submitted && (
          <div className="success">
            ✅ Form submitted successfully!
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label>Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select a country</option>
              <option value="usa">USA</option>
              <option value="uk">UK</option>
              <option value="canada">Canada</option>
              <option value="other">Other</option>
            </select>
            {errors.country && <div className="error">{errors.country}</div>}
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleChange}
                style={{ width: 'auto', marginRight: '10px' }}
              />
              Subscribe to newsletter
            </label>
          </div>

          <button type="submit" style={{ marginRight: '10px' }}>Submit</button>
          <button type="button" onClick={handleReset} style={{ background: '#999' }}>Reset</button>
        </form>
      </div>

      <div className="example-output">
        <strong>Form Best Practices:</strong>
        <ul>
          <li>Use controlled components for form inputs</li>
          <li>Validate form data before submission</li>
          <li>Provide clear error messages</li>
          <li>Handle different input types properly</li>
          <li>Provide a reset button</li>
        </ul>
      </div>
    </div>
  )
}

export default FormHandling