import React from 'react';

const Hamburger = (props) => {
    return (
        <>
            <div className="hamburger" onClick={props.handleHamburger}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    );
};

export default Hamburger;