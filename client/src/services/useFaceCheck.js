import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
// import { useAlert } from './alertContext';

const useFaceDetectionCheck = (setFaceCount) => {
  // const { showAlert } = useAlert();
  // const [faceAlertShown, setFaceAlertShown] = useState(false);

  const checkFaces = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/face/getIntruders');
      const intruders = response.data;
      setFaceCount(intruders.length);

      // if (intruders.length > 0 && !faceAlertShown) {
      //   showAlert('Intruder detected!');
      //   setFaceAlertShown(true);
      // }
    } catch (error) {
      console.error('Error fetching intruders:', error);
    }
  }, [setFaceCount]);
  // }, [faceAlertShown, setFaceCount, showAlert]);

  useEffect(() => {
    checkFaces();
    const interval = setInterval(checkFaces, 5000); 

    return () => clearInterval(interval); 
  }, [checkFaces]);
};

export default useFaceDetectionCheck;
