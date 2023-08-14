import React, { useState } from 'react';
import './CardCourse.css';
import Popup from './Popup';
import ReactjsPDF from '../../documentation/Reactjs.pdf'; // Import the PDF file
import NodejsPDF from '../../documentation/express.pdf'; // Import the PDF file
import MongoPDF from '../../documentation/mongodb.pdf'; // Import the PDF file
import CppPDF from '../../documentation/Cpp.pdf'; // Import the PDF file


const CardCourse = () => {
    const [isPopupReactOpen, setIsPopupReactOpen] = useState(false);
    const [isPopupNodeOpen, setIsPopupNodeOpen] = useState(false);
    const [isPopupMongoOpen, setIsPopupMongoOpen] = useState(false);
    const [isPopupCppOpen, setIsPopupCppOpen] = useState(false);

    const handleOpenReactPDF = () => {
        window.open(ReactjsPDF, '_blank');
      };

    const handleOpenNodePDF = () => {
        window.open(NodejsPDF, '_blank');
    };
    const handleOpenMongoPDF = () => {
      window.open(MongoPDF, '_blank');
  };
  const handleOpenCppPDF = () => {
    window.open(CppPDF, '_blank');
};
  return (
    <div className="full" style={{ background: 'linear-gradient(253deg, #0cc898, #1797d2, #864fe1)' }}>
    <div className="row1">
       
    <div className="cardCourse example2">
        <div className="wrapper1" style={{ height: '100px' }}>
          <div className="header1">
          <div className="data">
            <div className="content1">
              <h1 className="title1"><a href="#">React Js Course</a></h1>
              <p className="text1" style={{ alignItems: 'center', textAlign: 'center', color: 'white', fontWeight: 'bold', marginTop: '10px' }}>Improve Your React skills with us</p>
              <a href="#" className="button" onClick={() => setIsPopupReactOpen(true)} style={{ fontSize: '25px', marginTop: '100px' }}>Start</a>
                    {isPopupReactOpen && (
                        <Popup
                            onClose={() => setIsPopupReactOpen(false)}
                            onOpenPDF={handleOpenReactPDF}
                        />
                    )}
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cardCourse example3" >
        <div className="wrapper1" style={{height:'100px'}}>
          <div className="header1">
          </div>
          <div className="data">
            <div className="content1">
              
              <h1 style={{fontSize:'45px'}}><a href="#">Node Js && Express Js Course</a></h1>
              <p className="text1" style={{alignItems:'center',textAlign:'center',color:'white',fontWeight:'bold',marginTop:'10px'}}>Improve Your Node & Express skills with us</p>
              <a href="#" className="button" onClick={() => setIsPopupNodeOpen(true)} style={{fontSize:'25px',marginTop:'130px'}}>Start</a>
              {isPopupNodeOpen && (
                <Popup
                  onClose={() => setIsPopupNodeOpen(false)}
                  onOpenPDF={handleOpenNodePDF}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="cardCourse example4" >
        <div className="wrapper1" style={{height:'100px'}}>
          <div className="header1">
          </div>
          <div className="data">
            <div className="content1">
              
              <h1 className="title1"><a href="#">MongoDB Course</a></h1>
              <p className="text1" style={{alignItems:'center',textAlign:'center',color:'white',fontWeight:'bold',marginTop:'10px'}}>Improve Your MongoDB skills with us</p>
              <a href="#" className="button" onClick={() => setIsPopupMongoOpen(true)} style={{fontSize:'25px',marginTop:'100px'}}>Start</a>
              {isPopupMongoOpen && (
                <Popup
                  onClose={() => setIsPopupMongoOpen(false)}
                  onOpenPDF={handleOpenMongoPDF}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="cardCourse example5" >
        <div className="wrapper1" style={{height:'100px'}}>
          <div className="header1">
          </div>
          <div className="data">
            <div className="content1">
              
              <h1 className="title1"><a href="#">C++ Course</a></h1>
              <p className="text1" style={{alignItems:'center',textAlign:'center',color:'white',fontWeight:'bold',marginTop:'10px'}}>Improve Your C++ skills with us</p>
              <a href="#" className="button" onClick={() => setIsPopupCppOpen(true)} style={{fontSize:'25px',marginTop:'100px'}}>Start</a>
              {isPopupCppOpen && (
                <Popup
                  onClose={() => setIsPopupCppOpen(false)}
                  onOpenPDF={handleOpenCppPDF}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="cardCourse example2" >
        <div className="wrapper1" style={{height:'100px'}}>
          <div className="header1">
          </div>
          <div className="data">
            <div className="content1">
              
              <h1 className="title1"><a href="#">React Js Course</a></h1>
              <p className="text1" style={{alignItems:'center',textAlign:'center',color:'white',fontWeight:'bold',marginTop:'10px'}}>Improve Your React skills with us</p>
              <a href="#" className="button" style={{fontSize:'25px',marginTop:'100px'}}>Start</a>
            </div>
          </div>
        </div>
      </div>
      <div className="cardCourse example2" >
        <div className="wrapper1" style={{height:'100px'}}>
          <div className="header1">
          </div>
          <div className="data">
            <div className="content1">
              
              <h1 className="title1"><a href="#">React Js Course</a></h1>
              <p className="text1" style={{alignItems:'center',textAlign:'center',color:'white',fontWeight:'bold',marginTop:'10px'}}>Improve Your React skills with us</p>
              <a href="#" className="button" style={{fontSize:'25px',marginTop:'100px'}}>Start</a>
            </div>
          </div>
        </div>
      </div>
      <div className="cardCourse example2" >
        <div className="wrapper1" style={{height:'100px'}}>
          <div className="header1">
          </div>
          <div className="data">
            <div className="content1">
              
              <h1 className="title1"><a href="#">React Js Course</a></h1>
              <p className="text1" style={{alignItems:'center',textAlign:'center',color:'white',fontWeight:'bold',marginTop:'10px'}}>Improve Your React skills with us</p>
              <a href="#" className="button" style={{fontSize:'25px',marginTop:'100px'}}>Start</a>
            </div>
          </div>
        </div>
      </div>
      <div className="cardCourse example2" >
        <div className="wrapper1" style={{height:'100px'}}>
          <div className="header1">
          </div>
          <div className="data">
            <div className="content1">
              
              <h1 className="title1"><a href="#">React Js Course</a></h1>
              <p className="text1" style={{alignItems:'center',textAlign:'center',color:'white',fontWeight:'bold',marginTop:'10px'}}>Improve Your React skills with us</p>
              <a href="#" className="button" style={{fontSize:'25px',marginTop:'100px'}}>Start</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CardCourse;
