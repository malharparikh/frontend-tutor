import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import HomePage from './components/HomePage';
import TextAnalyzer from './components/TextAnalyzer';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Router>
        <Header />
      <Layout className="app-layout">
        <Content className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analyze" element={<TextAnalyzer />} />
          </Routes>
        </Content>
      </Layout>
        <Footer />
    </Router>
  );
}

export default App;

// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { Layout } from 'antd';
// import HomePage from './components/HomePage';
// import TextAnalyzer from './components/TextAnalyzer';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Auth from './components/Auth'; // Import Auth.js
// import './App.css';

// const { Content } = Layout;

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Check if token exists to set authenticated state
//     const token = localStorage.getItem('token');
//     setIsAuthenticated(!!token);
//   }, []);

//   // Logout function to clear the token
//   const logout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//   };

//   return (
//     <Router>
//       <Header logout={logout} isAuthenticated={isAuthenticated} />
//       <Layout className="app-layout">
//         <Content className="app-content">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/login" element={<Auth />} />
//             <Route
//               path="/analyze"
//               element={isAuthenticated ? <TextAnalyzer /> : <Navigate to="/login" />}
//             />
//           </Routes>
//         </Content>
//       </Layout>
//       <Footer />
//     </Router>
//   );
// }

// export default App;


