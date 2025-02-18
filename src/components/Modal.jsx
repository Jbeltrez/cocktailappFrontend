import React from 'react';

const Modal = ({ isOpen, onClose, menu, onAddDrink }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{menu.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Menu Description */}
          <div>
            <p className="text-gray-600">{menu.description}</p>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Drinks</h3>
            <button
              onClick={onAddDrink}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Add Drink
            </button>
          </div>

          {/* Drinks List */}
          <div>
            <div className="grid gap-4">
              {menu.drinks?.map((drink) => (
                <div 
                  key={drink.id} 
                  className="border-b pb-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{drink.name}</h4>
                      <p className="text-gray-600">{drink.description}</p>
                      <p className="text-sm text-gray-500">{drink.category}</p>
                    </div>
                    <p className="font-semibold">${drink.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
