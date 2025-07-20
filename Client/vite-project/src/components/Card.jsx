import React from 'react'
import Title from './Title'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const Card = () => {
  return (
    <div className='flex items-center flex-col gap-4 pt-40 mt-10 w-140 h-170 bg-[#0b1423] rounded-md '>
      <h1 className='font-inter text-center text-4xl text-white font-bold'>Shrimp Growth <br/>& <br/>Feed Predictor</h1>
      <p className='text-white'>Upload your shrimp data CSV and get growth predictions</p>

      <div className='flex items-center justify-center flex-col text-white w-96 h-20 bg-[#101a2a] rounded-md cursor-pointer' >
        <DriveFolderUploadIcon/>
        <h2 className='font-medium'>Upload Shrimp Data (.csv)</h2>
        </div>
      <button className='bg-blue-500 text-white px-4 py-2 rounded-md font-medium cursor-pointer hover:bg-blue-600'> Upload and Predict</button>
    </div>
  )
}

export default Card