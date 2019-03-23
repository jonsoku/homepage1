import React, { Component } from 'react';

class Counter extends Component {

    constructor(props){
        super(props)
        this.state = {
            count : this.props.value,
        }
        this.handleIncrement = this.handleIncrement.bind(this);
    }

    formatCount(){
        const { count } = this.state;
        return count === 0 ? 'Zero' : count ;
    }



    handleIncrement(product){
        console.log(product);
        this.setState({
            count : this.state.count + 1
        })
    }

    render() {
        console.log('props' , this.props)
        return (
            <div>
                {/* <h1>{this.props.children}</h1> */}
                <h4>{this.props.id}</h4>
                <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
                <button onClick={() => this.handleIncrement(1234)}>Increment</button>
                <button onClick={() => this.props.onDelete(this.props.id)}>delete</button>

            </div>
        )
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += (this.state.count === 0) ? 'what the' : 'primary';
        return classes;
    }
}

export default Counter;
