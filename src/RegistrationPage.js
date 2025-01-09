import React, { useState } from "react";

const BASE_URL = "https://print.trendline.marketing/api";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    mobile_country_code: "+20",
    mobile: "",
    client_type: "B2C",
    issuing_authority: "",
    company_name: "",
    commercial_license_number: "",
  });

  const [formErrors, setFormErrors] = useState({});
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
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.data.token);
        window.location.href = "/test-auth";
      } else {
        setFormErrors(data.errors || {});
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError(`Error: ${err.message || "Something went wrong"}`);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Create Your Account</h1>
        {error && !Object.keys(formErrors).length && <p className="text-red-500">{error}</p>} {/* General error */}
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        {/* Full Name */}
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
          {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name[0]}</p>} {/* Show specific error */}
        </div>

        {/* Email */}
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
          {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email[0]}</p>} {/* Show specific error */}
        </div>

        {/* Password */}
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
          {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password[0]}</p>} {/* Show specific error */}
        </div>

        {/* Confirm Password */}
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
          {formErrors.password_confirmation && <p className="text-red-500 text-sm">{formErrors.password_confirmation[0]}</p>} {/* Show specific error */}
        </div>

        {/* Mobile */}
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
            {formErrors.mobile && <p className="text-red-500 text-sm">{formErrors.mobile[0]}</p>} {/* Show specific error */}
          </div>
        </div>

        {/* Client Type */}
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

        {/* Additional Fields for B2B */}
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

        {/* Submit Button */}
        <button type="submit" className="bg-green-800 text-white w-full py-3 mt-6 rounded-md">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
