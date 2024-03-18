import React, {useState} from 'react';
import './profileCollegeGoing.css';
import { useSelector , useDispatch} from 'react-redux';
// import Logo from './Images/logo.jpg';
import axios from 'axios';
import { updateUserName ,updateEmail, updateCollege, updateBranch, updateAddress, updateGraduationYear, updateAcademicsOpinion,updateExtraCurricularOpinion,updateOverallOpinion,updatePlacementsOpinion} from "./authActions";
import gravatar from 'gravatar';
function CollegeGoingProfile({ userData }) {

  return (
    <div className="profile-container">
      <div className="profile">
        <ProfileSection userData={userData} />
        <Opinions userData={userData} />
      </div>
    </div>
  );
}

function ProfileSection({userData}){
    return (
        <div className="profile_details">
            <ProfilePhotoSection userData={userData}/>
            <ProfileDataSection userData={userData}/>
            <ProfessionalsSection userData={userData}/>
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

  function ProfessionalsSection({userData}){

    const [isEditingCollege, setIsEditingCollege] = useState(false);
    const [isEditingBranch, setIsEditingBranch] = useState(false);
    const [isEditingGraduationYear, setIsEditingGraduationYear] = useState(false);
    const [newCollege, setNewCollege] = useState(userData.college);
    const [newBranch, setNewBranch] = useState(userData.major);
    const [newGraduationYear, setNewGraduationYear] = useState(userData.graduationYear);

    const dispatch = useDispatch();

    const handleBranchEdit = () => {
        setIsEditingBranch(true);
    };

    const handleCollegeEdit = () => {
        setIsEditingCollege(true);
    };

    const handleGraduationYearEdit = () => {
        setIsEditingGraduationYear(true);
    };

    const handleBranchSubmit = () => {
        axios.patch(`http://localhost:3001/profile/updateBranch/${userData.email}`, { branch: newBranch })
            .then(response => {
                console.log(response.data);
                dispatch(updateBranch(newBranch));
                setIsEditingBranch(false);
            })
            .catch(error => {
                console.error('Error updating branch:', error);
            });
    };

    const handleCollegeSubmit = () => {
        axios.patch(`http://localhost:3001/profile/updateCollege/${userData.email}`, { newCollege: newCollege })
            .then(response => {
                console.log(response.data);
                dispatch(updateCollege(newCollege));
                setIsEditingCollege(false);
            })
            .catch(error => {
                console.error('Error updating college:', error);
            });
    };

    const handleGraduationYearSubmit = () => {
        axios.patch(`http://localhost:3001/profile/updateGraduationYear/${userData.email}`, { graduationYear: newGraduationYear })
            .then(response => {
                console.log(response.data);
                dispatch(updateGraduationYear(newGraduationYear));
                setIsEditingGraduationYear(false);
            })
            .catch(error => {
                console.error('Error updating graduation year:', error);
            });
    };

    return(
        <div className="professional">
            <p style={{textAlign: 'center', fontSize: '30px', marginTop: "15px",marginBottom:"15px", fontWeight:'500'}}>College Details</p>
            <div className="professional_details">
                <div>
                    <p className="profile_data_rows">Your Branch</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', marginBottom: "5px" }}>
                    {isEditingBranch ? (
                        <>
                            <input type="text" value={newBranch} onChange={(e) => setNewBranch(e.target.value)} className="profile-data-values" />
                            <button className="edit-button" onClick={handleBranchSubmit}>Save</button>
                        </>
                    ) : (
                        <>
                            <p className="profile-data-values">{userData.major}</p>
                            <button className="edit-button" onClick={handleBranchEdit}>Edit</button>
                        </>
                    )}
                </div>
            </div>
            <div className="professional_details">
                <div>
                    <p className="profile_data_rows">Currently Studying at/Graduated from</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', marginBottom: "5px" }}>
                    {isEditingCollege ? (
                        <>
                            <input type="text" value={newCollege} onChange={(e) => setNewCollege(e.target.value)} className="profile-data-values" />
                            <button className="edit-button" onClick={handleCollegeSubmit}>Save</button>
                        </>
                    ) : (
                        <>
                            <p className="profile-data-values">{userData.college}</p>
                            <button className="edit-button" onClick={handleCollegeEdit}>Edit</button>
                        </>
                    )}
                </div>
            </div>
            <div className="professional_details">
                <div>
                    <p className="profile_data_rows">Graduation Year</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', marginBottom: "5px" }}>
                    {isEditingGraduationYear ? (
                        <>
                            <input type="text" value={newGraduationYear} onChange={(e) => setNewGraduationYear(e.target.value)} className="profile-data-values" />
                            <button className="edit-button" onClick={handleGraduationYearSubmit}>Save</button>
                        </>
                    ) : (
                        <>
                            <p className="profile-data-values">{userData.graduationYear}</p>
                            <button className="edit-button" onClick={handleGraduationYearEdit}>Edit</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
  }


  function Opinions({ userData }) {
    const [isEditingAcademics, setIsEditingAcademics] = useState(false);
    const [isEditingExtraCurricular, setIsEditingExtraCurricular] = useState(false);
    const [isEditingPlacements, setIsEditingPlacements] = useState(false);
    const [isEditingOverall, setIsEditingOverall] = useState(false);

    const [newAcademicsOpinion, setNewAcademicsOpinion] = useState(userData.opinion[0]);
    const [newExtraCurricularOpinion, setNewExtraCurricularOpinion] = useState(userData.opinion[1]);
    const [newPlacementsOpinion, setNewPlacementsOpinion] = useState(userData.opinion[2]);
    const [newOverallOpinion, setNewOverallOpinion] = useState(userData.opinion[3]);

    const dispatch = useDispatch();

    const handleAcademicsEdit = () => {
        setIsEditingAcademics(true);
    };

    const handleExtraCurricularEdit = () => {
        setIsEditingExtraCurricular(true);
    };

    const handlePlacementsEdit = () => {
        setIsEditingPlacements(true);
    };

    const handleOverallEdit = () => {
        setIsEditingOverall(true);
    };

    const handleAcademicsSubmit = () => {
        axios.patch(`http://localhost:3001/profile/updateAcademics/${userData.email}`, { opinion: newAcademicsOpinion })
            .then(response => {
                console.log(response.data);
                dispatch(updateAcademicsOpinion(newAcademicsOpinion));
                setIsEditingAcademics(false);
            })
            .catch(error => {
                console.error('Error updating academics opinion:', error);
            });
    };

    const handleExtraCurricularSubmit = () => {
        axios.patch(`http://localhost:3001/profile/updateExtraCurricular/${userData.email}`, { opinion: newExtraCurricularOpinion })
            .then(response => {
                console.log(response.data);
                dispatch(updateExtraCurricularOpinion(newExtraCurricularOpinion));
                setIsEditingExtraCurricular(false);
            })
            .catch(error => {
                console.error('Error updating extra curricular opinion:', error);
            });
    };

    const handlePlacementsSubmit = () => {
        axios.patch(`http://localhost:3001/profile/updatePlacements/${userData.email}`, { opinion: newPlacementsOpinion })
            .then(response => {
                console.log(response.data);
                dispatch(updatePlacementsOpinion(newPlacementsOpinion));
                setIsEditingPlacements(false);
            })
            .catch(error => {
                console.error('Error updating placements opinion:', error);
            });
    };

    const handleOverallSubmit = () => {
        axios.patch(`http://localhost:3001/profile/updateOverall/${userData.email}`, { opinion: newOverallOpinion })
            .then(response => {
                console.log(response.data);
                dispatch(updateOverallOpinion(newOverallOpinion));
                setIsEditingOverall(false);
            })
            .catch(error => {
                console.error('Error updating overall opinion:', error);
            });
    };

    return (
        <div className="opinions">
            <p style={{ textAlign: 'center', fontSize: '30px', marginTop: "15px", marginBottom: "15px", fontWeight: '500' }}>Opinions</p>
            <div className="opinions_details">
                <div>
                    <p className="opinions_data_rows">Academics</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', marginBottom: "5px" }}>
                    {isEditingAcademics ? (
                        <>
                            <input type="text" value={newAcademicsOpinion} onChange={(e) => setNewAcademicsOpinion(e.target.value)} className="opinions-data-values" />
                            <button className="edit-button" onClick={handleAcademicsSubmit}>Save</button>
                        </>
                    ) : (
                        <>
                            <p className="opinions-data-values">{userData.opinion[0]}</p>
                            <button className="edit-button" onClick={handleAcademicsEdit}>Edit</button>
                        </>
                    )}
                </div>
            </div>
            <div className="opinions_details">
                <div>
                    <p className="opinions_data_rows">Extra Curricular Activities</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', marginBottom: "5px" }}>
                    {isEditingExtraCurricular ? (
                        <>
                            <input type="text" value={newExtraCurricularOpinion} onChange={(e) => setNewExtraCurricularOpinion(e.target.value)} className="opinions-data-values" />
                            <button className="edit-button" onClick={handleExtraCurricularSubmit}>Save</button>
                        </>
                    ) : (
                        <>
                            <p className="opinions-data-values">{userData.opinion[1]}</p>
                            <button className="edit-button" onClick={handleExtraCurricularEdit}>Edit</button>
                        </>
                    )}
                </div>
            </div>
            <div className="opinions_details">
                <div>
                    <p className="opinions_data_rows">Placements</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', marginBottom: "5px" }}>
                    {isEditingPlacements ? (
                        <>
                            <input type="text" value={newPlacementsOpinion} onChange={(e) => setNewPlacementsOpinion(e.target.value)} className="opinions-data-values" />
                            <button className="edit-button" onClick={handlePlacementsSubmit}>Save</button>
                        </>
                    ) : (
                        <>
                            <p className="opinions-data-values">{userData.opinion[2]}</p>
                            <button className="edit-button" onClick={handlePlacementsEdit}>Edit</button>
                        </>
                    )}
                </div>
            </div>
            <div className="opinions_details">
                <div>
                    <p className="opinions_data_rows">Overall</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', marginBottom: "5px" }}>
                    {isEditingOverall ? (
                        <>
                            <input type="text" value={newOverallOpinion} onChange={(e) => setNewOverallOpinion(e.target.value)} className="opinions-data-values" />
                            <button className="edit-button" onClick={handleOverallSubmit}>Save</button>
                        </>
                    ) : (
                        <>
                            <p className="opinions-data-values">{userData.opinion[3]}</p>
                            <button className="edit-button" onClick={handleOverallEdit}>Edit</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
  
export default CollegeGoingProfile;