import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sendData = async () => {
      const body = {
        name: "phamvantu",
        email: "phamtu090303@ghmail.com",
        date_of_birth: "2003-03-09",
        phone: "21321321",
        password: "123",
        CitizenID: "213213213",
        username: "tu",
        avatar:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZiZDY1MzZjNTBkOGMzZjg0OTIyMTQ4IiwidG9rZW5fdHlwZSI6MiwidmVyaWZ5IjowLCJpYXQiOjE3MjQxMTgw",
      };

      try {
        const response = await fetch("http://localhost:5000/api/user/regitter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const result = await response.json();
        console.log("Response Message:", result.message);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    sendData();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
