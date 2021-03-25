import React from 'react';
import './FaceRecognition.css'



const FaceRecognition = ({ imageUrl, box, isSignedin }) => {
    return (       
        <div className='center dib '>
            <div className='absolute mt2 center'>
                <img id='imageUrl' width='500px' heigh='auto' alt='' src={ imageUrl } />
                <div className='bounding-box' style={{ top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol}}></div>
            </div>
        </div>
    )
};

export default FaceRecognition;