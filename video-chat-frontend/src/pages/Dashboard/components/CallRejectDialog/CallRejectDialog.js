import React, { useEffect } from 'react';
import './CallRejectDialog.css';
const CallRejectDialog = ({ reason, hideCallRejectedDialog }) => {
  useEffect(() => {
    setTimeout(() => {
      hideCallRejectedDialog({
        rejected: false,
        reason: '',
      });
    }, 4000);
  }, []);

  return (
    <div className='call_rejected_dialog background_secondary_color'>
      <span>{reason}</span>
    </div>
  );
};

export default CallRejectDialog;
