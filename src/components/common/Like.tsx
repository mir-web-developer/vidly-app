import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

export const Like = ({onClick,liked}:any) => {
let icon = faHeartRegular
if(liked) icon = faHeartSolid

  return (
    <>
     <FontAwesomeIcon style={{cursor:"pointer"}} onClick = {() => onClick()} icon={icon} />
    </>
  );
};