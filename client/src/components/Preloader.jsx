import React from 'react'

function Preloader() {
  return (
    <div className="grid place-items-center gap-2">
    <div
      className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
    <h1 className="text-xl text-dimWhite animate-pulse">Loading...</h1>
  </div>
  )
}

export default Preloader
