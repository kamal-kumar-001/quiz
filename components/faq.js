import React from "react";
import Container from "./container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

export default function Faq() {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50  hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-neutral-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "" : "transform rotate-180"
                      } w-5 h-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

const faqdata = [
  {
    question: "How can I create a quiz on your platform?",
    answer: "To create a quiz, you first need to sign up for an account and then log in to the admin page. From there, you can add a new quiz, give it a title and description, and then add as many questions and options as you want. Once you're finished, you can save your quiz and get an embed URL to share it with others.",
  },
  {
    question: "Can I edit or delete a quiz after I've created it?",
    answer: "Yes, you can edit or delete any quiz you've created from the admin page. Simply find the quiz you want to modify, click the 'Update' button, and make any changes you need. If you want to delete a quiz, you can do so by clicking the 'Delete' button.",
  },
  {
    question: "How many questions can I add to a quiz? ",
    answer: "You can add as many questions as you want to a quiz. We recommend having at least 5 questions to make it challenging and engaging, but you can add more if you'd like.",
  },
  {
    question: "Are the quizzes customizable? ",
    answer: "Yes, you can customize your quizzes by adding your own questions, options, and descriptions. You can also choose the layout and design of the quiz to fit your needs.",
  },
  {
    question: "Is there a limit to how many quizzes I can create?",
    answer: "There's no limit to how many quizzes you can create on our platform. Feel free to create as many quizzes as you need for your website or app.",
  },
];
