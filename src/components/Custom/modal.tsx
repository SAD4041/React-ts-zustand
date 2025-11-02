import React from 'react'

const CustomModal = ({ isOpen, onClose, title, message, buttonText, onButtonClick, imageSrc }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>

        <div className="text-center">
          {imageSrc && (
            <img
              src={imageSrc}
              alt="icon"
              className="w-32 h-45 mx-auto mb-4"
            />
          )}

          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-700 mb-6">{message}</p>

          <button
            onClick={onButtonClick}
            className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomModal