import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const CircularLoading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10rem' }}>
      <CircularProgress />
      <h2>Loading....</h2>
    </div>
  );
};

export default CircularLoading;
