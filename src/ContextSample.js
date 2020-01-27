import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext('defaultValue');
//defaultValue: MyContext.Provider의 기본 값이 제공되지 않았을 때 사용되는 기본 값

function Child() {
    const text = useContext(MyContext);
    return <div>안녕하세요? {text}</div>
}

function Parent() {
    return <Child />
}

function GrandParent() {
    return <Parent />
}

function ContextSample() {
    //Child에서 바로 context 참조해서 불러옴, 엄청 깊은 곳에 있는 컴포넌트에 바로 넣어줄 수 있음
    const [value, setValue] = useState(true);
    return (
        <MyContext.Provider value={value ? 'GOOD' : 'BAD'}>
            <GrandParent />
            <button onClick={() => setValue(!value)}>CLICK ME</button>
        </MyContext.Provider>
    )
}

export default ContextSample;