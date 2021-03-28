import EnhancedTable from "../components/body";
import { Header } from "../components/header";
import "./styles.css";

export const HomeScreen = () => {
    return (
        <div className="homeScreenContainer">
            <Header /> 
             <EnhancedTable />
        </div>
    );
}