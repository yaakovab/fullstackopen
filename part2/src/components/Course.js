import React from 'react';
import ReactDOM from 'react-dom';


const Course = (props) => {
    const parts = props.course.parts
    return (
        <>
            <Header header={props.course.name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </>
    )
}

const Header = (props) => {
    console.log(props.header)
    return (
        <h2>{props.header}</h2>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p><strong>total of {total} exercises</strong></p>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part} />)}
        </div>
    )
}

export default Course