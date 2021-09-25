import Footer from "../../components/layout/Footer";
import UserNavbar from "../../components/layout/navbar/UserNavbar";
import CategoryItem from "../../components/user/CategoryItem";
import ShoppingCartDetails from "../../components/layout/ShoppingCartDetails";
import {useState} from "react";




export default function ProfileDetails() {

  const [cartOpen, setCartOpen] = useState(false);
  
  return (
    <div>

          <h1 className="text-5xl text-center font-extrabold tracking-tight text-gray-900">
            Welcome back, "user"
          </h1>
        
      <Footer />
      {cartOpen && <ShoppingCartDetails setCartOpen={setCartOpen}/> }
    </div>
  );
}
