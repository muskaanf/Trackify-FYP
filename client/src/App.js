import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './store/protectedRoute';
// import { AlertProvider } from './services/alertContext';
// import GlobalAlert from './services/globalAlert';
import NotificationDrawer from './components/NotificationDrawer/NotificationDrawer';
import LuggageChecker from './services/LuggageChecker';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [notificationCount, setNotificationCount] = useState(0);

  console.log('Notification Count in App:', notificationCount); 

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <LuggageChecker setNotificationCount={setNotificationCount} />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<ProtectedRoute />}>
                <Route path="" element={<Home />} />
              </Route>
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;