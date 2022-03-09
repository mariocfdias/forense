import {useState, useEffect} from 'react';

export const ManageDate = ({date}) => {

 const createDate = new Date(date)
 const year = createDate.getFullYear()
 const month = createDate.getMonth() + 1
 const day = createDate.getDate()
 
 

 const completeDate = `${day}/${month}/${year}`

  return (
    <>
      {completeDate}
    </>
  )
}

