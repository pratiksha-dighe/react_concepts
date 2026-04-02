import { useState } from 'react'

// Child components
function Header({ title }) {
  return <h2 style={{ color: '#667eea' }}>{title}</h2>
}

function Button({ children, onClick, variant = 'primary' }) {
  const styles = {
    primary: { background: '#667eea' },
    secondary: { background: '#764ba2' },
    danger: { background: '#ef4444' }
  }
  
  return (
    <button style={styles[variant]} onClick={onClick}>
      {children}
    </button>
  )
}

function Card({ title, children }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      {children}
    </div>
  )
}

function ComponentComposition() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Master Components' },
    { id: 3, text: 'Build Projects' }
  ])

  const removeMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id))
  }

  return (
    <div>
      <h2 className="section-title">4️⃣ Component Composition</h2>
      
      <div className="card">
        <h3 className="subsection-title">What is Composition?</h3>
        <p>Building complex UIs by combining smaller, reusable components.</p>
        <div className="code-block">
{`// Small reusable components
function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

// Compose them together
function App() {
  return (
    <Card title="Welcome">
      <p>This is composed from smaller components</p>
      <Button onClick={() => alert('Clicked!')}>
        Click me
      </Button>
    </Card>
  );
}`}
        </div>
      </div>

      <div className="card">
        <h3 className="subsection-title">Live Composition Example</h3>
        <Header title="My Tasks" />
        
        {messages.map(message => (
          <Card key={message.id} title={`Task ${message.id}`}>
            <p>{message.text}</p>
            <Button 
              variant="danger"
              onClick={() => removeMessage(message.id)}
            >
              Remove
            </Button>
          </Card>
        ))}
      </div>

      <div className="example-output">
        <strong>Benefits of Composition:</strong>
        <ul>
          <li>Code reusability</li>
          <li>Easier to maintain</li>
          <li>Better separation of concerns</li>
          <li>More flexible designs</li>
          <li>Easier to test</li>
        </ul>
      </div>
    </div>
  )
}

export default ComponentComposition