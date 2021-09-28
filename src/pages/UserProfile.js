import React from 'react'
import Footer from "../components/layout/Footer";
import ShoppingCartDetails from "../components/layout/ShoppingCartDetails"
import UserNavbar from "../components/layout/navbar/UserNavbar";
import DefaultUserPic from "../uploads/team-male.jpg";
import EditProfile from "../components/user/EditProfile";
import {useState} from 'react';

const profiles = [
  {
    image:
      "http://i0.wp.com/rakenrol.net/japan/wp-content/uploads/2013/12/MariaOzawa01.jpg?fit=300%2C300",
    firstName: "Maria",
    lastName: "Ozawa",
    email: "maria_ozawa@gmail.com"
  }
  // More booking...
];

export default function UserProfile() {
  /*
  if(this.state.profileImage){
    var imagestr=this.state.profileImage;
    imagestr = imagestr.replace("public/", "");
    var profilePic="http://localhost:5000/"+imagestr;
  }else{
     profilePic=DefaultUserPic;
  }
  */

  const [cartOpen, setCartOpen] = useState(false);

  const profilePic=DefaultUserPic;

return (
  <div>
    <UserNavbar setCartOpen={setCartOpen}/>
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Profile</h1>
      </div>
      {/* Mini Cards */}
      <div className="container mx-auto px-6 sm:px-12 py-6"></div>
    </header>
    <div>     
      
    <section class="text-blueGray-700 ">
            <div class="container flex flex-col items-center px-5 py-16 mx-auto md:flex-row lg:px-28">
              <div class="flex flex-col items-start mb-16 text-left lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:mb-0">
                <img class="object-cover object-center rounded-lg " alt="profile pic" src={profilePic}/>
              </div>
              <div class="flex flex-col items-start mb-16 text-left lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:mb-0">
                <h2 class="mb-8 text-xs font-semibold tracking-widest text-black uppercase title-font"> Name: {profiles.firstName} </h2>
                <h1 class="mb-8 text-2xl font-black tracking-tighter text-black md:text-5xl title-font"> Medium length display headline. </h1>
                <p class="mb-8 text-base leading-relaxed text-left text-blueGray-600 "> Deploy your mvp in minutes, not days. WT offers you a a wide selection swapable sections for your landing page. </p>
                <div class="flex flex-col justify-center lg:flex-row">
                  <button class="flex items-center px-6 py-2 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"> Show me </button>
                  <p class="mt-2 text-sm text-left text-blueGray-600 md:ml-6 md:mt-0"> It will take you to candy shop. <br class="hidden lg:block"/>
                    <a href="#" class="inline-flex items-center font-semibold text-blue-600 md:mb-2 lg:mb-0 hover:text-black " title="read more"> Read more about it » </a>
                  </p>
                </div>
              </div>
              
            </div>
          </section>        
  </div>
  <Footer />
  {cartOpen && <ShoppingCartDetails setCartOpen={setCartOpen}/> }
  </div>   
);
}