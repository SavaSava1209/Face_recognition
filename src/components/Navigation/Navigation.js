import React from 'react';

const Navigation = ({ onRouteChange, isSignedin }) => {
    if (isSignedin) {
         return (
            <nav style={{display:'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='pa3 black underline dim pointer f3' >Sign Out</p>
            </nav>
        )
    } else {
        return (
            <nav style={{display:'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='pa3 black underline dim pointer f3' > Sign In</p>
                <p onClick={() => onRouteChange('register')} className='pa3 black underline dim pointer f3' > Register</p>
            </nav>
        )
    }
   
};

export default Navigation;