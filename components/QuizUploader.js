import { useState } from 'react';

function QuizUploader() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      const quizData = JSON.parse(reader.result);

      // Store quizData in local storage
      localStorage.setItem('quizData', JSON.stringify(quizData));
      
    };
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {/* <p>{quizData}</p> */}
    </div>
  );
}

export default QuizUploader;
