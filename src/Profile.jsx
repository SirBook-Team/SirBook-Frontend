import React from 'react';
import profileImg from './images/profile.png';


const Profile = () => {
  return (
    <>
        <section className='bage-body'>
            <div className='profile-container'>
                {/* <h1>Your Profile</h1>
                <hr/> */}
                <div className="main-box">
                    <img alt='Profile-image' src={profileImg}/>
                    <h2>Ibrahim Adel</h2>
                {/* <div className="">
                    <h2>Ibrahim Adel</h2>
                    <p>developer</p>
                </div> */}
                </div>
                <div className='posts-box'>

                </div>
            </div>
        </section>
    </>
  )
}

export default Profile
