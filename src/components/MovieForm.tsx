import React from 'react'


export const MovieForm = ({match,history}:any) => {
  const onClickHandler =( ) => {
    history.push("/movies")
  }
  return <>
    <h1>Movie Form {match.params.id}</h1>
<button className="btn btn-primary" onClick={onClickHandler}>Save</button>
  </>
}