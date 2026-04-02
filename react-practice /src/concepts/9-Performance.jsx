import { useState, useMemo, useCallback, memo } from 'react'

// Memoized Component
const MemoizedCounter = memo(({ count, onIncrement }) => {
  console.log('MemoizedCounter rendered')
  return (
    <div className="card" style={{ background: '#e3f2fd' }}>
      <p>Count: <strong>{count}</strong></p>
      <button onClick={onIncrement}>Increment</button>
    </div>
  )
})

function Performance() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [expensiveValue, setExpensiveValue] = useState(0)

  // Expensive calculation
  const expensiveComputation = useMemo(() => {
    console.log('Computing expensive value...')
    let result = 0
    for (let i = 0; i < 1000000000; i++) {
      result += i
    }
    return result
  }, [expensiveValue])

  // Memoized callback
  const handleIncrement = useCallback(() => {
    setCount(count + 1)
  }, [count])

  return (
    <div>
      <h2 className="section-title">9️⃣ Performance Optimization</h2>
      
      <div className="card">
        <h3 className="subsection-title">React.memo for Components</h3>
        <p>Prevent re-renders when props haven't changed.</p>
        <div className="code-block">
{`const MyComponent = memo(({ prop1, prop2 }) => {
  return <div>{prop1} - {prop2}</div>;
});`}
        </div>
      </div>

      <div className="card">
        <h3 className="subsection-title">useMemo Hook</h3>
        <p>Memoize expensive computations.</p>
        <div className="code-block">
{`const memoizedValue = useMemo(() => {
  return expensiveFunction(dependencies);
}, [dependencies]);`}
        </div>
      </div>

      <div className="card">
        <h3 className="subsection-title">useCallback Hook</h3>
        <p>Memoize callback functions to prevent unnecessary re-renders of child components.</p>
        <div className="code-block">
{`const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);`}
        </div>
      </div>

      <div className="card">
        <h3 className="subsection-title">Live Performance Example</h3>
        
        <div className="form-group">
          <label>Name Input (will not trigger memo re-render):</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here"
          />
          <p style={{ fontSize: '12px', color: '#666' }}>
            Open DevTools console to see render logs
          </p>
        </div>

        <MemoizedCounter count={count} onIncrement={handleIncrement} />

        <div className="form-group">
          <button onClick={() => setExpensiveValue(prev => prev + 1)}>
            Trigger Expensive Computation
          </button>
          <p>Result: <strong>{expensiveComputation}</strong></p>
        </div>
      </div>

      <div className="example-output">
        <strong>Performance Tips:</strong>
        <ul>
          <li>Use React.memo for components that receive props</li>
          <li>Use useMemo for expensive computations</li>
          <li>Use useCallback to memoize functions passed as props</li>
          <li>Lazy load components with React.lazy()</li>
          <li>Split code using dynamic imports</li>
          <li>Use production build for better performance</li>
        </ul>
      </div>
    </div>
  )
}

export default Performance