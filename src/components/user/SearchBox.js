import { useState } from "react";
import { useHistory } from "react-router";

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const history = useHistory();

  function runSearch() {
    console.log(searchTerm);
    console.log(category)
    if (searchTerm) {
      history.push({
        pathname: "/facilitieslist",
        searchTerm: searchTerm,
      });
    }
    if (category && category != "Select Category") {
      history.push({
        pathname: "/facilitieslist",
        category: category,
      });
    }
  }

  return (
    <div className="flex flex-col justify-between bg-blue-400 rounded h-56 p-4 text-gray-800">
      <div className="text-xl font-semibold">Search</div>
      <input
        className="border-none w-full text-sm leading-tight focus:outline-none"
        id="searchTerm"
        type="text"
        placeholder="Enter facility name"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="border-none w-full text-sm text-grayleading-tight focus:outline-none"
        id="searchCategory"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Select Category</option>
        <option>Meeting Room</option>
        <option>Sport Venues</option>
        <option>Desk Booking</option>
        <option>Professional Studios</option>
        <option>Coworking spaces</option>
        <option>Community Facilities</option>
      </select>

      <button
        onClick={() => runSearch()}
        className="py-2 mx-10 hover:bg-indigo-800 bg-indigo-600 text-white rounded-md shadow-xl"
      >
        Search
      </button>
    </div>
  );
}
