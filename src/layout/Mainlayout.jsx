import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ActuatorSizing from '../pages/ActuatorSizing';
import ActuatorSelector from '../components/Actuatorselector';

function Mainlayout() {
  return (
    <div style={styles.layout}>
      <Header />
      <div style={styles.contentWrapper}>
          
           
        <main style={styles.main}>
         <Outlet />
        </main>
        
      </div>
      
      
    </div>
  );
}

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  contentWrapper: {
    display: 'flex',
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
};

export default Mainlayout;