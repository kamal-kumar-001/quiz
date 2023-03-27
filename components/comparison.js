import React from 'react';
import Container from './container';
import { BsCheckLg } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';
import Link from 'next/link';

const Comparison = () => {
  const Compare = {
    features: [
      'Create and publish unlimited quizzes',
      'Add unlimited questions per quiz',
      'Allow unlimited quiz takers per month',
      'Export quiz results to CSV format',
      'Customize quiz branding and design',
      'Advanced analytics and reporting',
      'Single Sign-On (SSO) integration',
      'Priority support',
    ],
    personal: [true, true, true, true, true, false, false, false],
    professional: [true, true, true, true, true, true, true, false],
    enterprise: [true, true, true, true, true, true, true, true],
  };

  return (
    <Container>
      <div className="w-full overflow-x-auto rounded-md">
        <div className="">
          <table className="w-full text-sm bg-gray-100 border-t border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <thead className="text-gray-900 dark:text-white">
              <tr className="text-left bg-gray-200 dark:bg-gray-700">
                <th className="p-4 font-medium">Compare Features</th>
                <th className="p-4 font-medium">Personal</th>
                <th className="p-4 font-medium">Professional</th>
                <th className="p-4 font-medium">Enterprise</th>
              </tr>
             
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {Compare.features.map((feature, index) => (
                <tr key={index}>
                  <td className="p-4">{feature}</td>
                  <td className="p-4">
                    {Compare.personal[index] ? (
                      <BsCheckLg className="text-green-500" />
                    ) : (
                      <MdOutlineClose className="text-red-500" />
                    )}
                    
                  </td>
                  <td className="p-4">
                    {Compare.professional[index] ? (
                      <BsCheckLg className="text-green-500" />
                    ) : (
                      <MdOutlineClose className="text-red-500" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {Compare.enterprise[index] ? (
                      <BsCheckLg className="text-green-500" />
                    ) : (
                      <MdOutlineClose className="text-red-500" />
                    )}
              
                  </td>
                </tr>
              ))}
               <tr className="text-left bg-gray-200 dark:bg-gray-700">
                <th className="p-4 font-medium">
                    
                </th>
                <th className="p-4 font-medium">
                <Link href={'/signup'}>
                    <button className="px-4 py-2 mr-2 text-md font-semibold uppercase border rounded dark:border-indigo-400 border-indigo-400">Try For Free</button>
                    </Link>
                </th>
                <th className="p-4 font-medium">
                <Link href={'/signup'}>
                    <button className="px-4 py-2 mr-2 text-md font-semibold uppercase border rounded dark:border-indigo-400 border-indigo-400">Try For Free</button>
                    </Link>
                </th>
                <th className="p-4 font-medium">
                <Link href={'/signup'}>
                    <button className="px-4 py-2 mr-2 text-md font-semibold uppercase border rounded dark:border-indigo-400 border-indigo-400">Try For Free</button>
                    </Link>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default Comparison;
