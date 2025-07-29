import React from 'react'

const PredictionTable = ({ predictions, }) => {
  return (
    <div className="bg-[#0b1423] p-4 rounded-md mt-4 text-white">
      <table className="min-w-full border border-gray-500">
        <thead>
          <tr>
            <th className="border p-2">Variant Name</th>
            <th className="border p-2">Days of culture</th>
            <th className="border p-2">Predicted Growth (g)</th>
            <th className="border p-2">Recommended Feed (kg)</th>
          </tr>
        </thead>
        <tbody>
            {predictions.map((prediction, index) => (
                <tr key={index}>
                    <td className="border p-2">{prediction.Variant}</td>
                    <td className="border p-2">{prediction.DOC}</td>
                    <td className="border p-2">{Number(prediction.PredictedGrowth).toFixed(2)}</td>
                    <td className="border p-2">{(Number(prediction.PredictedGrowth) * 0.05).toFixed(2)}</td>
                </tr>
    ))}

        </tbody>
      </table>

      <div className='flex items-center justify-center mt-6'>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-md font-medium cursor-pointer hover:bg-blue-600'>Download Results as CSV</button>
      </div>
    </div>
  )
}

export default PredictionTable;
