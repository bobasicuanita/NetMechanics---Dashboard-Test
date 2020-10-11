import React from 'react';

const TableData = React.memo((props) => {

    // transform prop data to array
    const data = Array.from(props.data);

    // display the table rows
    return data.map(el => {
        return (
            <tr className='td-row' key={el.id}>
                <td className='td-item'><input id={el.id} onClick={props.handleClick} checked={props.checked} type='checkbox' /></td>
                <td className='td-item'>{el.id}</td>
                <td className='td-item'>{el.last_name}</td>
                <td className='td-item'>{el.first_name}</td>
                <td className='td-item'>{el.email}</td>
                <td className='td-item'>{el.avatar}</td>
            </tr>
        );
    });

});

export default TableData;