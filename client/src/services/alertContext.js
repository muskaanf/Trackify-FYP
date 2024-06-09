import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = (message) => {
    const id = new Date().getTime();
    setAlerts((prevAlerts) => [...prevAlerts, { id, message }]);
    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.filter(alert => alert.id !== id));
    }, 15000);
  };

  return (
    <AlertContext.Provider value={{ alerts, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
