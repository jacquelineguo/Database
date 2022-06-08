import React from 'react';
import img from  '../assets/main.png';

const Landing = () => {
  return (
    <div style={{ textAlign: 'center', margin: 10 }}>
      <h2 class="header center orange-text">
        Collect feedback from users!
      </h2>

      <div style={{ textAlign: 'center', height:250, margin: 50}}>
        <img src={img} style={{maxWidth: 800, height:'auto'}}/>
      </div>

    </div>
  );
}

export default Landing;
