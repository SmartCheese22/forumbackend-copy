import React, {useState} from 'react';
import './profileCollegeGoing.css';
import { useSelector , useDispatch} from 'react-redux';
import axios from 'axios';
import { updateUserName ,updateEmail, updateAddress} from "./authActions";
import gravatar from 'gravatar';
function CollegeSearchingProfile({userData}){
    return(
      <div className="profile-container">
          <div className="profile">
              <ProfileSection userData={userData}/>
          </div>
      </div>
    );
}

function ProfileSection({userData}){
    return (
        <div className="profile_details">
            <ProfilePhotoSection userData={userData}/>
            <ProfileDataSection userData={userData}/>
        </div>
    );
  }
  
  function ProfilePhotoSection({userData}){
    const gravatarUrl = gravatar.url(userData.email, { s: 75,r: "pg", d: 'robohash' });
    return (
        <>
        <div className="profile_photo">
            <div style={{ borderRadius: '50%', overflow: 'hidden', width: 75, height: 75 }}>
                <img src={gravatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div >
                <div>
                    <p className="profile_verified">Verified</p>
                </div>
            </div>
        </div>
        </>
    );
  }
  
  function ProfileDataSection({ userData }) {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [newName, setNewName] = useState(userData.name);
    const [newAddress, setNewAddress] = useState(userData.address);
    const [newEmail, setNewEmail] = useState(userData.email);
    const dispatch = useDispatch();

    const handleNameEdit = () => {
        setIsEditingName(true);
    };

    const handleAddressEdit = () => {
        setIsEditingAddress(true);
    };

    const handleEmailEdit = () => {
        setIsEditingEmail(true);
    };

    const handleNameSubmit = () => {
        axios.patch(`http://localhost:3001/profile/updateName/${userData.email}`, {  name: newName })
            .then(response => {
                console.log(response.data);
                dispatch(updateUserName(newName)); 
                setIsEditingName(false);
            })
            .catch(error => {
                console.error('Error updating name:', error);
            });
    };

    const handleAddressSubmit = () => {
        axios.patch(`http://localhost:3001/profile/updateAddress/${userData.email}`, { address: newAddress })
            .then(response => {
                console.log(response.data);
                dispatch(updateAddress(newAddress));
                setIsEditingAddress(false);
            })
            .catch(error => {
                console.error('Error updating address:', error);
            });
    };

    const handleEmailSubmit = () => {
        axios.patch(`http://localhost:3001/profile/updateEmail/${userData.email}`, { newEmail: newEmail })
            .then(response => {
                console.log(response.data);
                dispatch(updateEmail(newEmail));
                setIsEditingEmail(false);
            })
            .catch(error => {
                console.error('Error updating email:', error);
            });
    };

    return (
        <div className="professional">
            <p style={{ textAlign: 'center', fontSize: '30px', marginTop: "15px", marginBottom: "15px", fontWeight: '500' }}>Personal Details</p>
            <div className="professional_details">
                <div>
                    <p className="profile_data_rows">Your Name</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', marginBottom: "5px" }}>
                    {isEditingName ? (
                        <>
                            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="profile-data-values" />
                            <button className="edit-button" onClick={handleNameSubmit}>Save</button>
                        </>
                    ) : (
                        <>
                            <p className="profile-data-values">{userData.name}</p>
                            <button className="edit-button" onClick={handleNameEdit}>Edit</button>
                        </>
                    )}
                </div>
            </div>
            <div className="professional_details">
                <div>
                    <p className="profile_data_rows">Address</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', marginBottom: "5px" }}>
                    {isEditingAddress ? (
                        <>
                            <input type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} className="profile-data-values" />
                            <button className="edit-button" onClick={handleAddressSubmit}>Save</button>
                        </>
                    ) : (
                        <>
                            <p className="profile-data-values">{userData.address}</p>
                            <button className="edit-button" onClick={handleAddressEdit}>Edit</button>
                        </>
                    )}
                </div>
            </div>
            <div className="professional_details">
                <div>
                    <p className="profile_data_rows">Email</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', marginBottom: "5px" }}>
                    {isEditingEmail ? (
                        <>
                            <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="profile-data-values" />
                            <button className="edit-button" onClick={handleEmailSubmit}>Save</button>
                        </>
                    ) : (
                        <>
                            <p className="profile-data-values">{userData.email}</p>
                            <button className="edit-button" onClick={handleEmailEdit}>Edit</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
  
export default CollegeSearchingProfile;