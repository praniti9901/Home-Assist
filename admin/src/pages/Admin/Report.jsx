import React from 'react';
import('json2csv')
  .then(({ Parser }) => {
    const parser = new Parser();
    console.log(parser);
  })
  .catch(error => console.error('Failed to load json2csv:', error));


const Report = ({ appointments }) => {
  
  const generateReport = () => {
    if (!appointments || appointments.length === 0) {
      alert("No appointments available to generate a report.");
      return;
    }

    const fields = [
      { label: "Booking ID", value: "_id" },
      { label: "User Name", value: "userData.name" },
      { label: "User Age", value: "userData.dob" }, 
      { label: "Date & Time", value: (row) => `${row.slotDate}, ${row.slotTime}` },
      { label: "Worker Name", value: "docData.name" },
      { label: "Fees", value: "amount" },
      { label: "Status", value: (row) => row.cancelled ? "Cancelled" : row.isCompleted ? "Completed" : "Pending" }
    ];

    const json2csvParser = new Parser({ fields });
    const csvData = json2csvParser.parse(appointments);

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Appointments_Report_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <button 
      onClick={generateReport} 
      className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
    >
      Download Report
    </button>
  );
};

export default Report;
