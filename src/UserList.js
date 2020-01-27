import React, {useEffect, useContext} from 'react';
import {UserDispatch} from './App';

const User = React.memo(function User({user/*, onRemove, onToggle*/}) {
    const { username, email, id, active } = user;

    const dispatch = useContext(UserDispatch);
    /*useEffect(() => {
        console.log('user 값이 설정됨');
        console.log(user);
        return () => {
            console.log('user 값이 바뀌기 전');
            console.log(user);
        };
    }, [user]);*/ //값이 설정되거나 바뀔 때마다 호출됨
    /*useEffect(() => {
        console.log('컴포넌트가 화면에 나타남');
        // props -> state
        // REST API
        // D3 Video.js
        // setInterval, setTimeout
        return ()=> {
            // clearInterval, clearTimeout
            // 라이브러리 인스턴스 제거
            console.log('컴포넌트가 화면에서 사라짐');
        };
    }, []); //deps: dependency, 의존되는 값들을 넣어줌, 비어있으면 컴포넌트가 처음 화면에 나타날 때에만 호출됨*/
    return (
        <div>
            <b
                style={{
                    color: active ? 'green' : 'black',
                    cursor: 'pointer'
            }}
                onClick={() => dispatch({
                    type: 'TOGGLE_USER',
                    id
                })}
            >
            {/*onClick={() => onToggle(id)}>*/}
            &nbsp;
            {username}</b> <span>({email})</span>
            <button onClick={() => /*onRemove(id)*/
                dispatch({
                    type: 'REMOVE_USER',
                    id
                })
            }>삭제</button>
        </div>
    );
});

function UserList({users/*, onRemove, onToggle*/}) {
    /*const users = [
        {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com'
        },
        {
            id: 2,
            username: 'tester',
            email: 'tester@example.com'
        },
        {
            id: 3,
            username: 'liz',
            email: 'liz@example.com'
        }
    ];*/

    return (
        <div>
            {
                users.map(
                    user => (
                        <User
                            user={user}
                            key={user.id}
                            //onRemove={onRemove}
                            //onToggle={onToggle}
                        />)
                )
            }
        </div>
    );
}

export default React.memo(UserList, (prevProps, nextProps) => nextProps.users === prevProps.users);
