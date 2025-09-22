import './App.css'
import { IncrementCounter } from './IncrementCounter'

function App() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1>Convex Optimistic Updates Demo</h1>
        <p style={{ color: "#666", fontSize: "16px" }}>
          Click the button to see optimistic updates in action
        </p>
      </header>

      <main>
        <IncrementCounter />
      </main>

      <footer style={{ textAlign: "center", marginTop: "30px", color: "#666", fontSize: "14px" }}>
        <p>
          <strong>How it works:</strong>
        </p>
        <ul style={{ textAlign: "left", display: "inline-block", marginTop: "10px" }}>
          <li>Click the button - the counter updates <strong>immediately</strong> (optimistic update)</li>
          <li>The server processes the request with a 1.5 second delay</li>
          <li>Once the server responds, the optimistic value is confirmed</li>
        </ul>
        <p style={{ marginTop: "15px" }}>
          Try clicking multiple times quickly to see how optimistic updates keep the UI responsive!
        </p>
      </footer>
    </div>
  )
}

export default App
