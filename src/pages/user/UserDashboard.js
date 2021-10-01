import Footer from "../../components/layout/Footer";
import UserNavbar from "../../components/layout/navbar/UserNavbar";
import ShoppingCartDetails from "../../components/layout/ShoppingCartDetails";
import CategoryItem from "../../components/user/CategoryItem";
import { useState } from "react";
import { useHistory } from "react-router";

const categories = [
  {
    id: 1,
    name: "Meeting Room",
    imageSrc:
      "https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  },
  {
    id: 2,
    name: "Sport Venues",
    imageSrc:
      "https://images.unsplash.com/photo-1597309792995-1f61243fca21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80",
  },
  {
    id: 3,
    name: "Desk Booking",
    imageSrc:
      "https://images.unsplash.com/photo-1577412647305-991150c7d163?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  },
  {
    id: 4,
    name: "Professional Studios",
    imageSrc:
      "https://images.unsplash.com/photo-1604513843888-824303218a45?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  },
  {
    id: 5,
    name: "Coworking spaces",
    imageSrc:
      "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  },
  {
    id: 6,
    name: "Community Facilities",
    imageSrc: "https://www.langeberg.gov.za/images/stories/00120r.jpg",
  },
  // More categories...
];

export default function UserDashboard() {
  const [cartOpen, setCartOpen] = useState(false);
  const user = sessionStorage.getItem("username");
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  function runSearch() {
    if (searchTerm) {
      history.push({
        pathname: '/facilitieslist',
        searchTerm: searchTerm,
      })
    }
  }

  return (
    <div>
      <UserNavbar setCartOpen={setCartOpen} />
      <div className="bg-gray-50 mt-1">
        <div className="max-w-2xl mx-auto py-8 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-5xl text-center font-extrabold tracking-tight text-gray-900">
            Welcome back, {user}
          </h1>
          <h2 className="text-2xl my-2 font-extrabold tracking-tight text-gray-900">
            Search for a Facility
          </h2>
          <div className="bg-white flex items-center rounded-full shadow-xl py-2">
            <input
              className="rounded-l-full w-full px-4 text-gray-700 leading-tight border-0"
              type="text"
              placeholder="What would you like to book?"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="px-4">
              <button
                onClick={() => runSearch()}
                className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-8 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Browse by Facility Type
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  imageSrc={category.imageSrc}
                  href={category.href}
                  name={category.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {cartOpen && <ShoppingCartDetails setCartOpen={setCartOpen} />}
    </div>
  );
}
