import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TestAuthPage = () => {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/Register-auth"); 
        return;
      }

      try {
        const response = await fetch("https://print.trendline.marketing/api/test-auth", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (err) {
        setError("Something went wrong");
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div>
      {error && <p>{error}</p>}
      {username ? <h1>Welcome, {username}</h1> : <p>Loading...</p>}
    </div>
  );
};

export default TestAuthPage;
