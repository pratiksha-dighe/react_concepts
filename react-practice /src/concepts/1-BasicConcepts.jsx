function BasicConcepts() {
    return (
      <div>
        <h2 className="section-title">1️⃣ JSX & Components Basics</h2>
        
        <div className="card">
          <h3 className="subsection-title">What is JSX?</h3>
          <p>JSX is a syntax extension that allows you to write HTML-like code in JavaScript.</p>
          <div className="code-block">
  {`// JSX Example
  const element = <h1>Hello, React!</h1>;
  
  // JSX with expressions
  const name = "John";
  const greeting = <h1>Hello, {name}!</h1>;
  
  // JSX with attributes
  const button = <button className="btn">Click me</button>;
  
  // JSX must return a single root element
  const valid = (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  );`}
          </div>
        </div>
  
        <div className="card">
          <h3 className="subsection-title">Functional Components</h3>
          <p>Modern React uses functional components with hooks.</p>
          <div className="code-block">
  {`// Simple Functional Component
  function Welcome() {
    return <h1>Welcome to React!</h1>;
  }
  
  // Component with props
  function Greeting({ name, age }) {
    return <h1>Hello {name}, you are {age} years old</h1>;
  }
  
  // Using the component
  export default function App() {
    return <Greeting name="Alice" age={25} />;
  }`}
          </div>
        </div>
  
        <div className="card">
          <h3 className="subsection-title">Props</h3>
          <p>Props are how you pass data from parent to child components.</p>
          <div className="code-block">
  {`// Child component receives props
  function Card({ title, description, color }) {
    return (
      <div style={{ backgroundColor: color, padding: '20px' }}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }
  
  // Parent component passes props
  function App() {
    return (
      <>
        <Card 
          title="React" 
          description="A JavaScript library"
          color="#667eea"
        />
        <Card 
          title="JavaScript" 
          description="A programming language"
          color="#764ba2"
        />
      </>
    );
  }`}
          </div>
        </div>
  
        <div className="example-output">
          <strong>Key Concepts:</strong>
          <ul>
            <li>JSX compiles to JavaScript function calls</li>
            <li>Components can be functions or classes</li>
            <li>Props are read-only and passed from parent to child</li>
            <li>Use curly braces {} for JavaScript expressions in JSX</li>
          </ul>
        </div>
      </div>
    )
  }
  
  export default BasicConcepts