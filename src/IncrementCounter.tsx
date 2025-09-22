import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

export function IncrementCounter() {
  const count = useQuery(api.counter.get);
  const [isLoading, setIsLoading] = useState(false);

  const increment = useMutation(api.counter.increment).withOptimisticUpdate(
    (localStore, args) => {
      const { increment } = args;
      const currentValue = localStore.getQuery(api.counter.get);
      if (currentValue !== undefined) {
        localStore.setQuery(api.counter.get, {}, currentValue + increment);
      }
    },
  );

  const incrementCounter = async () => {
    setIsLoading(true);
    try {
      await increment({ increment: 1 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      padding: "30px",
      border: "2px solid #007bff",
      margin: "20px",
      borderRadius: "12px",
      textAlign: "center",
      backgroundColor: "#f8f9fa"
    }}>
      <h2 style={{ color: "#007bff", marginBottom: "20px" }}>
        Optimistic Counter Demo
      </h2>

      <div style={{
        fontSize: "48px",
        fontWeight: "bold",
        color: "#333",
        margin: "20px 0",
        padding: "20px",
        backgroundColor: "white",
        border: "2px solid #dee2e6",
        borderRadius: "8px"
      }}>
        {count ?? 0}
      </div>

      <button
        onClick={incrementCounter}
        disabled={isLoading}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          fontWeight: "bold",
          backgroundColor: isLoading ? "#6c757d" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: isLoading ? "not-allowed" : "pointer",
          marginBottom: "15px",
          transition: "background-color 0.2s"
        }}
      >
        {isLoading ? "Processing..." : "Increment +1"}
      </button>

      <div style={{
        fontSize: "14px",
        color: "#666",
        backgroundColor: "#e9ecef",
        padding: "15px",
        borderRadius: "6px",
        marginTop: "15px"
      }}>
        <p style={{ margin: "0 0 10px 0", fontWeight: "bold" }}>
          🚀 <strong>Optimistic Update in Action:</strong>
        </p>
        <p style={{ margin: "5px 0" }}>
          • Counter updates instantly when you click (optimistic)
        </p>
        <p style={{ margin: "5px 0" }}>
          • Server processes with 1.5s artificial delay
        </p>
        <p style={{ margin: "5px 0" }}>
          • Value is confirmed when server responds
        </p>
        <p style={{ margin: "10px 0 0 0", fontStyle: "italic" }}>
          Try clicking multiple times quickly!
        </p>
      </div>
    </div>
  );
}