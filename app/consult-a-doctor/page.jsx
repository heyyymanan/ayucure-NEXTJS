"use client";

import { useState } from "react";

export default function DoctorConsultantForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    message: "",
    files: [], // notice plural
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file-upload") {
      setFormData({ ...formData, files: Array.from(files) }); // convert FileList to Array
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("preferredDate", formData.preferredDate);
    data.append("message", formData.message);
    formData.files.forEach((file, index) => {
      data.append(`files[${index}]`, file);
    });

    // Example: submit `data` via fetch or axios
    console.log("Form submitted with:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-slate-100 to-[#222831] p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Consult Our Doctor Online</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="preferredDate">
            Preferred Consultation Date
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="message">
            Message / Symptoms
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* File Upload */}
        <div className="my-10">
          <label
            htmlFor="file-upload"
            className="hidden md:flex w-full p-3 border border-dashed border-gray-400 rounded-lg text-center cursor-pointer hover:bg-gray-100"
          >
            <p className="hidden md:flex">📁 Upload Prescription / Reports (Images or PDFs)</p>

            
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              multiple
              accept=".pdf, image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
          <label
            htmlFor="file-upload"
            className="md:hidden flex w-full p-3 border border-dashed border-gray-400 rounded-lg text-center cursor-pointer hover:bg-gray-100"
          >
            <p className="md:hidden">📁 Upload Prescription/Reports</p>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              multiple
              accept=".pdf, image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>

          {/* Show selected files */}
          {formData.files.length > 0 && (
            <div className="mt-3 text-sm text-gray-600">
              {formData.files.length} file{formData.files.length > 1 ? "s" : ""} selected:
              <ul className="list-disc list-inside mt-1">
                {formData.files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Submit Consultation
        </button>
        <p className="text-center mt-5 text-red-500">We Will Respond To You Within The Next 1-3 days.</p>
      </form>
    </div>
  );
}
