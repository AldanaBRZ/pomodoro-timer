import React from 'react';

const BreakSessionLength = (props) => {
  return (
    <div id={props.id}>
      <h2>{props.title}</h2>
      <div>
        <button 
          className='btn'
          id={props.decrementId}
          onClick={props.handleDecrement}><i class="fas fa-minus"></i></button>
        <span id={props.idLength}>{props.length}</span>
        <button 
          className='btn'
          id={props.incrementId}
          onClick={props.handleIncrement}><i class="fas fa-plus"></i></button>
      </div>
    </div>
  );
};

export default BreakSessionLength;