import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={ this.props.onIncrementCounter } />
                <CounterControl label="Decrement" clicked={ this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={ this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <hr/>
                <button onClick={this.props.onStoreResults} > Store Result </button>
                <ul>
                    {this.props.storeResults.map( strResult => (
                        <li key={this.props.id} onClick={() => this.props.onDeleteResults(strResult.id)}>{strResult.value} </li>
                    ))}
                </ul>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        ctr: state.counter,
        storeResults: state.results
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
        onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
        onAddCounter:() => dispatch({type: 'ADD', val: 10}),
        onSubtractCounter: () => dispatch({type: 'SUBTRACT', val: 8 }),
        onStoreResults: () => dispatch({ type: 'STORE_RESULT'}),
        onDeleteResults: (id) => dispatch({ type: 'DELETE_RESULT', resultElId: id})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter) ;
