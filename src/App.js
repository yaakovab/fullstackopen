

import React, { useState } from 'react'

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text={'good'} />
      <Button onClick={handleNeutralClick} text={'neutral'} />
      <Button onClick={handleBadClick} text={'bad'} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}
        average={(good - bad) / all} positive={good / all * 100}
      />
    </div>
  )
}


const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text={'good '} stat={props.good} />
        <StatisticLine text={'neutral '} stat={props.neutral} />
        <StatisticLine text={'bad '} stat={props.bad} />
        <StatisticLine text={'all '} stat={props.all} />
        <StatisticLine text={'average '} stat={props.average} />
        <StatisticLine text={'positive '} stat={props.positive} sign={'%'} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td><td>{props.stat}<span>{props.sign}</span></td>
    </tr>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>  // same as above

export default App



// {
//   name: [a,s,],
//   stat: 12
// }





// import React from "react";

// const App = () => {
//   const name = 'Peter'
//   const age = 10

//   return (
//     <>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//       <Footer />
//     </>
//   )
// }

// const Hello = ({ age, name }) => {

//   const bornYear = () => new Date().getFullYear() - age


//   return (
//     <div>
//       <p>Hello {name}, you are {age} years old</p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// const Footer = () => {
//   return (
//     <div>
//       greatting app created by <a href="https://github.com/mluukkai">mluukkai</a>
//     </div>
//   )
// }

// export default App


// // yaacov abramovich
// // hcivomarba vocaay