import { useState, useEffect } from 'react'

function EffectsAndSideEffects() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState('')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // Effect that runs after every render
  useEffect(() => {
    console.log('Component rendered! Count is now:', count)
  })

  // Effect with dependency array (runs only on mount)
  useEffect(() => {
    console.log('Component mounted!')
    
    return () => {
      console.log('Component unmounting!')
    }
  }, [])

  // Effect with specific dependencies
  useEffect(() => {
    setData(`Current count is: ${count}`)
  }, [count])

  // Effect for window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div>
      <h2 className="section-title">3️⃣ Effects & Side Effects with useEffect</h2>
      
      <div className="card">
        <h3 className="subsection-title">What is useEffect?</h3>
        <p>useEffect performs side effects in functional components. It runs after render.</p>
        <div className="code-block">
{`// useEffect syntax
useEffect(() => {
  // Side effect code here
  
  // Optional cleanup function
  return () => {
    // Cleanup code
  };
}, [dependency1, dependency2]); // Dependency array`}
        </div>
      </div>

      <div className="card">
        <h3 className="subsection-title">Dependency Array Patterns</h3>
        <div className="code-block">
{`// 1. No dependency array - runs after every render
useEffect(() => {
  console.log('Runs every render');
});

// 2. Empty dependency array - runs only on mount
useEffect(() => {
  console.log('Runs once on mount');
}, []);

// 3. With dependencies - runs when dependencies change
useEffect(() => {
  console.log('Runs when count changes');
}, [count]);`}
        </div>
      </div>

      <div className="card">
        <h3 className="subsection-title">Live Examples</h3>
        
        <div className="form-group">
          <h4>Counter with Effect</h4>
          <p>Count: <strong>{count}</strong></p>
          <p>Effect Data: <strong>{data}</strong></p>
          <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>

        <div className="form-group">
          <h4>Window Size Listener</h4>
          <p>Window Width: <strong>{windowWidth}px</strong></p>
          <p style={{ fontSize: '12px', color: '#666' }}>Try resizing your window</p>
        </div>
      </div>

      <div className="example-output">
        <strong>Common Use Cases:</strong>
        <ul>
          <li>Fetching data from APIs</li>
          <li>Setting up subscriptions</li>
          <li>Adding event listeners</li>
          <li>Starting timers</li>
          <li>Updating document title</li>
        </ul>
      </div>
    </div>
  )
}

export default EffectsAndSideEffects