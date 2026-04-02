import { createContext, useContext, useState } from 'react'

// Create Context
const ThemeContext = createContext()
const UserContext = createContext()

// Provider Components
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  
  const login = (userData) => {
    setUser(userData)
  }
  
  const logout = () => {
    setUser(null)
  }
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom Hooks for Context
function useTheme() {
  return useContext(ThemeContext)
}

function useUser() {
  return useContext(UserContext)
}

// Consumer Components
function ThemeDisplay() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div className="form-group">
      <p>Current Theme: <strong>{theme}</strong></p>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  )
}

function UserDemo() {
  const { user, login, logout } = useUser()
  const [nameInput, setNameInput] = useState('')
  
  const handleLogin = () => {
    if (nameInput.trim()) {
      login({ name: nameInput, id: Date.now() })
      setNameInput('')
    }
  }
  
  return (
    <div className="form-group">
      {!user ? (
        <>
          <label>Login:</label>
          <input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <p>Welcome, <strong>{user.name}</strong>! 👋</p>
          <button onClick={logout} style={{ background: '#ef4444' }}>Logout</button>
        </>
      )}
    </div>
  )
}

function ContextAPI() {
  return (
    <div>
      <h2 className="section-title">8️⃣ Context API</h2>
      
      <div className="card">
        <h3 className="subsection-title">What is Context API?</h3>
        <p>Context API provides a way to pass data through the component tree without having to pass props at every level.</p>
        <div className="code-block">
{`// Create Context
const MyContext = createContext();

// Provider Component
function MyProvider({ children }) {
  const [value, setValue] = useState('initial');
  
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

// Use Context with Hook
function MyComponent() {
  const { value, setValue } = useContext(MyContext);
  return <div>{value}</div>;
}`}
        </div>
      </div>

      <div className="card">
        <h3 className="subsection-title">Live Context Examples</h3>
        
        <ThemeProvider>
          <UserProvider>
            <ThemeDisplay />
            <UserDemo />
          </UserProvider>
        </ThemeProvider>
      </div>

      <div className="example-output">
        <strong>When to Use Context:</strong>
        <ul>
          <li>Theme management</li>
          <li>User authentication</li>
          <li>Language/localization</li>
          <li>Global notifications</li>
          <li>Avoiding prop drilling</li>
        </ul>
      </div>
    </div>
  )
}

export default ContextAPI