import React, { useState } from 'react';
import {EnhancedTable} from "../table";
import { Button, Modal } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { GameModal } from '../game-modal';

const useStyles = makeStyles((theme) => ({
  playButton: {
    width: "150px"
  }
}));

export const Body =() => {
  const classes = useStyles()
  const [gameModal, setGameModal] = useState(false)

  const handleGameModalOpen = () => {
    setGameModal(true);
  };

  const handleGameModalClose = () => {
    setGameModal(false);
  };



  return(
   <div className="bodyContainer">
             <Modal
        open={gameModal}
        onClose={handleGameModalClose}
        style={{display: "flex", alignItems: "center", justifyContent: "center", padding: "50px"}}
        >
          <GameModal closeModal={handleGameModalClose} /> 
        </Modal>
        <h2>Your Last Games</h2>
     <EnhancedTable />
     <Button variant="outlined" color="primary"className={classes.playButton} onClick={handleGameModalOpen}>Play</Button>
   </div>
  );
}