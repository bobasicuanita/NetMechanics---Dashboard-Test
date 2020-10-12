import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SmallLoading from './SmallLoading';
import TableData from './TableData';

const Users = () => {
    // get current loading state of the document
    let loaded = document.readyState;

    /****************STATE MANAGEMENT ************/

    // state management for a GET 200 status code
    const [response, setResponse] = useState({});
    // state management if the document is loaded or not
    const [loadedState, setLoadedState] = useState(false);
    // state management for processing table header data
    const [tableHeaders, setTableHeaders] = useState([]);
    // check if button is disabled or not
    const [disabled, setDisabled] = useState(true);
    // rerender page if input(s) have been deleted
    const [deleted, setDeleted] = useState(false);


    // handle selects and deselects of inputs
    const handleInputSelect = () => {
        // Configure disabled state
        setDisabled(false);

        // get all inputs
        const inputs = Array.from(document.querySelectorAll('input'));

        // if none of the inputs are selected disable the button again.
        const nothingIsClicked = el => el.checked === false;

        if (inputs.every(nothingIsClicked)) setDisabled(true);
    }

    // handle delete button
    const handleBtnClick = e => {
        // get all inputs
        const inputs = Array.from(document.querySelectorAll('input'));

        // helper variables
        let checkedInputs = []
        let dlt = null;

        // find all checked inputs and push them to checkedInputs array.
        inputs.forEach(el => {
            if (el.checked) checkedInputs = [...checkedInputs, el];
        })

        // check if 1 or more are clicked and display the equivalent confirm message
        if (checkedInputs.length === 1) {
            dlt = window.confirm(`Are you sure you want to delete user ${checkedInputs[0].id}?`);
        } else if (checkedInputs.length > 1) {
            dlt = window.confirm(`Are you sure you want to delete these users?`);
        }


        // if the user clicks ok
        if (dlt) {

            // helper variables
            let storedItems = JSON.parse(sessionStorage.users);
            let storedItemsIds = [];
            let indexToDelete = 0;

            // take all the ids of the checked inputs and push them to the storedItemsIds
            checkedInputs.forEach(el => storedItemsIds = [...storedItemsIds, el.id]);

            // iterate these ids
            for (let i = 0; i < storedItemsIds.length; i++) {
                // find the index of the element to be deleted by comparing the ids of the two arrays.
                // eslint-disable-next-line
                indexToDelete = storedItems.findIndex(el => el.id == storedItemsIds[i]);
                // delete the item in the possition found above
                storedItems.splice(indexToDelete, 1);
            }

            // set the new storage;
            sessionStorage.setItem('users', JSON.stringify(storedItems));

            // rerender document
            setDeleted(true);
        }

    }

    // remove the url and only keep the names between the '/'
    const mutateAvatarData = (storageData) => {
        // helper variables
        let extractedData = [];
        let mutatedData = [];

        // take data from storage and insert in helper array
        mutatedData = [...mutatedData, storageData];

        if (mutatedData[0].length > 0) {
            for (let i = 0; i < mutatedData[0].length; i++) {
                // iterate and extract only the words needed by splitting to the correct position
                extractedData.push(mutatedData[0][i].avatar.split('/')[6])

            }

            for (let x = 0; x < mutatedData[0].length; x++) {
                // iterate and change the avatar that needed to change from the extracted data
                mutatedData[0][x].avatar = extractedData[x];
            }
        }

        return mutatedData;

    };

    const mutateHeaderData = (data) => {
        // helper variables
        let extractKeys = [];
        let finalTableKeys = [];

        if (data.length !== 0) {
            // take the keys of the object and insert them into an array capitalized
            extractKeys = Object.keys(data[0]).map(el => el.toUpperCase());

            // find those who have _ and change it to space
            for (let i = 0; i < extractKeys.length; i++) {
                if (extractKeys[i].includes('_')) {
                    finalTableKeys = [...finalTableKeys, extractKeys[i].split('_').join(' ')];
                } else {
                    finalTableKeys = [...finalTableKeys, extractKeys[i]];
                }
            }

            // set table headers
            setTableHeaders(finalTableKeys);
        }

    }

    useEffect(() => {
        const getAsyncData = async () => {

            try {
                // async GET request
                const response = await axios.get('https://reqres.in/api/users');

                // setup Session Storage
                sessionStorage.setItem('users', JSON.stringify(response.data.data));

                // set the mutated response data from the session storage
                setResponse(mutateAvatarData(JSON.parse(sessionStorage.users))[0]);

                // setup table header
                mutateHeaderData(response.data.data);

            } catch (err) {
                console.log(err);
            }
        }

        const getSessionData = () => {

            setDeleted(false);

            // set the mutated response data from the session storage
            setResponse(mutateAvatarData(JSON.parse(sessionStorage.users))[0]);

            // setup table header
            mutateHeaderData(mutateAvatarData(JSON.parse(sessionStorage.users))[0]);

        }

        // if there is no stored session make a GET request else recall data from storage
        if (sessionStorage.length !== 1) {
            getAsyncData(setResponse);
            setLoadedState(true)
        } else {
            getSessionData(setResponse);
            setLoadedState(true)
        }

    }, [loaded, deleted]);


    const CheckLoading = () => {
        if (!loadedState) {
            return <SmallLoading />
        } else {
            return (
                <>
                    <div className='title-and-delete'>
                        <h1 className="title">Users</h1>
                        <button className="btn" onClick={handleBtnClick} disabled={disabled}>DELETE</button>
                    </div>
                    <div className="table-container">
                        <table id="user-table">
                            <thead className="th-head">
                                <tr className='th-row'>
                                    <th className='th-item'>&nbsp;</th>
                                    <th className='th-item'>{tableHeaders[0]}</th>
                                    <th className='th-item'>{tableHeaders[3]}</th>
                                    <th className='th-item'>{tableHeaders[2]}</th>
                                    <th className='th-item'>{tableHeaders[1]}</th>
                                    <th className='th-item'>{tableHeaders[4]}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {response.length === 0 ? <h4>Your request returned no results.</h4> : <TableData handleClick={handleInputSelect} data={response} />}
                            </tbody>
                        </table>
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

export default Users;