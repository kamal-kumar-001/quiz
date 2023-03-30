import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import axios from 'axios';

const UpdateQuiz = ({ quizzes }) => {
    // console.log(quizzes);
    const [title, setTitle] = useState(quizzes?.title);
    const [questions, setQuestions] = useState([{ question: '', options: [{ text: '', isCorrect: false, explanation: '' }] }]);
    useEffect(() => {
        setQuestions(quizzes?.questions);
    }, [quizzes?.questions]);
    const handleAddQuestionForm = () => {
        setQuestions([...questions, { question: '', options: [{ text: '', isCorrect: false, explanation: '' }] }]);
    };
    const handleDeleteQuestionForm = (index) => {
        setQuestions((prevQuestions) => {
            const newQuestions = [...prevQuestions];
            newQuestions.splice(index, 1);
            return newQuestions;
        });
    };

    const handleQuestionChange = (index, field, value) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question, i) =>
                i === index ? { ...question, [field]: value } : question
            )
        );
    };

    const handleAddOptionForm = (index) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question, i) =>
                i === index ? {
                    ...question, options: [
                        ...question.options,
                        { text: '', isCorrect: false, explanation: '' }
                    ]
                } : question
            )
        );
    };

    const handleDeleteOptionForm = (questionIndex, optionIndex) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question, i) =>
                i === questionIndex ? {
                    ...question, options: [
                        ...question.options.slice(0, optionIndex),
                        ...question.options.slice(optionIndex + 1)
                    ]
                } : question
            )
        );
    };
    const handleOptionChange = (questionIndex, optionIndex, field, value) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question, i) =>
                i === questionIndex ? {
                    ...question, options: question.options.map((option, j) =>
                        j === optionIndex ? { ...option, [field]: value } : { ...option, isCorrect: false }
                    )
                } : question
            )
        );
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newQuiz = { title, questions };
        try {
            const token = localStorage.getItem('token'); // get the token from local storage
            const headers = { Authorization: `Bearer ${token}` }; // set the token in the Authorization header
            const response = await axios.put(`/api/quiz?id=${quizzes._id}`, newQuiz, { headers }); // include the headers in the request
            console.log(response.message);
            Router.push('/admin/');
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="max-w-3xl mx-auto my-8">
            <h1 className="text-2xl font-bold mb-4">Update Quiz</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 absolute top-5 right-5">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Update Quiz
                    </button>
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block font-medium">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border-gray-300 rounded-sm shadow-sm py-2 px-3"
                        required
                    />
                </div>
                {questions?.map((question, questionIndex) => (
                    <div key={questionIndex} className="mb-4 border border-gray-300 rounded-sm p-4">
                        <div className="mb-4 flex justify-between">
                            <h2 className="text-lg font-medium">Question {questionIndex + 1}</h2>
                            {questions.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestionForm(questionIndex)}
                                    className="bg-red-500 text-white py-1 px-2 rounded-sm"
                                >
                                    Delete Question
                                </button>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor={`question-${questionIndex}`} className="block font-medium">
                                Question
                            </label>
                            <input
                                type="text"
                                name={`question-${questionIndex}`}
                                id={`question-${questionIndex}`}
                                value={question.question}
                                onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                                className="w-full border-gray-300 rounded-sm shadow-sm py-2 px-3"
                                required
                            />
                        </div>

                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="mb-4 flex">
                                <div className="flex-shrink-0  mr-2">
                                    <input
                                        type="radio"
                                        required
                                        name={`question-${questionIndex}`}
                                        id={`question-${questionIndex}-option-${optionIndex}`}
                                        checked={option.isCorrect}
                                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, 'isCorrect', e.target.checked)}
                                        className="h-5 w-5 mr-3 border-none cursor-pointer bg-gray-300 appearance-none checked:bg-blue-500 rounded-full  focus:outline-none"
                                    />
                                    <label htmlFor={`question-${questionIndex}-option-${optionIndex}`}>Option {optionIndex + 1}</label>
                                </div>
                                <div className="flex-grow">
                                    <input
                                        type="text"
                                        name={`question-${questionIndex}-option-${optionIndex}`}
                                        id={`question-${questionIndex}-option-${optionIndex}`}
                                        value={option.text}
                                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, 'text', e.target.value)}
                                        className="w-full border-gray-300 rounded-sm shadow-sm py-2 px-3"
                                        required
                                    />
                                    <div className="mt-2 mb-4">
                                        <label htmlFor={`question-${questionIndex}-option-${optionIndex}-explanation`} className="block font-medium">
                                            Explanation (optional)
                                        </label>
                                        <textarea
                                            name={`question-${questionIndex}-option-${optionIndex}-explanation`}
                                            id={`question-${questionIndex}-option-${optionIndex}-explanation`}
                                            rows="2"
                                            value={option.explanation}
                                            onChange={(e) => handleOptionChange(questionIndex, optionIndex, 'explanation', e.target.value)}
                                            className="w-full border-gray-300 rounded-sm shadow-sm py-2 px-3"
                                        />
                                    </div>
                                    {question.options.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteOptionForm(questionIndex, optionIndex)}
                                            className="bg-red-500 text-white py-1 px-2 rounded-sm"
                                        >
                                            Delete Option
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div className="mb-4">
                            <button
                                type="button"
                                onClick={() => handleAddOptionForm(questionIndex)}
                                className="bg-blue-500 text-white py-1 px-2 rounded-sm"
                            >
                                Add Option
                            </button>
                        </div>
                    </div>
                ))}

                <div className="mt-8">
                    <button type="button"
                        onClick={handleAddQuestionForm} className="bg-blue-500 text-white py-2 px-4 rounded">
                        Add Question
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateQuiz;