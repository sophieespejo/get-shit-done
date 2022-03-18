import "./App.css";
import UserContext from "./Context/UserContext";
import ProjectContext from "./Context/ProjectContext";
import useUser from './Hooks/use-user';
import useProject from "./Hooks/use-project";
import Home from './Pages/Home';
import TaskDashboardPage from "./Pages/TaskDashboardPage";

function App() {
  
  return (
     <UserContext.Provider value={useUser()}>
       <ProjectContext.Provider value={useProject()}>
          <Home/>   
        </ProjectContext.Provider>
     </UserContext.Provider>
  );
}

export default App;
