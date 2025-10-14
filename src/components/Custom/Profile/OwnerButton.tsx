import { Button } from '@/components/ui/button'
import React from 'react'

const OwnerButton = () => {
  return (
    <div className='flex justify-around mr-5 ml-5 mt-5'>
        <div>
        <Button className='w-40 h-8.5 rounded-[12.5px] bg-[var(--color-blue-side)] text-white font-bold shadow-[0_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black '>
        ویرایش پروفایل
        </Button>
        </div>
        <div>
        <Button className='w-40 h-8.5 rounded-[12.5px] bg-[var(--color-blue-main)] text-white font-bold shadow-[0_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black'> 
        بساز+
        </Button>
        </div>
    </div>
  )
}

export default OwnerButton