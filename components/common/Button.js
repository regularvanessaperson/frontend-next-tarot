import React from 'react'

const Button = (props) => {
    let passingProps = props.label 
    
    if(passingProps === 'Edit'){
        passingProps = <i className="fas fa-edit"></i> 
    }else if(passingProps === 'Delete'){
        passingProps = <i className="fas fa-trash"></i>
    }

    
    return (
        <button
        className = {props.className}
        onClick={props.handleClick}>{passingProps}</button>
    )
}

export default Button