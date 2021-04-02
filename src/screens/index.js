import { Header } from "../components/header";
import { Body } from "../components/body";
import "./styles.css";

export const HomeScreen = () => {
  return (
    <div className="homeScreenContainer">
      <Header />
      <Body />
    </div>
  );
};
