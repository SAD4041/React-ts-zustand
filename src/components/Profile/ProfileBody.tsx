import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import ProfilePosts from './ProfilePosts';
import ProfileChallenges from './ProfileChallenges';

const ProfileBody = () => {

    const [selectedPage,setSelectedPage] = useState<"posts"|"challenges">("challenges");

  return (
    <>
    <div className="flex items-stretch justify-center mt-5 w-full max-w-md mx-auto">
      <Button onClick={() => setSelectedPage("posts")} className={`transition-all duration-500 flex-1 rounded-none bg-transparen shadow-none border-b-2 border-r-1 border-gray-500 text-gray-500 font-bold ${selectedPage === "posts" && "border-b-primary text-primary"}`}>پست‌ها</Button>
      <Button onClick={() => setSelectedPage("challenges")} className={`transition-all duration-800 flex-1 rounded-none bg-transparen shadow-none border-b-2 border-l-1 border-gray-500 text-gray-500 font-bold ${selectedPage === "challenges" && "border-b-primary text-primary"}`}>چالش‌ها</Button>
    </div>
    {selectedPage === "posts" && <ProfilePosts></ProfilePosts>}
    {selectedPage === "challenges" && <ProfileChallenges></ProfileChallenges>}
    </>
  )
}

export default ProfileBody