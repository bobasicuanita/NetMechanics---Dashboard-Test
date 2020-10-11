import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SmallLoading from './SmallLoading';
import TableData from './TableData';


const Users = () => {
    let loaded = document.readyState;

    const [response, setResponse] = useState({});
    const [loadedState, setLoadedState] = useState(false);
    const [tableHeaders, setTableHeaders] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [deleted, setDeleted] = useState(false);

    const handleInputSelect = () => {

        setDisabled(false);

        const inputs = Array.from(document.querySelectorAll('input'));

        const nothingIsClicked = (el) => el.checked === false;

        if (inputs.every(nothingIsClicked)) setDisabled(true);
    }

    const handleBtnClick = e => {

        const inputs = Array.from(document.querySelectorAll('input'));

        let checkedInputs = []
        let dlt = null;

        inputs.forEach(el => {
            if (el.checked) checkedInputs = [...checkedInputs, el];
        })

        if (checkedInputs.length === 1) {
            dlt = window.confirm(`Are you sure you want to delete user ${checkedInputs[0].id}?`);
        } else if (checkedInputs.length > 1) {
            dlt = window.confirm(`Are you sure you want to delete these users?`);
        }


        if (dlt) {

            let storedItems = JSON.parse(sessionStorage.users);
            let storedItemsIds = [];
            let indexToDelete = 0;

            checkedInputs.forEach(el => storedItemsIds = [...storedItemsIds, el.id]);

            for (let i = 0; i < storedItemsIds.length; i++) {
                // eslint-disable-next-line
                indexToDelete = storedItems.findIndex(el => el.id == storedItemsIds[i]);
                storedItems.splice(indexToDelete, 1);
            }

            sessionStorage.setItem('users', JSON.stringify(storedItems));

            setDeleted(true);
        }

    }

    const mutateAvatarData = (storageData) => {
        let extractedData = [];
        let mutatedData = [];

        mutatedData = [...mutatedData, storageData];

        if (mutatedData[0].length > 0) {
            for (let i = 0; i < mutatedData[0].length; i++) {
                extractedData.push(mutatedData[0][i].avatar.split('/')[6])

            }

            for (let x = 0; x < mutatedData[0].length; x++) {
                mutatedData[0][x].avatar = extractedData[x];
            }
        }

        return mutatedData;

    };

    const mutateHeaderData = (data) => {
        let extractKeys = [];
        let finalTableKeys = [];

        extractKeys = Object.keys(data[0]).map(el => el.toUpperCase());

        for (let i = 0; i < extractKeys.length; i++) {
            if (extractKeys[i].includes('_')) {
                finalTableKeys = [...finalTableKeys, extractKeys[i].split('_').join(' ')];
            } else {
                finalTableKeys = [...finalTableKeys, extractKeys[i]];
            }
        }

        setTableHeaders(finalTableKeys);
    }

    useEffect(() => {


        const getAsyncData = async () => {

            try {
                const response = await axios.get('https://reqres.in/api/users');

                sessionStorage.setItem('users', JSON.stringify(response.data.data));

                setResponse(mutateAvatarData(JSON.parse(sessionStorage.users))[0]);

                mutateHeaderData(response.data.data);

                // extractKeys = Object.keys(response.data.data[0]).map(el => el.toUpperCase());

                // for (let i = 0; i < extractKeys.length; i++) {
                //     if (extractKeys[i].includes('_')) {
                //         finalTableKeys = [...finalTableKeys, extractKeys[i].split('_').join(' ')];
                //     } else {
                //         finalTableKeys = [...finalTableKeys, extractKeys[i]];
                //     }
                // }

                // setTableHeaders(finalTableKeys);

            } catch (err) {
                console.log(err);
            }
        }

        const getSessionData = () => {

            setDeleted(false);

            setResponse(mutateAvatarData(JSON.parse(sessionStorage.users))[0]);

            mutateHeaderData(mutateAvatarData(JSON.parse(sessionStorage.users))[0]);

            // extractKeys = Object.keys(mutateAvatarData(JSON.parse(sessionStorage.users))[0][0]).map(el => el.toUpperCase());

            // for (let i = 0; i < extractKeys.length; i++) {
            //     if (extractKeys[i].includes('_')) {
            //         finalTableKeys = [...finalTableKeys, extractKeys[i].split('_').join(' ')];
            //     } else {
            //         finalTableKeys = [...finalTableKeys, extractKeys[i]];
            //     }
            // }

            // setTableHeaders(finalTableKeys);

        }
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
                                <TableData handleClick={handleInputSelect} data={response} />
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