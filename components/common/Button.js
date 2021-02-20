import React from 'react'

const Button = (props) => {
    let passingProps = props.label 
    let disabled = props.disableCondition
    let className = props.className
    
    
    // }else if(passingProps === 'Delete'){
    //     passingProps = <i className="fas fa-trash"></i>
    // }

    
    return (
        <button
        className = {props.className}
        onClick={props.handleClick} 
        disabled = {props.disableCondition}>{passingProps}</button>
    )
}

export default Button