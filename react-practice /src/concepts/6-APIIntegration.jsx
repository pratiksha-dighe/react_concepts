import { useState, useEffect } from 'react'

function APIIntegration() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setUsers(data.slice(0, 5))
    } catch (err) {
      setError('Error fetching users. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserDetails = async (userId) => {
    setLoading(true)
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      const data = await response.json()
      setSelectedUser(data)
    } catch (err) {
      setError('Error fetching user details')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="section-title">6️⃣ API Integration</h2>
      
      <div className="card">
        <h3 className="subsection-title">Fetching Data with useEffect</h3>
        <div className="code-block">
{`useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    }
  };
  
  fetchData();
}, []);`}
        </div>
      </div>

      <div className="card">
        <h3 className="subsection-title">Live API Example</h3>
        
        <button onClick={fetchUsers} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Users'}
        </button>

        {error && <div className="error">{error}</div>}

        {users.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h4>Users List:</h4>
            {users.map(user => (
              <div key={user.id} className="list-item">
                <div>
                  <strong>{user.name}</strong>
                  <p style={{ fontSize: '12px', color: '#666', margin: '5px 0' }}>
                    {user.email}
                  </p>
                </div>
                <button 
                  onClick={() => fetchUserDetails(user.id)}
                  style={{ padding: '5px 10px', fontSize: '12px' }}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedUser && (
          <div className="card" style={{ marginTop: '20px', background: '#e3f2fd' }}>
            <h4>User Details</h4>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <p><strong>Website:</strong> {selectedUser.website}</p>
            <p><strong>Company:</strong> {selectedUser.company.name}</p>
          </div>
        )}
      </div>

      <div className="example-output">
        <strong>API Best Practices:</strong>
        <ul>
          <li>Always handle loading and error states</li>
          <li>Use try-catch for error handling</li>
          <li>Clean up subscriptions in useEffect return</li>
          <li>Avoid fetching in every render</li>
          <li>Consider using libraries like axios or react-query</li>
        </ul>
      </div>
    </div>
  )
}

export default APIIntegration