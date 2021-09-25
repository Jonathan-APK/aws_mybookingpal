import Footer from "../components/layout/Footer";
import UserNavbar from "../components/layout/navbar/UserNavbar";
import Pagination from "../components/layout/Pagination";
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import React from 'react';
import DefaultUserPic from "../uploads/team-male.jpg";
import EditProfile from "../components/user/EditProfile";

const axios = require('axios');

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
class UserProfile extends React.Component {

  constructor(props){
    super(props);
    this.state={
        user_id:"Maria Ozawa",
        username:this.props.username,
        email:"pornhub@gmail.com",
        profileImage:this.props.profileImage,
        msg:this.props.msg,
        uploadedFile:null
    }
}

fetchUserDetails=(user_id)=>{
  //console.log(user_id);
  axios.get("http://localhost:5000/userapi/getUserDetails/"+user_id,{
      headers: {
          "content-type": "application/json"
        }
  }).then(res=>{
      console.log(res);
      this.setState({email:res.data.results[0].email});
      this.setState({profileImage:res.data.results[0].profileImage})
  })
  .catch(err=>console.log(err))
}

changeProfileImage=(event)=>{
       
  this.setState({uploadedFile:event.target.files[0]});
}

UpdateProfileHandler=(e)=>{
  e.preventDefault();
  //create object of form data
  const formData=new FormData();
  formData.append("profileImage",this.state.uploadedFile);
  formData.append("user_id",this.state.user_id);

  //update-profile
  axios.post("http://localhost:3000/userapi/update-profile/",formData,{
      headers: {
          "content-type": "application/json"
        }
  }).then(res=>{
      console.log(res);
     this.setState({msg:res.data.message});
     this.setState({profileImage:res.data.results.profileImage});
  })
  .catch(err=>console.log(err))
}

render(){
  if(this.state.profileImage){
    var imagestr=this.state.profileImage;
    imagestr = imagestr.replace("public/", "");
    var profilePic="http://localhost:5000/"+imagestr;
  }else{
     profilePic=DefaultUserPic;
  }
return (
  <div>
    <UserNavbar />
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
                <h1 class="mb-2 text-xs font-semibold tracking-widest text-black md:text-xl title-font"> Name: {this.state.user_id} </h1>
                <h1 class="mb-2 text-xs font-semibold tracking-widest text-black md:text-xl title-font"> Email: {this.state.email} </h1>
              </div>
              <div>
              <button 
              class="flex items-center px-6 py-2 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"> Edit </button>
              </div>
            </div>
            
    </section>        
  </div>
  <Footer />
  </div>   
);
}  
}                

export default UserProfile;