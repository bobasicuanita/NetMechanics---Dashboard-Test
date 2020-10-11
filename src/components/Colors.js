import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from './Box';
import SmallLoading from './SmallLoading';


const Colors = () => {

    // get current loading state of the document
    let loaded = document.readyState;

    /****************STATE MANAGEMENT ************/

    // state management for a GET 200 status code
    const [response, setResponse] = useState({});
    // state management if the document is loaded or not
    const [loadedState, setLoadedState] = useState(false);


    // Rerender till the page is fully loaded or until the promise has been resolved or rejected.
    useEffect(() => {

        const getData = async () => {
            try {
                // GET
                const response = await axios.get('https://reqres.in/api/products/');

                // Set response data
                setResponse(response.data.data);
            } catch (err) {
                console.log(err);
            }
        }
        // Page Loaded
        setLoadedState(true);
        // Get Request
        getData(setResponse);
    }, [loaded]);


    // While the page is loading load a spinner. When it finishes render the content
    const CheckLoading = () => {
        if (!loadedState) {
            return <SmallLoading />
        } else {
            return (
                <>
                    <div className="title-and-items">
                        <h1 className="title">Colors</h1>
                        <h1 className="items-length">items: {response.length}</h1>
                    </div>
                    <div className='products'>
                        <Box response={response} />
                    </div>
                </>
            );
        }

    };

    return (
        <>
            <CheckLoading />
        </>
    );
};

export default Colors;