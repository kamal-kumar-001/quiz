import { useState } from 'react';

const Alert = ({ type, message, dismissable = false }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  let bgColorClass, textColorClass, borderColorClass;
  switch (type) {
    case 'success':
      bgColorClass = 'bg-green-100';
      textColorClass = 'text-green-800';
      borderColorClass = 'border-green-200';
      break;
    case 'warning':
      bgColorClass = 'bg-yellow-100';
      textColorClass = 'text-yellow-800';
      borderColorClass = 'border-yellow-200';
      break;
    case 'error':
      bgColorClass = 'bg-red-100';
      textColorClass = 'text-red-800';
      borderColorClass = 'border-red-200';
      break;
    default:
      bgColorClass = 'bg-gray-100';
      textColorClass = 'text-gray-800';
      borderColorClass = 'border-gray-200';
      break;
  }

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-md border ${bgColorClass} ${textColorClass} ${borderColorClass}`}
      role="alert"
    >
      <div>
        <p className="font-bold">{message}</p>
      </div>
      {dismissable && (
        <button
          onClick={() => setDismissed(true)}
          className="text-gray-500 hover:text-gray-800"
          type="button"
        >
          <span className="sr-only">Dismiss</span>
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;
