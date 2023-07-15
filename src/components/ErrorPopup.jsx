import React from 'react'

function ErrorPopup({ message, onClose, handleCloseButton }) {
  const storedCountry = localStorage.getItem('country')

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#fff',
          padding: '20px',
          boxShadow: '10px 10px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          zIndex: '9999',
          width: '80vw',
          height: '25vh',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontSize: '48px',
            marginBottom: '20px',
          }}
          role="img"
          aria-label="Error Emoji"
        >
          ❌
        </span>
        <button
          className="text-gray-600 hover:text-gray-800 absolute top-0 right-0"
          onClick={handleCloseButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <h1
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          {message}
        </h1>
        <button
          onClick={onClose}
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            background: '#4CAF50',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {storedCountry === 'IL' ? 'נסה שנית' : 'Try again'}
        </button>
      </div>
    </>
  )
}

export default ErrorPopup
