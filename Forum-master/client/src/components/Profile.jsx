import React from 'react';
import CollegeGoingProfile from './profileCollegeGoing';
import CollegeSearchingProfile from './profileCollegeSearching';

const Profile = ({userData}) => {
  return (
      <div>
          
        <ShowProfile userData={userData} />
  </div>
  );
};

function ShowProfile({ userData }) {

  if (userData.userType === "collegeG") {
     return (
        <div>
            <CollegeGoingProfile />
        </div>
      );
  } else if (userData.userType === "collegeS") {
     return (
        <div>
            <CollegeSearchingProfile userData={{userData}}/>
        </div>
      );
  }
}

export default Profile;