import React from 'react';
import './ResultReactTable.css'; // Import your CSS file for styling

const ResultReactTable = () => {
  return (
    <div className='table-container'>
      <table className='result-table'>
        <thead className='table-header'>
          <tr className='table-row'>
            <th>Name</th>
            <th>Attempts</th>
            <th>Earn Points</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr className='table-row'>
            <td>Raslen Ouarghi</td>
            <td>50</td>
            <td>50</td>
            <td>Passed</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default ResultReactTable;
