import "./App.css";
import UserContext from "./Context/UserContext";
import useUser from './Hooks/use-user';
import Home from './Pages/Home';
import TaskDashboardPage from "./Pages/TaskDashboardPage";

function App() {
  
  return (
     <UserContext.Provider value={useUser()}>
         <Home/> 
     </UserContext.Provider>
  );
}

export default App;
