import React from 'react'
import ProfileHeader from './ProfileHeader'
import FollowBar from './FollowBar'
import { useParams } from "react-router-dom";

const DashBoard = () => {
  // const {username} = useParams(); //should be passed to the dashboard
  // const loggedUser = "saman";
  // const isOwner = loggedUser === username; //should be passed
  return (

    <ProfileHeader fullName='saman khajeamiri' isOwner = {false}/>
  )
}

export default DashBoard