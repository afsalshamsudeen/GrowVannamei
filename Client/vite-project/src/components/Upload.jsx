import React from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const Upload = () => {
  return (
    <div className='text-white h-150 w-300 bg-[#0b1423] rounded-md flex items-center flex-col gap-10 border border-white-300' >
      <h1 className='mt-10' >SELECT DATASET</h1>
      <div className='flex items-center justify-center flex-col mt-30 text-white w-190 h-60 bg-[#101a2a] rounded-md cursor-pointer border border-white-300'>
        <CloudUploadIcon/>
        <p>Browse or drop image</p>
      </div>
      <p>We think data protection is important! No data is sent. The magic happens in your browser.</p>
      <button className='w-300 cursor-pointer border border-white-300'>Cancel</button>
    </div>
  )
}

export default Upload
