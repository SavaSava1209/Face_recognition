import React from 'react';
import './ImageForm.css';


const ImageForm = ({ onInputChange, onButtonChange }) => {
    return (
        <div className='center'>
            <div className='form center pa4 br3 shadow-5'>
                <input 
                    onChange={ onInputChange }
                    className='f4 pa2 w-70 center' type='text'  placeholder={'link'}/>
                <button 
                    onClick={ onButtonChange }
                    className='btn-pill w-30 dib' >Detect</button>
            </div>
        </div>
    )
};

export default ImageForm;