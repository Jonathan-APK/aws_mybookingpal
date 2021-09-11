

export default function SearchBox() {
  return (
    <div className="flex flex-col justify-between bg-blue-400 rounded h-56 p-4 text-gray-800">
      <div className="text-xl font-semibold">Search</div>
      <input
        className="border-none w-full text-sm leading-tight focus:outline-none"
        id="searchTerm"
        type="text"
        placeholder="Enter facility name"
      />
      <select
        className="border-none w-full text-sm text-grayleading-tight focus:outline-none"
        required="required"
        id="searchCategory"
      >
        <option value>Select Category</option>
        <option value>Meeting Rooms</option>
        <option value>Sports Venues</option>
        <option value>Desk Booking</option>
        <option value>Professional Studios</option>
        <option value>Coworking spaces</option>
        <option value>Community Facilities</option>
      </select>

      <button className="py-2 mx-10 hover:bg-indigo-800 bg-indigo-600 text-white rounded-md shadow-xl">
        Search
      </button>
    </div>
  );
}
