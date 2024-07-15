import React from 'react'
interface BackDrops{
    onclick:()=>void
}

const BackDrop:React.FC<BackDrops> = ({onclick}) => {
  return (
    <div onClick={onclick} className='z-20 bg-slate-200 opacity-50 w-screen h-screen fixed top-0 left-0'>BackDrop</div>
  )
}

export default BackDrop