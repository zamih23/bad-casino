import React, { useCallback, useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { useDispatch, useSelector, useStore } from "react-redux";
import { changeBalance, changeHistory } from "../store/actions";
import nextId from "react-id-generator";
import { getRandomNumber, getFinalSlots } from "../../utils";

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
  const store = useStore();
  const dispatch = useDispatch();
  const { closeModal } = props;
  const classes = useStyles();
  const [slotNumbers, setSlotNumbers] = useState([7, 7, 7]);
  const [finalNumbers, setFinalNumbers] = useState();
  const id = nextId();

  const startPrice = useCallback((value) => {
    dispatch(changeBalance(value));
  }, []);

  const checkGameResult = () => {
    if (
      JSON.stringify(slotNumbers) === JSON.stringify([1, 1, 2]) ||
      JSON.stringify(slotNumbers) === JSON.stringify([1, 2, 2])
    ) {
      dispatch(changeBalance(0.5));
      console.log("+0.5");
    }
    if (JSON.stringify(slotNumbers) === JSON.stringify([7, 7, 7])) {
      dispatch(changeBalance(5));
      console.log("+5");
    }
  };

  useEffect(() => {
    const date = new Date();
    if (finalNumbers !== undefined && finalNumbers.length !== 0) {
      checkGameResult();
      dispatch(
        changeHistory({
          id: id,
          slots: slotNumbers,
          time: date.toLocaleTimeString(),
        })
      );
    }
  }, [finalNumbers]);

  const getCombination = () => {
    const timer = setInterval(() => setSlotNumbers(getFinalSlots), 100);
    setTimeout(() => {
      clearInterval(timer);
      setFinalNumbers(slotNumbers);
    }, 1000);
  };

  const handleClickRoll = () => {
    startPrice(-1);
    getCombination();
  };

  const handleClickTripleSeven = () => {
    const timer = setInterval(() => setSlotNumbers(getFinalSlots), 100);
    setTimeout(() => {
      clearInterval(timer);
      setSlotNumbers([7, 7, 7]);
      setFinalNumbers(slotNumbers);
    }, 1000);
  };

  return (
    <div className="modalGameContainer">
      <h2>Try Your Luck</h2>
      <div className="slotsContainer">
        {slotNumbers.length === 0
          ? [7, 7, 7].map((num) => {
              return (
                <div className="slotItem">
                  <span>{num}</span>
                </div>
              );
            })
          : slotNumbers.map((num) => {
              return (
                <div className="slotItem">
                  <span>{num}</span>
                </div>
              );
            })}
      </div>
      <div className="footerButtonsContainer">
        <Button
          variant="contained"
          className={classes.footerButton}
          onClick={handleClickRoll}
          disabled={balance === 0}
        >
          Roll
        </Button>
        <Button
          variant="contained"
          className={classes.footerButton}
          onClick={handleClickTripleSeven}
          disabled={balance === 0}
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
    </div>
  );
};

GameModal.propTypes = {
  closeModal: PropTypes.func,
};
