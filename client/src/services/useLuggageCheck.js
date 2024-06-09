import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
// import { useAlert } from './alertContext';

const useLuggageCheck = (setLuggageCount) => {
  // const { showAlert } = useAlert();
  // const [luggageAlertShown, setLuggageAlertShown] = useState(false);

  const checkLuggage = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/luggage/getUnattended');
      const unattendedLuggage = response.data;
      setLuggageCount(unattendedLuggage.length);

      // if (unattendedLuggage.length > 0 && !luggageAlertShown) {
      //   showAlert('Unattended luggage detected!');
      //   setLuggageAlertShown(true);
      // }
    } catch (error) {
      console.error('Error fetching unattended luggage:', error);
    }
  }, [setLuggageCount]);
  // }, [luggageAlertShown, setLuggageCount, showAlert]);

  useEffect(() => {
    checkLuggage(); 
    const interval = setInterval(checkLuggage, 5000); 

    return () => clearInterval(interval); 
  }, [checkLuggage]);
};

export default useLuggageCheck;
