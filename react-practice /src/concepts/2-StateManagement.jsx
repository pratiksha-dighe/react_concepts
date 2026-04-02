import { useMemo, useReducer, useState } from 'react'

function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1, history: [...state.history, '+1'] }
    case 'decrement':
      return { ...state, count: state.count - 1, history: [...state.history, '-1'] }
    case 'add':
      return { ...state, count: state.count + action.payload, history: [...state.history, `+${action.payload}`] }
    case 'reset':
      return { count: 0, history: [] }
    default:
      return state
  }
}

function StateManagement() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(5)

  const [state, dispatch] = useReducer(counterReducer, { count: 0, history: [] })

  const derived = useMemo(() => {
    const parity = count % 2 === 0 ? 'even' : 'odd'
    return { parity, doubled: count * 2 }
  }, [count])

  return (
    <div>
      <h2 className="section-title">2️⃣ State Management</h2>

      <div className="card">
        <h3 className="subsection-title">useState (local component state)</h3>
        <p>
          Use state for values that change over time and affect rendering. Keep state minimal and compute derived values
          instead of storing duplicates.
        </p>
        <div className="code-block">
{`const [count, setCount] = useState(0);

// Derived values usually shouldn't be stored as state
const doubled = count * 2;`}
        </div>

        <div className="toolbar">
          <button onClick={() => setCount((c) => c - 1)}>-</button>
          <div className="pill">Count: <strong>{count}</strong></div>
          <button onClick={() => setCount((c) => c + 1)}>+</button>
          <button onClick={() => setCount(0)} style={{ background: '#999' }}>Reset</button>
        </div>

        <div className="mini-grid">
          <div className="mini-card">
            <div className="muted">Derived</div>
            <div><strong>{derived.parity}</strong> · doubled: <strong>{derived.doubled}</strong></div>
          </div>
          <div className="mini-card">
            <div className="muted">Tip</div>
            <div>Prefer functional updates for safety: <code>setCount(c =&gt; c + 1)</code></div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="subsection-title">useReducer (complex state & transitions)</h3>
        <p>Great when state updates are related, or when you want explicit, testable transitions.</p>
        <div className="code-block">
{`const [state, dispatch] = useReducer(reducer, initialState);

dispatch({ type: 'increment' });
dispatch({ type: 'add', payload: 5 });`}
        </div>

        <div className="toolbar">
          <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
          <div className="pill">Reducer Count: <strong>{state.count}</strong></div>
          <button onClick={() => dispatch({ type: 'increment' })}>+</button>
          <div className="spacer" />
          <label className="inline-label">
            Step
            <input
              type="number"
              value={step}
              onChange={(e) => setStep(Number(e.target.value || 0))}
              style={{ width: 120, marginLeft: 10 }}
            />
          </label>
          <button onClick={() => dispatch({ type: 'add', payload: step })}>Add step</button>
          <button onClick={() => dispatch({ type: 'reset' })} style={{ background: '#999' }}>Reset</button>
        </div>

        <div className="mini-card" style={{ marginTop: 12 }}>
          <div className="muted">History</div>
          {state.history.length === 0 ? (
            <div>No actions yet.</div>
          ) : (
            <div className="chip-row">
              {state.history.slice(-12).map((h, idx) => (
                <span key={`${h}-${idx}`} className="chip">{h}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="example-output">
        <strong>State Best Practices:</strong>
        <ul>
          <li>Keep state as small as possible (avoid redundant/derived state)</li>
          <li>Update objects/arrays immutably (create new references)</li>
          <li>Lift state up when multiple components need it</li>
          <li>Use Context + Reducer for app-level state when appropriate</li>
        </ul>
      </div>
    </div>
  )
}

export default StateManagement

