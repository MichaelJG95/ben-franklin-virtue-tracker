import React from 'react'

export default function VirtueTracker({ virtues, toggleDayMarked }) {

    const onClick = evt => {
        // debugger
        const virtue = evt.target.attributes.virtueName.value
        const day = evt.target.attributes.virtueIdx.value
        //  console.log(virtue)
        //  console.log(day)
        toggleDayMarked(virtue, day)
    }

  return (
    <div key={virtues} id="virtues">
        <h2>Week {virtues.week}: {virtues.focusVirtue}</h2>
        <h3>{virtues.focusVirtueSaying}</h3>
        <br></br>
        <div id="virtues-grid">
         {virtues.virtues.map((virtue) => {
             return virtue.map((el, idx) => { return <div onClick={evt => onClick(evt)} virtueName={virtue[0]} virtueIdx={idx} className='square' key={[virtue[0], idx]}>{el == false ? '': el == true ? 'X' : el}</div>})
         })}
        </div>
    </div>
  )
}