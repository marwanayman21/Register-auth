import React, { useState } from "react";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    mobile_country_code: "+20",
    mobile: "",
    client_type: "B2C", // Default to 'B2C'
    issuing_authority: "",
    company_name: "",
    commercial_license_number: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://print.trendline.marketing/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        window.location.href = "/test-auth"; // Redirect on successful registration
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Create Your Account</h1>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border rounded-md"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border rounded-md"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border rounded-md"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="password_confirmation" className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border rounded-md"
            placeholder="Confirm your password"
            required
          />
        </div>

        {/* Mobile Field */}
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium">Mobile Number</label>
          <div className="flex">
            <input
              type="text"
              name="mobile_country_code"
              value={formData.mobile_country_code}
              onChange={handleChange}
              className="w-1/4 px-4 py-3 mt-2 border rounded-md"
              disabled
            />
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-3/4 px-4 py-3 mt-2 border rounded-md"
              placeholder="Enter your mobile number"
              required
            />
          </div>
        </div>

        {/* Client Type Field */}
        <div>
          <label htmlFor="client_type" className="block text-sm font-medium">Client Type</label>
          <select
            id="client_type"
            name="client_type"
            value={formData.client_type}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border rounded-md"
          >
            <option value="B2C">B2C</option>
            <option value="B2B">B2B</option>
          </select>
        </div>

        {/* Additional fields for B2B clients */}
        {formData.client_type === "B2B" && (
          <>
            <div>
              <label htmlFor="issuing_authority" className="block text-sm font-medium">Issuing Authority</label>
              <input
                type="text"
                id="issuing_authority"
                name="issuing_authority"
                value={formData.issuing_authority}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border rounded-md"
                placeholder="Enter issuing authority"
              />
            </div>

            <div>
              <label htmlFor="company_name" className="block text-sm font-medium">Company Name</label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border rounded-md"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label htmlFor="commercial_license_number" className="block text-sm font-medium">Commercial License Number</label>
              <input
                type="text"
                id="commercial_license_number"
                name="commercial_license_number"
                value={formData.commercial_license_number}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border rounded-md"
                placeholder="Enter commercial license number"
              />
            </div>
          </>
        )}

        <button type="submit" className="bg-green-800 text-white w-full py-3 mt-6 rounded-md">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
