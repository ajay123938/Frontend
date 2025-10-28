import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import './Marksheet.css'
import LoadingSpinner from "../spinner/LoadingSpinner";

export default function Marksheet() {
  const [fetching,setfetching] = useState(false)
  const [data, setData] = useState(null);
  const [totalMarks,settotalMarks]=useState(null)
  const [percent,setPercent]=useState(null)
  const [grade,setgrade]=useState(null)
  const sheetRef = useRef();

  useEffect(() => {
   fetchStudentMark()
  }, []);

  function fetchStudentMark(){
    setfetching(true);
    fetch('https://backend-wqs5.onrender.com/result',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    .then(Response => Response.json())
    .then(data=>{
      setData(data.records);
       calculateMarksPerGrade(data.records)
       setfetching(false)
      console.log(data)
    })
    .catch(error=>{
      console.log(error)
    })

  }

  const downloadPDF = async () => {
    const element = sheetRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const imgRatio = imgProps.width / imgProps.height;
    const pdfImgWidth = pageWidth - 40;
    const pdfImgHeight = pdfImgWidth / imgRatio;

    pdf.addImage(imgData, "PNG", 20, 20, pdfImgWidth, pdfImgHeight);
    pdf.save(`${data[0]?.Enrollment__r?.Student__Name__c ?? "student"}_marksheet.pdf`);
  };

  function calculateMarksPerGrade(data){
    let totalMarks = 0;
    let grade='Pass';
      for(let i= 0;i<data.length;i++){
        totalMarks+= data[i].Mark__c;

     if(data[i].Grade__c === "Fail"){
        grade = "Fail";
     }
      }
      settotalMarks(totalMarks)
      let fullMarks = data.length*75;
      let percent  = ((totalMarks/fullMarks)*100).toFixed(2);
      setPercent(percent);
      setgrade(grade);
      
  }

  if (!data) return <LoadingSpinner/>;

  return (
    <div style={{ padding: "20px" }} className="markCont">
      <button
        onClick={downloadPDF}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          padding: "10px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "16px"
        }}
      >
        Download Marksheet
      </button>

      <div
       className="marksheet"
        ref={sheetRef}
        style={{
          width: "700px",
          marginRight:"100px",
          backgroundColor: "#fff",
          border: "2px solid #333",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "0px",marginTop:"5px" }}>
          Sankalpa Education Limited
        </h2><br></br>
        <h4 style={{ textAlign: "center", marginBottom: "10px",marginTop:"0px" }}>Final Exam Marksheet</h4>

        <hr />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            marginBottom: "20px",
            fontSize: "16px"
          }}
        >
          <div>
            <strong>Name:{data[0].Enrollment__r.Student_Name__c}</strong>
          </div>
          <div>
            <strong>Total Marks:{totalMarks}</strong> 
          </div>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px"
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={thStyle}>S.N</th>
              <th style={thStyle}>Subject</th>
              <th style={thStyle}>Marks</th>
              <th style={thStyle}>Grade</th>
            </tr>
          </thead>
          <tbody>
            {data.map((sub, index) => (
              <tr key={index}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{sub.Enrollment__r.Course_Name__c}</td>
                <td style={tdStyle}>{sub.Mark__c}</td>
                <td style={tdStyle}>{sub.Grade__c}</td>

              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "16px"
          }}
        >
          <div>
            <strong>Percentage:</strong> {percent}%
          </div>
          <div>
            <strong>Grade:</strong>
            <span
              style={{
                color:
                  grade === "Fail" ? "red" : "green",
                fontWeight: "bold"
              }}
            >
              {grade}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Table styles
const thStyle = {
  border: "1px solid #333",
  padding: "8px",
  textAlign: "center",
  fontWeight: "bold"
};

const tdStyle = {
  border: "1px solid #333",
  padding: "8px",
  textAlign: "center"
};
