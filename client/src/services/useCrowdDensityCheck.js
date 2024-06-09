import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const useCrowdDensityCheck = (setCrowdCount) => {
  const [previousNotifiedCameras, setPreviousNotifiedCameras] = useState(new Set());

  const checkCrowdDensity = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/crowd/getPlaces');
      const crowdData = response.data;
      let newNotifications = 0;
      const newNotifiedCameras = new Set();

      crowdData.forEach((camera) => {
        const currentCrowdValue = camera.data[0]?.number || 0;
        if (currentCrowdValue > 10) {
          newNotifiedCameras.add(camera.video_ref);
          if (!previousNotifiedCameras.has(camera.video_ref)) {
            newNotifications += 1;
          }
        }
      });

      setPreviousNotifiedCameras(newNotifiedCameras);
      setCrowdCount(prevCount => prevCount + newNotifications);
    } catch (error) {
      console.error('Error fetching crowd density:', error);
    }
  }, [previousNotifiedCameras, setCrowdCount]);

  useEffect(() => {
    checkCrowdDensity(); 
    const interval = setInterval(checkCrowdDensity, 5000); 

    return () => clearInterval(interval); 
  }, [checkCrowdDensity]);

  return null; 
};

export default useCrowdDensityCheck;
