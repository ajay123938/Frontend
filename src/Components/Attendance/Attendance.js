import React, { useEffect, useState } from 'react'
import './Attendance.css'
import LoadingSpinner from '../spinner/LoadingSpinner';

export default function Attendance() {
  const [studentData, setstudentData] = useState(null)
  const [data,setdata] = useState(null)
  useEffect(() => {
    fetchAttendance();
  }, []);

  function fetchAttendance() {

    fetch('https://backend-wqs5.onrender.com/Attendance', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

      .then(res => res.json())
      .then(data => {
        setstudentData(data.records)
        setdata(data.records[0])
        console.log(data)
      })
      .catch(err => console.log(err))

  }

  function changeSubject(index){
    setdata(studentData[index]);
  }



 if(!studentData) return <LoadingSpinner/>
  return (
    <>

      <div className='AttendanceCard'>
        {studentData != null && data != null ? (<><div className="subject-title">{data.Course__r.Name}</div>
          <div className="attendance-info">
            Total classes: {data.Total_Working_Day__r.Working_Days__c} | Present: {data.Total_Present_Days__c} | Absent: {data.Total_Working_Day__r.Working_Days__c-data.Total_Present_Days__c}
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${data.Total_Present_Percent__c}%` }}>{data.Total_Present_Percent__c}%</div>
          </div>
          <div className="nav-subjects">
            {studentData.map((item, i) => (
              <button key={i} onClick={()=>changeSubject(i)}>{item.Course__r.Name}</button>
            ))}

          </div></>) : null}

      </div>
    </>


  )
}
