import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Loading = () => {

    let loaded = document.readyState;

    const [loadedState, setLoadedState] = useState(false);

    useEffect(() => setLoadedState(true), [loaded]);

    return (
        <>
            {loadedState ? <Redirect to='/welcome' /> : null}
            <div className="loader">
                <div className='loading'></div>
                <h4 className='loading-text'>Loading...</h4>
            </div>
        </>
    );
};

export default Loading;