import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useLuggageCheck from './useLuggageCheck';
import useFaceDetectionCheck from './useFaceCheck';
import { setNotificationCount } from '../store/notificationSlice';
import useCrowdDensityCheck from './useCrowdDensityCheck';

const LuggageChecker = () => {
  const dispatch = useDispatch();
  const [luggageCount, setLuggageCount] = useState(0);
  const [faceCount, setFaceCount] = useState(0);
  const [crowdCount, setCrowdCount] = useState(0);

  useEffect(() => {
    dispatch(setNotificationCount(luggageCount + faceCount + crowdCount));
    console.log(luggageCount + faceCount + crowdCount)
  }, [luggageCount, faceCount, crowdCount, dispatch]);

  useLuggageCheck(setLuggageCount);
  useFaceDetectionCheck(setFaceCount);
  useCrowdDensityCheck(setCrowdCount);

  return null;
};

export default LuggageChecker;
