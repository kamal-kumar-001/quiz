import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/dashboard/Layout';
import AdminRoute from '../../components/dashboard/adminRoute';

const QuizGenerator = () => {
    const [generatedText, setGeneratedText] = useState('');
    const [numQuestions, setNumQuestions] = useState(5);
    const [quizData, setQuizData] = useState('');
    const [quizzes, setQuizzes] = useState('');


    const generateQuiz = async () => {
        // Make API request to OpenAI to generate quiz content
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',
            prompt: `user: Generate  a quiz with 3 questions  on general knowledge
      
      {
        "title": "General Knowledge Quiz",
        "questions": [
          {
            "question": "What is the capital of Australia?",
            "options": [
              {
                "text": "Sydney",
                "isCorrect": false,
              },
              {
                "text": "Melbourne",
                "isCorrect": false,
              },
              {
                "text": "Canberra",
                "isCorrect": true,
                "explanation": "Canberra is the capital city of Australia"
              },
              {
                "text": "Brisbane",
                "isCorrect": false,
              }
            ]
          },
          {
            "question": "What is the largest planet in our solar system?",
            "options": [
              {
                "text": "Mars",
                "isCorrect": false,
              },
              {
                "text": "Jupiter",
                "isCorrect": true,
                "explanation": "Jupiter is the largest planet in our solar system"
              },
              {
                "text": "Venus",
                "isCorrect": false,
              },
              {
                "text": "Neptune",
                "isCorrect": false,
              }
            ]
          },
          {
            "question": "Who painted the Mona Lisa?",
            "options": [
              {
                "text": "Vincent van Gogh",
                "isCorrect": false,
              },
              {
                "text": "Leonardo da Vinci",
                "isCorrect": true,
                "explanation": "Leonardo da Vinci painted the Mona Lisa"
              },
              {
                "text": "Pablo Picasso",
                "isCorrect": false,
              },
              {
                "text": "Michelangelo",
                "isCorrect": false,
              }
            ]
          }
        ]
      }
      
      user:Generate  a quiz with ${numQuestions} questions  on  ${quizData} `,
            max_tokens: 1500,
            temperature: 0.7,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'OpenAI-Organization': 'org-X4uchG1oNNo7lafnMLetFXP9',
                'Authorization': 'Bearer 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',
            },
        });

        // Set generated text in state

        //     setGeneratedText(response.data.choices[0].text);
        //   };
        // Parse the JSON response
        // jsonResponse = JSON.stringify(quizData)
        // const generatedQuizData = JSON.parse(response.data.choices[0].text);
        setGeneratedText(response.data.choices[0].text);
        // sendQuizData();
    };
    
    
    const sendQuizData = async () => {
        setQuizzes(JSON.parse(quizData));
        

        try {
            const data = JSON.parse(quizData);
            const response = await axios.post('/api/quiz', data);
            // const response = await axios.post('/api/quiz', generatedText);
            console.log(response.data);
            // console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
      <AdminRoute>
      <Layout>
        <div className="flex flex-col space-y-4 h-full w-full  bg-gray-50 dark:bg-gray-500 relative overflow-y-auto p-8 lg:ml-64">
            <div className="flex flex-col">
                <label className="font-bold mb-2" htmlFor="numQuestions">Number of Questions: <span>This is beta version keep the number around 5 </span></label>
                <input className="border rounded-md p-2" type="number" id="numQuestions" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} />
            </div>
            <div className="flex flex-col">
                <label className="font-bold mb-2" htmlFor="quizData">Quiz Data:</label>
                <textarea className="border rounded-md p-2" id="quizData" type='text' onChange={(e) => setQuizData(e.target.value)} />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generateQuiz}>Generate Quiz Data</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={sendQuizData}>Generate Quiz</button>
            <div className="mt-4">{generatedText}</div>
            <div > 
             {quizzes && quizzes.questions.map((question, index) => (
               <div key={question._id} className="my-4">
                 <p className="font-bold mb-2">Question {index + 1} of {quizzes.questions.length}</p>
                 <p>{question.question}</p>
                 <ul className="list-disc pl-5">
                   {question.options.map((option) => (
                     <li key={option._id} className="my-2">
                       <input
                         type="radio"
                         name="option"
                         id={option._id}
                         value={option.text}
                         disabled
                         className="mr-2"
                       />
                       <label htmlFor={option._id}>
                         {option.text} {option.isCorrect && <span className="text-green-600 font-bold ml-2">(Correct)</span>}
                       </label>
                       <p className="text-gray-500">{option.explanation || ''}</p>
                     </li>
                   ))}
                 </ul>
                </div>
             ))}
            </div>
        </div>
      </Layout>
    </AdminRoute>
    );
};

export default QuizGenerator;
