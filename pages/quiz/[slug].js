import Head from 'next/head';
import { useMemo, useState } from 'react';
// import dynamic from 'next/dynamic';
// import { useRouter } from 'next/router';
// const Explanation = dynamic(() => import('./Explanation'));


function Quiz({ quizzes }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = useMemo(() => quizzes?.questions[currentQuestionIndex], [quizzes?.questions, currentQuestionIndex]);

    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    const [viewExplanation, setViewExplanation] = useState(false);

    const handleViewExplanation = () => {
        setViewExplanation(!viewExplanation)
    };
    const handleNext = () => {
        if (currentQuestionIndex < quizzes.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleAnswerSelect = (event) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestion._id]: event.target.value,
        });
    };
    const handleRetake = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setResult(false);
        setViewExplanation(false)
    };
    const submitQuiz = async () => {
        try {
          // Submit the quiz to the server
          const response = await fetch(`/api/quiz/${quizzes.slug}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            console.log('Quiz submitted successfully');
          } else {
            console.error('Quiz submission failed');
          }
        } catch (err) {
          console.error(err);
        }
      };
    const handleFinish = () => {
        let score = 0;
        quizzes?.questions.forEach((question) => {
            const selectedAnswer = selectedAnswers[question._id];
            if (selectedAnswer && selectedAnswer === question.options.find(option => option.isCorrect)?.text) {
                score++;
            }
        });
        setScore(score)
        setResult(true)
        submitQuiz();
    };
  

    return (
        <>
        <Head>
          <title>{quizzes.title}</title>
          <meta
            name="description"
            content='create a Quiz with next js'
          />
          <meta
            name="theme-color"
            content="#000"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='w-[400px] h-1/2 min-h-[500px] dark:bg-gray-800 shadow-md p-5 mx-auto  rounded-md'>
            <h2 className="text-3xl font-bold mb-4 m-[-20px] bg-blue-500 p-4 rounded-t-md text-white">{quizzes?.title}</h2>
            {!quizzes ? ('Quiz Not Found') : (
                <div>
                {result ? (
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Your score is {score} out of {quizzes.questions.length}</h1>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleRetake}>Retake Quiz</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleViewExplanation}>View Explanation</button>
                        {viewExplanation ? (
                            <div >
                                {quizzes.questions.map((question, index) => (
                                    <div key={question._id} className="my-4">
                                        <p className="font-bold mb-2">Question {index + 1} of {quizzes.questions.length}</p>
                                        <p> Question: {question.question}</p>
                                        <ul className="list-none pl-5">
                                            {question.options.map((option) => (
                                                <li key={option._id} className="my-2 ">
                                                    <div className="flex items-center gap-2">                                                
                                                    <input
                                                        type="radio"
                                                        // name="option"
                                                        name={question._id}
                                                        id={option._id}
                                                        value={option.text}
                                                        checked={
                                                            selectedAnswers[question._id] === option.text ||
                                                            (option.isCorrect && selectedAnswers[question._id] === undefined)
                                                        }
                                                        disabled
                                                        className="h-5 w-5 border-none cursor-pointer bg-gray-300 appearance-none checked:bg-blue-500 rounded-full  focus:outline-none"
                                                    />
                                                    <label htmlFor={option._id}>
                                                        {option.text} {option.isCorrect && <span className="text-green-600 font-bold ml-2">(Correct)</span>}
                                                        {!option.isCorrect && selectedAnswers[question._id] === option.text && (
                                                            <span className="text-red-600 font-bold ml-2">(Selected)</span>
                                                        )}
                                                    </label>
                                                    </div>
                                                    <p className="text-gray-600"> {option.explanation ?  `Explanation: ${option.explanation }`: ''}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                            </div>
                        )}
    
                    </div>
    
                ) : (
                    <div className='space-y-4 '>
                        <p className="font-bold mb-2">Question {currentQuestionIndex + 1} of {quizzes?.questions.length}</p>
                        <div className='min-h-[400px]'>
    
                        <p className='text-xl'>Que: {currentQuestion.question}</p>
                        <ul className="list-none pl-5">
                            {currentQuestion.options.map((option) => (
                                <li key={option._id} className="my-2 flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="option"
                                        id={option._id}
                                        value={option.text}
                                        checked={selectedAnswers[currentQuestion._id] === option.text}
                                        onChange={handleAnswerSelect}
                                        className="h-5 w-5 border-none cursor-pointer bg-gray-300 appearance-none checked:bg-blue-500 rounded-full  focus:outline-none"
                                    />
                                    <label className=' ' htmlFor={option._id}>{option.text}</label>
                                </li>
                            ))}
                        </ul>
                        </div>
                        <div className="flex items-center ">
    
                        <button className="bg-blue-500 flex-1 mr-8  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                            onClick={handleFinish}>Finish </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 disabled:bg-blue-300 disabled:hover:bg-blue-300"
                            onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 disabled:bg-blue-300 disabled:hover:bg-blue-300"
                            onClick={handleNext} disabled={currentQuestionIndex === quizzes?.questions.length - 1}>Next</button>
                        </div>
                    </div>
                )}
                </div>
            )}
        </div>
        </>
    );
}

export async function getServerSideProps({ params }) {
    const { slug } = params;
    // const res = await fetch(`${baseUrl}/api/blog/${slug}`);
    const res = await fetch(`https://quiz-mrnormal128-gmailcom.vercel.app//api/quiz/${slug}`);
    const data = await res.json();
    return {
        props: {
            quizzes: data?.quiz || null,
        },
    };
}

export default Quiz;
