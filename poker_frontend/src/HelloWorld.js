import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HelloWorld = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/hello')
      .then(res => {
        setMessage(res.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default HelloWorld;
