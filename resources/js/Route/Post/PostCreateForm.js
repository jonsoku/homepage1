import React, { Component } from 'react'

export default class PostCreateForm extends Component {
    render() {
        return (
        <div>
        <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <textarea 
                            onChange={this.handleChange}
                            value={this.state.description}
                        />
                    </div>

                    <div>
                        <button type="submit">submit</button>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}
