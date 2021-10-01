import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Breadcrumbs(props) {
  
  const [showLevelThree, setShowLevelThree] = useState(false);

  useEffect(() => {
    async function showLevelThree() {
      if (props.category || props.searchTerm) {
        setShowLevelThree(true);
      }
    }
    showLevelThree();
  }, []);

  function levelThree() {
    if (props.category) {
      //setShowLevelThree(true);
      return props.category;
    }
    if (props.searchTerm) {
      //setShowLevelThree(true);
      return props.searchTerm;
    }
  }

  return (
    <div className="max-w-7xl mx-auto mt-4 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-2 text-gray-400 text-sm">
        <Link to="/userdashboard">
          <a className="hover:underline hover:text-gray-600">Home</a>
        </Link>
        <span>
          <svg
            className="h-5 w-5 leading-none text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
        <Link to="/facilitieslist">
        <a 
        className={`${showLevelThree ? "hover:underline hover:text-gray-600" : ""}`}
        >
          Browse Facilities
        </a>
        </Link>
        <span className={`${showLevelThree ? "" : "hidden"}`}>
          <svg
            className="h-5 w-5 leading-none text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
        <span>{levelThree()}</span>
      </div>
    </div>
  );
}
