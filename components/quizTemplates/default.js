import Head from 'next/head';
import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import { Circle } from 'rc-progress';
// import { useRouter } from 'next/router';
const Explanation = dynamic(() => import('./Explanation'));


function Default({ quizzes, name, mainColor, textColor, bgColor, buttonType, width, height, font, fontSize, }) {

    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = useMemo(() => quizzes?.questions[currentQuestionIndex], [quizzes?.questions, currentQuestionIndex]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    const [viewExplanation, setViewExplanation] = useState(false);


    function createMarkup(c) {
        return { __html: c };
    }

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

    const handleAnswerSelect = (optionValue) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestion._id]: optionValue,
        });
    }

    const handleRetake = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setResult(false);
        setViewExplanation(false)
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
    };

    return (
        <>
            <style jsx global >
                {`
            .quiz__container {
                user-select: none; 
                -webkit-touch-callout: none; 
                -webkit-user-select: none; 
                -khtml-user-select: none; 
                -moz-user-select: none; 
                -ms-user-select: none; 
                pointer-events: none; 
              }
              .allow-clicks {
                pointer-events: auto; /* allow clicking */
              }
              .main__color{
                background-color: ${mainColor} 
              }
              .bg__color{
                background-color: ${bgColor} 
              }
              .text__color{
                color: ${textColor} 
              }
                input:checked {
              background: ${mainColor};
                }
            `}
            </style>
            <Head>
                <title>{quizzes?.title}</title>
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
            <div className={` w-[${width}px]  min-h-[${height}px] text__color  bg__color shadow-md p-5 mx-auto  rounded-md`}>
                <h2 style={{ backgroundColor: mainColor }} className="text-3xl font-bold mb-4 m-[-20px] p-4 rounded-t-md text-white">{quizzes?.title}</h2>
                {!quizzes ? ('Quiz Not Found') : (
                    <div>
                        {result ? (
                            <div className='space-y-5' >
                                <div className='flex flex-col gap-5 items-center justify-center'>
                                    <div className='relative w-24 h-24'>
                                        <Circle
                                            className='absolute top-0 left-0 w-full h-full text-center'
                                            percent={(score / quizzes.questions.length) * 100}
                                            strokeWidth={6}
                                            trailWidth={6}
                                            strokeColor={`${mainColor}`}
                                            gapPosition='bottom'
                                        />
                                        <span className='text-xl absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                                            {Math.round(score / quizzes.questions.length * 100)}%
                                        </span>
                                    </div>
                                    {score / quizzes.questions.length * 100 > 50 ? (
                                        <span className='text-xl'>Well done!</span>
                                    ) : (
                                        <span className='text-xl'>You can do better.</span>
                                    )}
                                </div>

                                <h1 className="text-2xl font-bold mb-2">Your score is {score} out of {quizzes.questions.length}</h1>
                                <button className=" main__color hover:opacity-80 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleRetake}>Retake Quiz</button>
                                <button className=" main__color hover:opacity-80 text-white font-bold py-2 px-4 rounded" onClick={handleViewExplanation}>{!viewExplanation ? 'View' : 'Hide'} Explanation</button>
                                {viewExplanation && <Explanation quizzes={quizzes} selectedAnswers={selectedAnswers} />}
                            </div>
                        ) : (
                            <div className='space-y-4 quiz__container'>
                                <p className="font-bold mb-2">Question {currentQuestionIndex + 1} of {quizzes?.questions.length}</p>
                                <div className='min-h-[400px]'>
                                    <div className='flex gap-2'>
                                        <span>Que:</span>
                                        <div className='text-xl' dangerouslySetInnerHTML={createMarkup(currentQuestion.question)}></div>
                                    </div>
                                    {buttonType === 'block' ? (<ul className="list-none pl-5 pt-5 grid grid-cols-2 gap-4">
                                        {currentQuestion.options.map((option ) => (
                                            <li
                                                key={option._id}
                                                onClick={() => handleAnswerSelect(option.text)}
                                                className={`flex allow-clicks cursor-pointer items-center justify-center h-10 rounded-lg ${selectedAnswers[currentQuestion._id] === option.text
                                                    ? ' main__color text-white'
                                                    : 'bg-gray-300'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="option"
                                                    id={option._id}
                                                    value={option.text}
                                                    checked={selectedAnswers[currentQuestion._id] === option.text}
                                                    onChange={() => handleAnswerSelect(option.text)}
                                                    className="hidden"
                                                />
                                                <label
                                                    className="cursor-pointer  allow-clicks break-all text-center"
                                                    htmlFor={option._id}
                                                    onClick={() => handleAnswerSelect(option.text)}
                                                >
                                                    {option.text}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>) : (<ul className="list-none pl-5 space-y-4">
                                        {currentQuestion.options.map((option, index) => (
                                            <li key={index} className="my-2 flex items-start  gap-4">
                                                <input
                                                    type="radio"
                                                    name="option"
                                                    id={option._id}
                                                    value={option.text}
                                                    checked={selectedAnswers[currentQuestion._id] === option.text}
                                                    onChange={() => handleAnswerSelect(option.text)}
                                                    className={`allow-clicks bg-gray-300  mt-[2px] min-h-[20px] min-w-[20px] border-none cursor-pointer  appearance-none  rounded-full  focus:outline-none`}
                                                />
                                                <label
                                                    className="cursor-pointer allow-clicks break-all"
                                                    htmlFor={option._id}
                                                    onClick={() => handleAnswerSelect(option.text)}
                                                >
                                                    {option.text}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>)
                                    }

                                </div>
                                <div className="flex items-center ">
                                    <button className="allow-clicks  main__color flex-1 mr-8  hover:opacity-75 text-white font-bold py-2 px-4 rounded "
                                        onClick={handleFinish}>Finish </button>
                                    <button className="allow-clicks  main__color hover:opacity-75 text-white font-bold py-2 px-4 rounded mr-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:opacity-70"
                                        onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</button>
                                    <button className="allow-clicks  main__color hover:opacity-75 text-white font-bold py-2 px-4 rounded mr-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:opacity-70"
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
export default Default;