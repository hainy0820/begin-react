import React, {useState, Component} from 'react';

class Counter extends Component {
    //정식 js 문법은 아니고 클래스 프로퍼티스, 바벨 플러그인을 통해서 사용할 수 있는 문법
    state = {
        counter: 0,
        fixed: 1,
        updateMe: { //상태 안에 들어 있는 게 객체라면 불변성 유지를 해줘야 함
            toggleMe: false,
            dontChangeMe: 1
        }
    }

    constructor(props) {
        super(props);
        //this.handleIncrease = this.handleIncrease.bind(this);
        //this.handleDecrease = this.handleDecrease.bind(this);
        //클래스형 컴포넌트에서는 state는 무조건 객체여야 함
        /*this.state = {
            counter: 0
        }*/
    }

    //커스텀 메서드
    handleIncrease = () => {
        // this.setState({
        //     counter: this.state.counter + 1
        // })
        this.setState(state => ({
            counter: state.counter + 1
        }))
        //console.log(this);
        //console.log('increase');
    };
    handleDecrease = () => {
        this.setState({
            counter: this.state.counter - 1
        })
    };
    //setState는 단순히 상태를 바꾸는 함수가 아니라
    //설정해준 상태로 바꿔달라고 요청하는 함수로 이해
    //성능적인 이유로 리액트는 상태가 바로 업데이트 되지 않고 비동기적으로 업데이트 됨
    // handleIncrease() {
    //     console.log(this); //constructor를 지정하지 않으면 undefined
    //     console.log('increase');
    // }
    // handleDecrease() {
    //     console.log('decrease');
    // }
    handleToggle = () => {
        this.setState({
            updateMe: {
                ...this.state.updateMe,
                toggleMe: !this.state.updateMe.toggleMe,
            }
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.counter}</h1>
                <button onClick={this.handleIncrease}>+1</button>
                <button onClick={this.handleDecrease}>-1</button>
                <p>고정된 값: {this.state.fixed}</p>
            </div>
        )
    };
}


// function Counter() {
//     const [number, setNumber] = useState(0);

//     const onIncrease = () => {
//         //setNumber(number + 1);
//         //업데이트 함수 (최적화랑 관련 있음)
//         setNumber(prevNumber => prevNumber + 1);
//     }
//     const onDecrease = () => {
//         //setNumber(number - 1);
//         setNumber(prevNumber => prevNumber - 1);
//     }
//     return (
//         <div>
//             <h1>{number}</h1>
//             <button onClick={onIncrease}>+1</button>
//             <button onClick={onDecrease}>-1</button>
//         </div>
//     )
// }

export default Counter;