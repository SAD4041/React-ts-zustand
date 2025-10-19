import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import ProfilePosts from './ProfilePosts';
import ProfileChallenges from './ProfileChallenges';

const ProfileBody = () => {

    const [selectedPage,setSelectedPage] = useState<"posts"|"challenges">("challenges");

  return (
    <>
    <div className="flex items-stretch justify-center mt-5 w-full sm:max-w-xl md:max-w-2xl mx-auto">
      <Button onClick={() => setSelectedPage("posts")} className={`cursor-pointer hover:bg-[var(--color-gray-side)] transition-all duration-500 flex-1 rounded-none bg-transparen shadow-none border-b-2 border-r-1 border-[var(--color-gray-main)] text-[var(--color-gray-main)] font-bold ${selectedPage === "posts" && "border-b-[var(--color-orange-main)] text-[var(--color-orange-main)]"}`}>پست‌ها</Button>
      <Button onClick={() => setSelectedPage("challenges")} className={`cursor-pointer hover:bg-[var(--color-gray-side)] transition-all duration-500 flex-1 rounded-none bg-transparen shadow-none border-b-2 border-l-1 border-[var(--color-gray-main)] text-[var(--color-gray-main)] font-bold ${selectedPage === "challenges" && "border-b-[var(--color-orange-main)] text-[var(--color-orange-main)]"}`}>چالش‌ها</Button>
    </div>
    {selectedPage === "posts" && <ProfilePosts></ProfilePosts>}
    {selectedPage === "challenges" && <ProfileChallenges></ProfileChallenges>}
    </>
  )
}

export default ProfileBody