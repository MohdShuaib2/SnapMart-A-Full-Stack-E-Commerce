import React from 'react';
import '../styles/snapMartAlert.css';

const SnapMartAlert = ({
  message,
  onClose,
  buttonText = 'OK',
  secondaryButtonText,
  onSecondaryClick,
}) => {
  if (!message) return null;

  return (
    <div className="snap-alert-backdrop" role="dialog" aria-modal="true" aria-labelledby="snap-alert-title">
      <div className="snap-alert">
        <h3 id="snap-alert-title">SnapMart</h3>
        <p>{message}</p>
        <div className="snap-alert-actions">
          {secondaryButtonText && (
            <button type="button" className="snap-alert-secondary" onClick={onSecondaryClick}>
              {secondaryButtonText}
            </button>
          )}
          <button type="button" onClick={onClose}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnapMartAlert;
