import React, { useState } from 'react';
import HomeScreen from '../components/HomeScreen';
// Import other components as you create them
// import CreateRoomScreen from '../components/CreateRoomScreen';
// import JoinRoomScreen from '../components/JoinRoomScreen';
// import QueueScreen from '../components/QueueScreen';
// import SuggestScreen from '../components/SuggestScreen';
// import RoomInfoScreen from '../components/RoomInfoScreen';

const NextRaveApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');

  const handleNavigate = (screen: string) => setCurrentScreen(screen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      // case 'create-room':
      //   return <CreateRoomScreen onNavigate={handleNavigate} />;
      // case 'join-room':
      //   return <JoinRoomScreen onNavigate={handleNavigate} />;
      // case 'queue':
      //   return <QueueScreen onNavigate={handleNavigate} />;
      // case 'suggest':
      //   return <SuggestScreen onNavigate={handleNavigate} />;
      // case 'room-info':
      //   return <RoomInfoScreen onNavigate={handleNavigate} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return renderScreen();
};

export default NextRaveApp;
