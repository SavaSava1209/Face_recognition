import React from 'react';



const Rank = ({ name, entries }) => {
    return (
        <div className='center pa3 ma3'>
        
                <div className='f2 white'>  {`${name}, your current entry count is...`} </div>
                <div className='f1 white'> { entries } </div>
            
        </div>
    )
};

export default Rank;