import React, { useRef, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Papa from 'papaparse';

const Upload = ({ setOpen, setCsvData, setCsvFileName, setParsedCsvRows }) => {

  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');

  const parseCsv = (csvContent) =>{
    const parsed = Papa.parse(csvContent,{
      header:true,
      skipEmptyLines: true,
    });

    return parsed.data
  }

  const handleFileSelect = (e) =>{
    const file = e.target.files[0];
    if (file && file.type ==='text/csv'){
      setFileName(file.name);
      setCsvFileName(file.name);

      const reader = new FileReader();
      reader.onload = (event) =>{
        const csvContent = event.target.result;
        const parsedData = parseCsv(csvContent);
        setParsedCsvRows(parsedData);
        setCsvData(csvContent)
        
        console.log('csv content:', csvContent);
      };
      reader.readAsText(file);
    }else{
      alert('Please upload a valid CSV file!')
    }
  };

  const handleBrowseClick =()=>{
    fileInputRef.current.click();
  }
  return (
    <div className='text-white h-150 w-300 bg-[#0b1423] rounded-md flex items-center flex-col gap-10 border border-white-300' >
      <h1 className='mt-10' >SELECT DATASET</h1>
      
      <div className='flex items-center justify-center flex-col mt-30 text-white w-190 h-60 bg-[#2d3036] rounded-md cursor-pointer border border-white-300'
          onClick={handleBrowseClick}
        >
        <CloudUploadIcon/>
        <p>{fileName ? fileName: 'Browse or drop image'}</p>
        <input
          type='file'
          accept='.csv'
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{display: 'none'}}
        />
      </div>

      <p>We think data protection is important! No data is sent. The magic happens in your browser.</p>
      <button onClick={()=>setOpen(false)} className='w-300 cursor-pointer border border-white-300'>Back</button>
    </div>
  )
}

export default Upload
