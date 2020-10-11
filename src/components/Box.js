import React from 'react';

const Box = (props) => {

    // transform prop data to array
    const data = Array.from(props.response);

    // sort data to most recent first
    const sortedData = data.sort((a, b) => b.year - a.year);

    // display color-box
    return sortedData.map(el => {
        return (
            <div style={{ backgroundColor: el.color }} className='box' key={el.id}>
                <div className='upper'>
                    <h1 className='hex-code' style={{ color: el.color }}>{el.color}</h1>
                </div>
                <div className='lower'>
                    <div className='info'>
                        <h4 className='info-text'>{el.name}</h4>
                        <h4 className='info-text' id="year">{el.year}</h4>
                    </div>
                </div>
            </div>
        )
    });
};

export default Box;