function Landingnavbar() {
  return (
    <div>
      <header className="h-24 sm:h-32 flex items-center">
        <div className="container mx-auto px-6 sm:px-12 flex items-center justify-between">
          <div className="text-black font-black text-2xl flex items-center">
            <span className="w-6 h-6 rounded-full bg-blue-500 mr-4"></span>{" "}
            <a href="#">myBookingPal</a>
          </div>
          <div className="flex items-center">
            <nav className="text-black text-lg hidden lg:flex items-center">
              <a href="#" className="py-2 px-6 flex hover:text-blue-500">
                List your facility
              </a>
              <a href="#" className="py-2 px-6 flex hover:text-blue-500">
                Register
              </a>
              <a href="#" className="py-2 px-6 flex text-blue-500">
                Sign in
              </a>
            </nav>
            <button className="lg:hidden flex flex-col">
              <span className="w-6 h-px bg-blue-900 mb-1"></span>
              <span className="w-6 h-px bg-blue-900 mb-1"></span>
              <span className="w-6 h-px bg-blue-900 mb-1"></span>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Landingnavbar;
