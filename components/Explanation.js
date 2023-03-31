import React from 'react'

const Explanation = ({ quizzes, selectedAnswers }) => {
    function createMarkup(c) {
        return { __html: c };
    }
    return (
        <div >
            {quizzes?.questions.map((question, index) => (
                <div key={question._id} className="my-4">
                    <p className="font-bold mb-2">Question {index + 1} of {quizzes.questions.length}</p>
                    <div className='flex gap-2'>
                        <span>Question:</span>
                        <div className='text-xl' dangerouslySetInnerHTML={createMarkup(question.question)}></div>
                    </div>
                    <ul className="list-none pl-5">
                        {question.options.map((option) => (
                            <li key={option._id} className="my-2 space-y-3">
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
                                {option.explanation ? (
                                    <div >
                                    <span >Explanation:</span>
                                    <div className='m-4 dark:text-gray-200 text-gray-600 ' dangerouslySetInnerHTML={createMarkup(option.explanation)}></div>
                                </div>
                                ):('')}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default Explanation