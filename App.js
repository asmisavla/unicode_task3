// Import necessary modules
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import SignUp from './components/signup';
import News from './components/newshome';
import NewsPage from './components/newspage'; // Updated import

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      // Fetch news data and set it in the state
      try {
        const response = await fetch(
          'https://newsapi.org/v2/top-headlines?country=in&apiKey=1a806300f4d94fada377bb9f7749a606'
        );
        const result = await response.json();
        setData(result.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    getNews();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/newshome" element={<News data={data} />} />
        {/* Pass the data to the NewsPage component */}
        <Route path="/newspage/:title" element={<NewsPage data={data} />} />
      </Routes>
    </Router>
  );
}

export default App;
