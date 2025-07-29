import React, { useState } from 'react'
import Title from './Title'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Upload from './Upload';
import axios from 'axios';
import PredictionTable from './PredictionTable';

const Card = () => {

  const [open, setOpen] = useState(false);
  const [csvData, setCsvData] = useState(null);
  const [csvFileName, setCsvFileName] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [parsedCsvRows, setParsedCsvRows] = useState([]);


  const handlePredict = async()=>{
    if(!csvData){
      alert("Please upload a csv file first");
      return;
    }
    console.log('Sending data to back end: ',csvData);

    //TODO Axios logic to send csv file to backend
    try{
      const response = await axios.post('http://localhost:8000/predict', csvData,{
        headers:{
          'Content-Type': 'text/plain',
        }
      } );

      console.log('Prediction Response:', response.data);
      setPredictions(response.data.predictions)
      //alert(`Prediction Result: ${JSON.stringify(response.data)}`);

    }catch (error){
      console.error('Error Predicting: ', error);
      alert('Prediction failed! check Console for details');
      

    }
    setOpen(false);

  }

  return (
    <>
    
    <div className='flex items-center flex-col gap-4 pt-40 mt-10 w-140 h-170 bg-[#0b1423] rounded-md '>
      <h1 className='font-inter text-center text-4xl text-white font-bold'>Shrimp Growth <br/>& <br/>Feed Predictor</h1>
      <p className='text-white'>Upload your shrimp data CSV and get growth predictions</p>

      <div className='flex items-center justify-center flex-col text-white w-96 h-20 bg-[#101a2a] rounded-md cursor-pointer' onClick={()=> setOpen(true)}>
        <DriveFolderUploadIcon/>
        
        <h2 className='font-medium'> {csvFileName ? `selected File: ${csvFileName}` : 'Upload Shrimp Data (.csv)'} </h2>
        
        </div>
      <button onClick={handlePredict} className='bg-blue-500 text-white px-4 py-2 rounded-md font-medium cursor-pointer hover:bg-blue-600'> Upload and Predict</button>
    </div>
    {Array.isArray(predictions) && predictions.length > 0 && (
   <PredictionTable predictions={predictions} csvRows={parsedCsvRows}/>
  )}
     {open && (
      
      <div className='fixed inset-0 flex items-center justify-center bg-black/30 z-50'>
      <Upload setOpen={setOpen} setCsvData={setCsvData} setCsvFileName={setCsvFileName} setParsedCsvRows={setParsedCsvRows}/>
      </div>
      
      )}
    </>
  )
}

export default Card