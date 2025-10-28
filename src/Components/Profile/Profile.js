import React, { useEffect ,useState} from 'react'
import './Profile.css'
import LoadingSpinner from '../spinner/LoadingSpinner';

export default function Profile() {

  const [profileData, setProfileData] = useState(null);
  
     useEffect(() => {
      
        fetchProfileData();
      }, []);
    const fetchProfileData = async () =>{
      fetch('https://backend-wqs5.onrender.com/Student__c',{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setProfileData(data)
    })
    .catch(err => console.error(err))
    }

    if(!profileData) return <LoadingSpinner/>
  return (
   <>
 {profileData && (
  <>
    <img src="https://randomuser.me/api/portraits/men/32.jpg" className="profile-pic" alt="Profile"/>
    <h2>{profileData.Name}</h2>
    <p><span className="highlight">Student ID:</span> {profileData.Id}</p>
    <p><span className="highlight">DOB:</span> {profileData.DOB__c}</p>
    <p><span className="highlight">Address:</span> Kathmandu</p>
    <p><span className="highlight">Phone:</span> {profileData.Phone_Number__c}</p>
    <p><span className="highlight">Email:</span> {profileData.Email__c}</p>
  </>
)}
</>
)
}
