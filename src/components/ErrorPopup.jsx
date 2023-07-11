import React from 'react'

function ErrorPopup({ message, onClose }) {
  const storedCountry = localStorage.getItem('country')

  return (
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
  )
}

export default ErrorPopup
