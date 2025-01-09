import React, { useState, useEffect } from "react";

const BASE_URL = "https://print.trendline.marketing/api";

const TestAuthPage = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/test-auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const contentType = response.headers.get("content-type");

        if (!response.ok || !contentType.includes("application/json")) {
          const errorText = await response.text();
          console.error("Error Response:", errorText);
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        // Update the username state with data.name
        setUsername(data.data.name || "Guest");
      } catch (err) {
        console.error("Fetch error:", err);
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      {username ? (
        <h1 className="text-2xl font-bold">Welcome, {username}!</h1>
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
};

export default TestAuthPage;
