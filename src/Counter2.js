import React, { useReducer } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            throw new Error('Unhandled action');
    }
}

function Counter2() {
    const [number, dispatch] = new useReducer(reducer, 0);
    //0 : useReducer에서 사용하고 싶은 초기값

    const onIncrease = () => {
        dispatch({
            type: 'INCREMENT'
        });
    }
    const onDecrease = () => {
        dispatch({
            type: 'DECREMENT'
        });
    }
    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}

export default Counter2;