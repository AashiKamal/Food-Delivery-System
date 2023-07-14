
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TwoFAc() {
  const [isTwoFactorAuthEnabled, setIsTwoFactorAuthEnabled] = useState(false);
  const [qrcodeImage, setQRCodeImage] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();
  
  
  const handleEnableClick = async () => {
    try {
      const email = localStorage.getItem('userEmail');
      const response = await fetch('http://localhost:5000/api/createtotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const json = await response.json();
      if (json.success) {
        setQRCodeImage(json.qrCode);
        setIsTwoFactorAuthEnabled(true);
        localStorage.setItem('secretKey', json.secretKey);
      } else {
        console.error('Failed to generate QR code:', json.message);
      }
    } catch (error) {
      console.error('An error occurred while generating QR code:', error);
    }
  };
  
  const handleActivateClick = async () => {
    try {
      const email = localStorage.getItem('userEmail'); 
      const response = await fetch('http://localhost:5000/api/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode }), // Replace with the actual email or retrieve it from user input
      });

      const json = await response.json();
      if (json.success) {
        console.log('Activation successful');
        navigate('/'); // Redirect to the login page
      } else {
        console.error('Activation failed:', json.message);
      }
    } catch (error) {
      console.error('An error occurred while activating 2FA:', error);
    }
  };

  return (
    <div>
      <div className="container">
        {!isTwoFactorAuthEnabled && (
          <div className="mb-3">
            <button type="button" className="btn btn-primary" onClick={handleEnableClick}>
              Enable 2FA
            </button>
          </div>
        )}
        {isTwoFactorAuthEnabled && (
          <>
            <div className="mb-3">
              <button type="button" className="btn btn-danger" onClick={() => setIsTwoFactorAuthEnabled(false)}>
                Disable 2FA
              </button>
            </div>
            <div className="mb-3">
              <img src={qrcodeImage} alt="QR Code" />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button type="button" className="btn btn-primary" onClick={handleActivateClick}>
                Activate
              </button>
            </div>
          </>
        )}
        {/* Rest of the code... */}
      </div>
    </div>
  );
}




