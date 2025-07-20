import React from 'react'
import Avatar from '../assets/prawn.png';
const NavBar = () => {
  return (
    <div className='flex items-center justify-between flex-row sticky p-5 text-white'>
        <div className='flex items-center flex-row gap-2'>
            <img className='h-10' src={Avatar} alt="avatar" />
            <h1 className='font-inter text-center text-2xl text-white font-bold'>Grow Vannamei</h1>
        </div>
        
        <div className='flex items-center justify-between flex-row gap-10 cursor-pointer'>
            <p>Home</p>
            <p>About</p>
            <p>Service</p>
            <p>Blog</p>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md font-medium cursor-pointer hover:bg-blue-600'>Login</button>
        </div>
    </div>
  )
}

export default NavBar
