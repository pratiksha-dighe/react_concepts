import { useState, useEffect } from 'react'

// Custom Hook - useCounter
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(initialValue)
  
  return { count, increment, decrement, reset }
}

// Custom Hook - useLocalStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })
  
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }
  
  return [storedValue, setValue]
}

// Custom Hook - useFetch
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(url)
        const json = await response.json()
        setData(json)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [url])
  
  return { data, loading, error }
}

function CustomHooks() {
  const counter = useCounter(10)
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [savedName, setSavedName] = useLocalStorage('name', '')
  const [nameInput, setNameInput] = useState(savedName)

  const saveName = () => {
    setSavedName(nameInput)
  }

  return (
    <div>
      <h2 className="section-title">7️⃣ Custom Hooks</h2>
      
      <div className="card">
        <h3 className="subsection-title">What are Custom Hooks?</h3>
        <p>Custom hooks are reusable functions that use React hooks. They extract component logic into reusable functions.</p>
        <div className="code-block">
{`// Custom Hook Pattern
function useCustomHook(param) {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  return { state, setState, derivedValue };
}`}
        </div>
      </div>

      <div className="card">
        <h3 className="subsection-title">useCounter Hook Example</h3>
        <div className="code-block">
{`function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}`}
        </div>
        
        <div className="form-group">
          <p>Counter Value: <strong>{counter.count}</strong></p>
          <button onClick={counter.increment}>+</button>
          <button onClick={counter.decrement} style={{ marginLeft: '10px' }}>-</button>
          <button onClick={counter.reset} style={{ marginLeft: '10px' }}>Reset</button>
        </div>
      </div>

      <div className="card">
        <h3 className="subsection-title">useLocalStorage Hook Example</h3>
        <div className="code-block">
{`function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  
  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  
  return [storedValue, setValue];
}`}
        </div>

        <div className="form-group">
          <label>Theme (Saved to localStorage):</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <p style={{ fontSize: '12px', color: '#666' }}>Current theme: <strong>{theme}</strong></p>
        </div>

        <div className="form-group">
          <label>Save Name:</label>
          <input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={saveName}>Save</button>
          {savedName && <p className="success">✅ Saved name: {savedName}</p>}
        </div>
      </div>

      <div className="example-output">
        <strong>Custom Hooks Rules:</strong>
        <ul>
          <li>Must start with "use" prefix</li>
          <li>Can use other hooks inside</li>
          <li>Extract component logic for reuse</li>
          <li>Share stateful logic, not state itself</li>
          <li>Each hook instance has isolated state</li>
        </ul>
      </div>
    </div>
  )
}

export default CustomHooks