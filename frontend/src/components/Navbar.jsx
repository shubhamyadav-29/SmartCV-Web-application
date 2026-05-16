import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {

    localStorage.removeItem("userInfo");

    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-6 py-4">

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-bold"
        >
          SmartCV
        </Link>

        <div className="flex items-center gap-4">

          {!userInfo ? (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">
                Dashboard
              </Link>

              <Link to="/resume-builder">
                Resume Builder
              </Link>

              <button
                onClick={logoutHandler}
                className="bg-red-500 px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;