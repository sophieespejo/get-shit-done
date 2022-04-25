import "./App.css";
import UserContext from "./Context/UserContext";
import ProjectContext from "./Context/ProjectContext";
import useUser from './Hooks/use-user';
import useProject from "./Hooks/use-project";
import Home from './Pages/Home';
import TaskDashboardPage from "./Pages/TaskDashboardPage";
import TaskContext from "./Context/TaskContext";
import useTask from "./Hooks/use-task";

function App() {
  
  return (
     <UserContext.Provider value={useUser()}>
       <ProjectContext.Provider value={useProject()}>
         <TaskContext.Provider value={useTask()}>
          <Home/>   
         </TaskContext.Provider>
        </ProjectContext.Provider>
     </UserContext.Provider>
  );
}

export default App;
