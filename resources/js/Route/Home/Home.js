import React, { Component } from 'react'
import Slider from '../../components/Home/Slider/Slider';
import Counter from '../../components/Home/Counter';

export default class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            counters : [
                {id:1, value: 4},
                {id:2, value: 0},
                {id:3, value: 0},
                {id:4, value: 0},
                {id:5, value: 0},
                {id:6, value: 0},
                {id:7, value: 0},
            ]
        }
        this.handleDelete=this.handleDelete.bind(this);
        this.handleReset=this.handleReset.bind(this);
    }

    handleReset(){
        const counters = this.state.counters.map(c=>{
            c.value = 0
            return c;
        })
        this.setState({
            counters
        })
    }

    handleDelete(counterId){
        const counters = this.state.counters.filter(c => c.id !== counterId);
        this.setState({counters})
    }

  render() {
        return (
        <div>
            <Slider />
            <div>
                <button
                    onClick={this.handleReset}
                >
                reset
                </button>
                {this.state.counters.map(counter =>
                <Counter
                    key={counter.id}
                    onDelete={this.handleDelete}
                    value={counter.value}
                    id={counter.id}
                >
                    <h4>Counter #{counter.id}</h4>
                </Counter>)}
            </div>
        </div>
        )
    }
}
