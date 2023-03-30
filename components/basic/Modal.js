import { Fragment } from 'react';

function Modal(props) {
  const { isOpen, onClose, title, children } = props;

  return (
    <>
      {/* Overlay */}
      {isOpen ? (
        <div className="fixed w-screen inset-0 z-50 h-screen flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto  mx-auto ">
            {/* Content */}
            <div className="relative flex flex-col  w-screen inset-0  h-screen bg-white rounded-md shadow-lg outline-none focus:outline-none">
              {/* Header */}
              <div className="flex items-center justify-between p-2 border-b border-solid border-gray-300 rounded-t-md">
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-gray-900 float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onClose}
                >
                  <span className="bg-transparent text-gray-900 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              {/* Body */}
              <div className="relative p-6 flex-auto">{children}</div>
            </div>
          </div>
        </div>
      ) : null}
      {/* Background */}
      {isOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black opacity-25"
          onClick={onClose}
        />
      ) : null}
    </>
  );
}

export default Modal;
