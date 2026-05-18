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

    experience: [
      {
        company: "",
        position: "",
        years: "",
      },
    ],

    education: [
      {
        institution: "",
        degree: "",
        year: "",
      },
    ],
  });

  // BASIC INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // EXPERIENCE CHANGE
  const handleExperienceChange = (
    index,
    e
  ) => {

    const values = [...formData.experience];

    values[index][e.target.name] =
      e.target.value;

    setFormData({
      ...formData,
      experience: values,
    });

  };

  // ADD EXPERIENCE
  const addExperience = () => {

    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          company: "",
          position: "",
          years: "",
        },
      ],
    });

  };

  // REMOVE EXPERIENCE
  const removeExperience = (index) => {

    const values = [...formData.experience];

    values.splice(index, 1);

    setFormData({
      ...formData,
      experience: values,
    });

  };

  // EDUCATION CHANGE
  const handleEducationChange = (
    index,
    e
  ) => {

    const values = [...formData.education];

    values[index][e.target.name] =
      e.target.value;

    setFormData({
      ...formData,
      education: values,
    });

  };

  // ADD EDUCATION
  const addEducation = () => {

    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          institution: "",
          degree: "",
          year: "",
        },
      ],
    });

  };

  // REMOVE EDUCATION
  const removeEducation = (index) => {

    const values = [...formData.education];

    values.splice(index, 1);

    setFormData({
      ...formData,
      education: values,
    });

  };

  // SUBMIT FORM
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

        experience: formData.experience,

        education: formData.education,
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

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* FORM SECTION */}

        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <h1 className="text-4xl font-bold mb-8">
            Create Resume
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* BASIC INFO */}

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

            {/* EXPERIENCE */}

            <div>

              <div className="flex items-center justify-between mb-4">

                <h2 className="text-2xl font-bold">
                  Experience
                </h2>

                <button
                  type="button"
                  onClick={addExperience}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Add
                </button>

              </div>

              {formData.experience.map(
                (exp, index) => (

                  <div
                    key={index}
                    className="border p-4 rounded-xl mb-4"
                  >

                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        handleExperienceChange(index, e)
                      }
                      className="w-full border p-3 rounded-lg mb-3"
                    />

                    <input
                      type="text"
                      name="position"
                      placeholder="Position"
                      value={exp.position}
                      onChange={(e) =>
                        handleExperienceChange(index, e)
                      }
                      className="w-full border p-3 rounded-lg mb-3"
                    />

                    <input
                      type="text"
                      name="years"
                      placeholder="Years"
                      value={exp.years}
                      onChange={(e) =>
                        handleExperienceChange(index, e)
                      }
                      className="w-full border p-3 rounded-lg mb-3"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeExperience(index)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Remove
                    </button>

                  </div>

                )
              )}

            </div>

            {/* EDUCATION */}

            <div>

              <div className="flex items-center justify-between mb-4">

                <h2 className="text-2xl font-bold">
                  Education
                </h2>

                <button
                  type="button"
                  onClick={addEducation}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Add
                </button>

              </div>

              {formData.education.map(
                (edu, index) => (

                  <div
                    key={index}
                    className="border p-4 rounded-xl mb-4"
                  >

                    <input
                      type="text"
                      name="institution"
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) =>
                        handleEducationChange(index, e)
                      }
                      className="w-full border p-3 rounded-lg mb-3"
                    />

                    <input
                      type="text"
                      name="degree"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(index, e)
                      }
                      className="w-full border p-3 rounded-lg mb-3"
                    />

                    <input
                      type="text"
                      name="year"
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) =>
                        handleEducationChange(index, e)
                      }
                      className="w-full border p-3 rounded-lg mb-3"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeEducation(index)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Remove
                    </button>

                  </div>

                )
              )}

            </div>

            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-xl"
            >
              Save Resume
            </button>

          </form>

        </div>

        {/* LIVE PREVIEW */}

        <div className="bg-white p-8 rounded-2xl shadow-lg sticky top-6 h-fit">

          <h1 className="text-3xl font-bold mb-6">
            Resume Preview
          </h1>

          {/* PERSONAL INFO */}

          <div className="mb-8">

            <h2 className="text-4xl font-bold">
              {formData.fullName || "Your Name"}
            </h2>

            <p className="text-gray-600 mt-2">
              {formData.email || "email@example.com"}
            </p>

            <p className="text-gray-600">
              {formData.phone || "Phone Number"}
            </p>

            <p className="text-gray-600">
              {formData.location || "Location"}
            </p>

          </div>

          {/* SKILLS */}

          <div className="mb-8">

            <h3 className="text-2xl font-bold mb-3 border-b pb-2">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {formData.skills
                .split(",")
                .filter((skill) => skill.trim() !== "")
                .map((skill, index) => (

                  <span
                    key={index}
                    className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>

                ))}

            </div>

          </div>

          {/* EXPERIENCE */}

          <div className="mb-8">

            <h3 className="text-2xl font-bold mb-3 border-b pb-2">
              Experience
            </h3>

            {formData.experience.map((exp, index) => (

              <div
                key={index}
                className="mb-4"
              >

                <h4 className="text-xl font-semibold">
                  {exp.position || "Position"}
                </h4>

                <p className="text-gray-700">
                  {exp.company || "Company"}
                </p>

                <p className="text-gray-500 text-sm">
                  {exp.years || "Years"}
                </p>

              </div>

            ))}

          </div>

          {/* EDUCATION */}

          <div>

            <h3 className="text-2xl font-bold mb-3 border-b pb-2">
              Education
            </h3>

            {formData.education.map((edu, index) => (

              <div
                key={index}
                className="mb-4"
              >

                <h4 className="text-xl font-semibold">
                  {edu.degree || "Degree"}
                </h4>

                <p className="text-gray-700">
                  {edu.institution || "Institution"}
                </p>

                <p className="text-gray-500 text-sm">
                  {edu.year || "Year"}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default ResumeBuilder;