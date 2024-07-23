import React, { useState } from 'react';
import axios from 'axios';

function SentimentForm() {
  const [file, setFile] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('keyword', keyword);

    try {
      const response = await axios.post('http://localhost:5000/analyze-sentiment', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Upload a file and enter a keyword:</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <input type="text" value={keyword} onChange={handleKeywordChange} placeholder="Enter keyword" required />
        <button type="submit">Submit</button>
      </form>
      {result && (
        <div>
          <h3>Results:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default SentimentForm;
