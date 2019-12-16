import React, {useRef, useReducer, useMemo, useCallback, createContext} from 'react';
import produce from 'immer';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs';

//Chrome에서 사용할 때
//window.produce = produce;

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

function reducer(state, action) {
  switch(action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      }
    case 'CREATE_USER':
      return produce(state, draft => {
        draft.users.push(action.user);
      })
      /*return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      }*/
    case 'TOGGLE_USER':
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id);
        user.active = !user.active;
      })
      /*return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id
            ? { ...user, active: !user.active }
            : user )
      };*/
    case 'REMOVE_USER':
      return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id === action.id);
        draft.users.splice(index, 1);
      });
      /*return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      }*/
    default:
      throw new Error('Unhandled action');
  };
}

export const UserDispatch = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form, onChange, reset] = useInputs({
    username: '',
    email: '',
  });
  const { username, email } = form;

  const nextId = useRef(4);
  const { users } = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
    reset();
  }, [username, email, reset]); //reset 안 넣어줘도 되지만 eslint 규칙 사항으로는 넣어줘야 함

  //const {username, email} = state.inputs;

  /*const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    })
  }, []);
  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);*/

  /*const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []); //depedency는 비어있는 배열이면 됨
  //왜냐하면 컴포넌트 처음 만들 때만 이 함수를 만들고 그 다음부터 계속 재사용할 수 있기 때문

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []); //함수 한 번 만들고 계속 재사용
  */
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
        
      />
      {/*<UserList users={users}
        onToggle={onToggle}
        onRemove={onRemove}/> */}
      <UserList users={users} />
      <div>활성 사용자 수: {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
