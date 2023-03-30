import { useState } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

const MenuComponent = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <Menu>
      {({ open }) => (
        <>
          <div className="relative">
            <Menu.Button className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50">
              <span>{selectedOption.label}</span>
              <ChevronDownIcon
                className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>

            <Menu.Items
              className={`${
                isOpen ? "absolute" : "hidden"
              } z-10 w-full py-1 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              {options.map((option) => (
                <Menu.Item key={option.value}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100" : ""
                      } w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none`}
                      onClick={() => handleSelect(option)}
                    >
                      {option.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </div>
        </>
      )}
    </Menu>
  );
};

export default MenuComponent;
