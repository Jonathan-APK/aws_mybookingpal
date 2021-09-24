import CartItem from "../user/CartItem";

const cartItems = [
  {
    image:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    facility: "Orchard Desk",
    facilityType: "Desk Booking",
    startTime: "10PM",
    endTime: "11PM",
    bookDate: "11/11/2021",
    bookingCost: "80085"
  },
  {
    image:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    facility: "Basketball Court",
    facilityType: "SportsVenue",
    startTime: "7AM",
    endTime: "9AM",
    bookDate: "01/02/2021",
    bookingCost: "1234"
  }
  // More cart items...
];





export default function ShoppingCartDetails({setCartOpen}) {

  const onButtonClick = (mode)=>{
    setCartOpen(mode)
  }

  function closeCart(){
    return <p>$262.00</p>;
  }

  function addTotalCost(){
    return <p>$262.00</p>;
  }
  
    return (
      

      <div class="fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
        <div class="absolute inset-0 overflow-hidden">

          
      
          <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">

            <div class="w-screen max-w-md">
              <div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
                      Shopping cart
                    </h2>
                    <div class="ml-3 h-7 flex items-center">
                      <button type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick = {closeCart}>
                        <span class="sr-only">Close panel</span>

                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
      
                  <div class="mt-8">
                    <div class="flow-root">
                      <ul role="list" class="-my-6 divide-y divide-gray-200">
                        
                        {cartItems.map((cartItems) => (
                        <CartItem
                          image={cartItems.image}
                          facility={cartItems.facility}
                          facilityType={cartItems.facilityType}
                          startTime={cartItems.startTime}
                          endTime={cartItems.endTime}
                          bookDate={cartItems.bookDate}
                          bookingCost={cartItems.bookingCost}
                        />
                        ))}                            
                      </ul>
                    </div>
                  </div>
                </div>
      
                <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div class="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$262.00</p>
                    {addTotalCost}
                    
                  </div>
                  <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div class="mt-6">
                    <a href="#" class="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Checkout</a>
                  </div>
                  <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
                    <p>
                      or <button type="button" class="text-indigo-600 font-medium hover:text-indigo-500">Continue Shopping<span aria-hidden="true"> &rarr;</span></button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
 


