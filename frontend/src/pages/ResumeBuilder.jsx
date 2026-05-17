import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createResume } from "../services/resumeService";

function ResumeBuilder() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    email: "",
    phone: "",
    location: "",
    skills: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const resumeData = {
        title: formData.title,

        personalInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
        },

        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim()),
      };

      await createResume(resumeData);

      alert("Resume Created Successfully");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Failed To Create Resume");

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-4xl font-bold mb-8">
          Create Resume
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            name="title"
            placeholder="Resume Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="skills"
            placeholder="Skills (comma separated)"
            value={formData.skills}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg h-32"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Save Resume
          </button>

        </form>

      </div>

    </div>
  );
}

export default ResumeBuilder;