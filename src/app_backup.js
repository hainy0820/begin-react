import React, {useRef, useState, useMemo, useCallback} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import Counter2 from './Counter2';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

//앱 컴포넌트에서 사용할 초기 상태를 컴포넌트 바깥에 선언 (useState에서 useReducer로 구현)
const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com',
        active: true,
    },
    {
        id: 2,
        username: 'tester',
        email: 'tester@example.com',
        active: false,
    },
    {
        id: 3,
        username: 'liz',
        email: 'liz@example.com',
        active: false,
    }
  ]
}

function App_backup() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const {username, email} = inputs;
  const onChange = useCallback(e => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }, [inputs]);
  //inputs가 바뀔 때만 함수 새로 만들어지고, 아니면 기존에 만들어진 함수를 재사용

  const [users, setUsers] = useState([
    {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com',
        active: true,
    },
    {
        id: 2,
        username: 'tester',
        email: 'tester@example.com',
        active: false,
    },
    {
        id: 3,
        username: 'liz',
        email: 'liz@example.com',
        active: false,
    }
  ]);

  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      //...inputs,
      username,
      email
    }
    //기존 배열을 건드리지 않으면서 복사해서 항목 추가
    //setUsers([...users, user]);
    //새로운 배열을 만들어서 맨 뒤에 user 항목을 붙여줌
    setUsers(users => users.concat(user));
    //콜백함수의 파라미터에서 최신 users를 조회하기 때문에 deps에 users를 넣지 않아도 됨
    setInputs({
      username: '',
      email: ''
    })
    console.log(nextId.current); //4
    nextId.current += 1;
  }, [username, email/*, users*/]);

  const onRemove = useCallback(id => {
    setUsers(users => users.filter(user => user.id != id));
  }, []/*[users]*/);
  //컴포넌트가 한 번 만들어질 때만 사용되고 그 이후로는 계속 재사용

  const onToggle = useCallback(id => {
    setUsers(users => users.map(
      user => user.id === id
        ? { ...user, active: !user.active }
        : user
    ));
  }, []/*[users]*/);

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/> 
      <div>활성 사용자 수: {count}</div>
    </>
  );
}

export default App_backup;
