import React, { useCallback, useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { changeBalance, changeHistory } from "../store/actions";
import nextId from "react-id-generator";

const useStyles = makeStyles((theme) => ({
  footerButton: {
    backgroundColor: "#c3283f",
    margin: "10px",
    width: "150px",
    height: "50px",
    color: "white",
    fontSize: "18px",
  },
}));

export const GameModal = (props) => {
  const balance = useSelector((state) => state.balance);
  const history = useSelector((state) => state.history);
  const dispatch = useDispatch();
  const { closeModal } = props;
  const classes = useStyles();
  const [slotNumbers, setSlotNumbers] = useState([7, 7, 7]);
  const [gameInProcces, setGameInProccess] = useState(false);
  const id = nextId();

  const addHistory = () => {
    const date = new Date();
    const time = date.getHours();
    dispatch(changeHistory({ id: id, slots: slotNumbers, time: time }));
  };

  const startPrice = useCallback((value) => {
    dispatch(changeBalance(value));
  }, []);

  const getRandomNumber = () => {
    return Math.floor(Math.random() * (9 - 1 + 1)) + 1;
  };

  const checkGameResult = () => {
    if (
      JSON.stringify(slotNumbers) === JSON.stringify([1, 1, 2]) ||
      JSON.stringify(slotNumbers) === JSON.stringify([1, 2, 2])
    ) {
      dispatch(changeBalance(0.5));
    }
    if (JSON.stringify(slotNumbers) === JSON.stringify([7, 7, 7])) {
      dispatch(changeBalance(5));
    }
  };

  const getCombination = () => {
    // const timer = setInterval(() =>
    //   setSlotNumbers(
    //     [getRandomNumber(), getRandomNumber(), getRandomNumber()]
    //   ),
    //   100
    // );
    // setTimeout(() => {
    //   setSlotNumbers(
    //     [getRandomNumber(), getRandomNumber(), getRandomNumber()]
    //   )
    //   checkGameResult();
    //   addHistory();
    //   clearInterval(timer);
    // }, 3000);
    setSlotNumbers([getRandomNumber(), getRandomNumber(), getRandomNumber()]);
    checkGameResult();
    addHistory();
  };

  const handleClickRoll = () => {
    startPrice(-1);
    getCombination();
  };

  const handleClickTripleSeven = () => {
    const timer = setInterval(() =>
      setSlotNumbers(
        [getRandomNumber(), getRandomNumber(), getRandomNumber()],
        700
      )
    );
    setTimeout(() => {
      clearInterval(timer);
      setSlotNumbers([7, 7, 7]);
      checkGameResult();
    }, 1000);
  };

  return (
    <div className="modalGameContainer">
      {console.log(history)}
      <h2>Try Your Luck</h2>
      <div className="slotsContainer">
        {slotNumbers.map((num) => {
          return (
            <div className="slotItem">
              <span>{num}</span>
            </div>
          );
        })}
      </div>
      {!gameInProcces && (
        <div className="footerButtonsContainer">
          <Button
            variant="contained"
            className={classes.footerButton}
            onClick={handleClickRoll}
          >
            Roll
          </Button>
          <Button
            variant="contained"
            className={classes.footerButton}
            onClick={handleClickTripleSeven}
          >
            777
          </Button>
          <Button
            variant="contained"
            className={classes.footerButton}
            onClick={closeModal}
          >
            Quit
          </Button>
        </div>
      )}
    </div>
  );
};

GameModal.propTypes = {
  closeModal: PropTypes.func,
};
