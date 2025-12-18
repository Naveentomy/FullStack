import { useState } from "react";

export default function Calculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const parseInputs = () => {
    if (a === "" || b === "") {
      throw new Error("Both inputs are required");
    }
    return [parseFloat(a), parseFloat(b)];
  };

  const calculate = (operation) => {
    try {
      setError("");
      const [x, y] = parseInputs();

      if (operation === "divide" && y === 0) {
        throw new Error("Division by zero is not allowed");
      }

      const operations = {
        add: x + y,
        subtract: x - y,
        multiply: x * y,
        divide: x / y,
      };

      setResult(operations[operation]);
    } catch (err) {
      setResult(null);
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
      <h1 className="text-xl font-bold mb-4 text-center">Calculator</h1>

      <input
        type="number"
        placeholder="First number"
        value={a}
        onChange={(e) => setA(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Second number"
        value={b}
        onChange={(e) => setB(e.target.value)}
        className="input mt-2"
      />

      <div className="grid grid-cols-2 gap-2 mt-4">
        <button onClick={() => calculate("add")} className="btn">+</button>
        <button onClick={() => calculate("subtract")} className="btn">−</button>
        <button onClick={() => calculate("multiply")} className="btn">×</button>
        <button onClick={() => calculate("divide")} className="btn">÷</button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result !== null && (
        <p className="text-green-600 mt-4 font-semibold">Result: {result}</p>
      )}
    </div>
  );
}
