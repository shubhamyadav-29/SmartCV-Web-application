import { useEffect, useState } from "react";

import {
  getUserResumes,
  deleteResume,
} from "../services/resumeService";

function Dashboard() {

  const [resumes, setResumes] = useState([]);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  // FETCH RESUMES
  const fetchResumes = async () => {

    try {

      const data = await getUserResumes();

      setResumes(data);

    } catch (error) {

      console.log(error);

    }
  };

  // DELETE RESUME
  const handleDelete = async (id) => {

    try {

      await deleteResume(id);

      fetchResumes();

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchResumes();

  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <h1 className="text-3xl font-bold">
            Welcome {userInfo?.name}
          </h1>

          <button className="bg-black text-white px-5 py-3 rounded-xl">
            Create Resume
          </button>

        </div>

        {/* RESUME GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {resumes.map((resume) => (

            <div
              key={resume._id}
              className="bg-white p-6 rounded-2xl shadow-md"
            >

              <h2 className="text-2xl font-bold mb-4">
                {resume.title}
              </h2>

              <p className="text-gray-600 mb-2">
                {resume.personalInfo?.fullName}
              </p>

              <p className="text-gray-600 mb-6">
                {resume.personalInfo?.email}
              </p>

              <div className="flex items-center gap-3">

                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(resume._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;