import React, { useState } from 'react';
import './CardCourse.css';
import Popup from './Popup';
import ReactjsPDF from '../../documentation/Reactjs.pdf'; // Import the PDF file
import NodejsPDF from '../../documentation/express.pdf'; // Import the PDF file
import MongoPDF from '../../documentation/mongodb.pdf'; // Import the PDF file
import CppPDF from '../../documentation/Cpp.pdf'; // Import the PDF file
import pythonPDF from '../../documentation/python.pdf'; // Import the PDF file
import CssPDF from '../../documentation/Css.pdf'; // Import the PDF file
import JavaPDF from '../../documentation/java.pdf'; // Import the PDF file
import HTMLPDF from '../../documentation/HTML.pdf'; // Import the PDF file
import DatasciencePDF from '../../documentation/Datascience.pdf'; // Import the PDF file
import SqlPDF from '../../documentation/sql.pdf'; // Import the PDF file
import JSPDF from '../../documentation/js.pdf'; // Import the PDF file
import MVCPDF from '../../documentation/MVC.pdf'; // Import the PDF file
import GitPDF from '../../documentation/git.pdf'; // Import the PDF file
import DockerPDF from '../../documentation/Docker.pdf'; // Import the PDF file
import UMLPDF from '../../documentation/uml.pdf'; // Import the PDF file
import JenkinsPDF from '../../documentation/Jenkins.pdf'; // Import the PDF file
import FMLPDF from '../../documentation/FML.pdf'; // Import the PDF file
import AWSPDF from '../../documentation/AWS_DevOps.pdf'; // Import the PDF file
import LeetcodePDF from '../../documentation/Leetccode.pdf'; // Import the PDF file

import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

const CardCourse = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory(); // Initialize useHistory


  const courseToQuizRoute = {
    'React Js Course': '/mainQuizReact',
    'Node Js && Express Js Course': '/mainQuizNode',
    // Add other courses and routes as needed
  };
  const courses = [
    { title: 'React Js Course', pdf: ReactjsPDF, image: 'https://th.bing.com/th/id/OIP.lL9qmmWS18bmMBGL46eSKwHaEK?pid=ImgDet&rs=1' },
    { title: 'Node Js && Express Js Course', pdf: NodejsPDF, image: 'https://th.bing.com/th/id/R.26d642a7818e7aa65aadef032fb99bba?rik=%2bSJxev%2bVrVB3sA&pid=ImgRaw&r=0' },
    { title: 'MongoDB Course', pdf: MongoPDF, image: 'https://wallpapercave.com/wp/wp8724850.jpg' },
    { title: 'C++ Course', pdf: CppPDF, image: 'https://thumbs.dreamstime.com/b/c-programming-code-abstract-technology-background-computer-software-coding-d-c-programming-code-abstract-technology-background-219889203.jpg' },
    { title: 'Python', pdf: pythonPDF, image: 'https://th.bing.com/th/id/OIP.mRi2FFn_4EWqld1VYoumLQHaD1?pid=ImgDet&rs=1' },
    { title: 'Java', pdf: JavaPDF, image: 'https://wallpapercave.com/wp/wp7250087.jpg' },
    { title: 'Html', pdf: HTMLPDF, image: 'https://th.bing.com/th/id/OIP.piQ-UxF9O_5EaSj6NtOKIAHaFr?pid=ImgDet&rs=1' },
    { title: 'Css', pdf: CssPDF, image: 'https://wallpaperaccess.com/full/2987471.jpg' },
    { title: 'Data Science', pdf: DatasciencePDF, image: 'https://wallpapercave.com/wp/wp4748437.jpg' },
    { title: 'SQL', pdf: SqlPDF, image: 'https://th.bing.com/th/id/R.7aeb859f97ff007fd4ef7df7918937a9?rik=YKqfyHOYNunk7A&pid=ImgRaw&r=0' },
    { title: 'JavaScript', pdf: JSPDF, image: 'https://th.bing.com/th/id/R.644bbfda75638ada41fa384b4607e7e0?rik=uEWDZ4a%2b9LCBmA&pid=ImgRaw&r=0' },
    { title: 'MVC Architect', pdf: MVCPDF, image: 'https://th.bing.com/th/id/R.4778bcf1d7a2e354b5ef1c5dfad33b52?rik=1ZMhz0w42%2fB13Q&pid=ImgRaw&r=0' },
    { title: 'Git', pdf: GitPDF, image: 'https://th.bing.com/th/id/R.0590e4b8b992282c08269d3c1ae2be0c?rik=U7RYqPEBpuIlrw&pid=ImgRaw&r=0' },
    { title: 'Docker', pdf: DockerPDF, image: 'https://th.bing.com/th/id/R.1923f6d322b25a92afa8d7a4362ca26b?rik=epqf8Q2j4rnACw&pid=ImgRaw&r=0' },
    { title: 'UML', pdf: UMLPDF, image: 'https://th.bing.com/th/id/OIP.5V8YTfH0FMo8DQrCDMdzzwFMC8?pid=ImgDet&rs=1' },
    { title: 'Jenkins', pdf: JenkinsPDF, image: 'https://pica.zhimg.com/v2-511d251fc2609579bcb0139402b37a4c_720w.jpg?source=172ae18b' },
    { title: 'Fondements du Machine Learning', pdf: FMLPDF, image: 'https://th.bing.com/th/id/R.0823327e7263a8462f1494c61b927efd?rik=f5bLkz1nKGhUOQ&riu=http%3a%2f%2fi1.hdslb.com%2fbfs%2farchive%2f4f113f350e844b645058d90795db8de2acb07842.jpg&ehk=Z%2brUeMQyEqnBGuLQoqMBOOFM9DmZ0Q7PtnHu%2fmpN%2fe8%3d&risl=&pid=ImgRaw&r=0' },
    { title: 'Introduction to DevOps on AWS ', pdf: AWSPDF, image: 'https://th.bing.com/th/id/R.fe1ade3704471c63b7ab42e02baebfaf?rik=zmk3CUBT1y7ZlQ&pid=ImgRaw&r=0' },
    { title: 'Leetcode Problems', pdf: LeetcodePDF, image: 'https://velog.velcdn.com/images/star7357/post/9b0a4bc0-bcf6-4a64-ae8e-d2d61c867ad6/LeetCode-thumbnail.png' },
    { title: 'Git', pdf: GitPDF, image: 'https://th.bing.com/th/id/R.0590e4b8b992282c08269d3c1ae2be0c?rik=U7RYqPEBpuIlrw&pid=ImgRaw&r=0' },

    

  ];
  const handleQuizStart = (course) => {
    const quizRoute = courseToQuizRoute[course.title];
    history.push(quizRoute);
  };
  const handleOpenPDF = (pdf) => {
    window.open(pdf, '_blank');
  };

  const handleCardClick = (course) => {
    setSelectedCourse(course);
    setIsPopupOpen(true);
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fulll" style={{ background: 'linear-gradient(253deg, #0cc898, #1797d2, #864fe1)' }}>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="search-input1"
      />
      <div className="row1">
        {filteredCourses.map((course, index) => (
          <div className="cardCourse" key={index} onClick={() => handleCardClick(course)}>
            <div className="wrapper1">
              <div className="data">
                <div className="card-image-container">
                  <img src={course.image} alt={course.title} className="card-image" />
                </div>
                <h1 style={{ fontSize: '24px', color: 'black', marginBottom: '10px' }}>
                  <a href="#">{course.title}</a>
                </h1>
                <p className="text1" style={{ color: '#666', fontWeight: 'bold', marginBottom: '10px' }}>
                  Improve Your {course.title} skills with us
                </p>
                <a href="#" className="button" onClick={() => handleOpenPDF(course.pdf)}>Start</a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isPopupOpen && selectedCourse && (
        <Popup
          onClose={() => setIsPopupOpen(false)}
          onOpenPDF={() => handleOpenPDF(selectedCourse.pdf)}
          onStartQuiz={() => handleQuizStart(selectedCourse)} // Add this line
        />
      )}
    </div>
  );
};

export default CardCourse;
