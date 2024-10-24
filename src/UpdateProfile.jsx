import React from 'react'

const UpdateProfile = () => {
  return (
    <>
        <section class="bage-body">
            <form method="post">
                <h2>Update Profile</h2>
                <label htmlFor="name">update  your name:</label>
                <input type="text" name="name" placeholder="enter your name" required/>
                <label htmlFor="email">update  your name:</label>
                <input type="email" name="email" placeholder="enter your email" required/>
                <label htmlFor="previous-password">previous password:</label>
                <input type="password" name="previous-password" placeholder="enter your old password" required/>
                <label htmlFor="new-password">new password:</label>
                <input type="password" name="new-password" placeholder="enter your new password" required/>
                <label htmlFor="confirm-password">confirm password:</label>
                <input type="password" name="confirm-password" placeholder="confirm your new password" required/>
                <label htmlFor="profile">update pic:</label>
                <input type="file" name="profile" placeholder="enter your name"/>
                <input type="submit" value="Update Profile"/>
                <div>
                </div>
            </form>
        </section>
    </>
  )
}

export default UpdateProfile
