import React from 'react'

const Explanation = ({quizzes, selectedAnswers}) => {
    return (
        <div >
            {quizzes?.questions.map((question, index) => (
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
                                <p className="text-gray-600"> {option.explanation ? `Explanation: ${option.explanation}` : ''}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default Explanation