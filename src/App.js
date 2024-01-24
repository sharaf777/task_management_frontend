//import './App.css';
import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';

import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard';
import LogIn from './Pages/LogIn';
import Header from './Components/Header';
import Projectcreate from './Forms/Projectcreate';
import Projectupdate from './Forms/Projectupdate';
import Classcreate from './Forms/Classcreate';
import Classupdate from './Forms/Classupdate';
import Taskcreate from './Forms/Taskcreate';
import Taskupdate from './Forms/Taskupdate';
import Addmanager from './Forms/Addmanager';
import Adduser from './Forms/Adduser';
import AddUserToTask from './Forms/AddusertoTask';
import Project from './Pages/Project';
import Class from './Pages/Class';
import Task from './Pages/Task';
import Taskviewer from './Pages/Taskviewer';
import ManagerRegister from './Pages/ManagerRegister';
import UserRegister from './Pages/UserRegister';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} >
             <Route index element={<Project/>}/>
             <Route path="class" element={<Class />} />
             <Route path="task" element={<Task />} />
             <Route path="taskviewer" element={<Taskviewer />} />
             <Route path="head" element={<Header />} />
          </Route>
          <Route path="/" element={<Header />} />
          <Route path="/Create-manager" element={<ManagerRegister />} />
          <Route path="/Create-user" element={<UserRegister />} />
          <Route path="/Create-project" element={<Projectcreate />} />
          <Route path="/Update-project" element={<Projectupdate />} />
          <Route path="/Add-manager" element={<Addmanager />} />
          <Route path="/Add-user" element={<Adduser />} />
          <Route path="/AddTask-user" element={<AddUserToTask />} />
          <Route path="/Create-class" element={<Classcreate />} />
          <Route path="/Update-class" element={<Classupdate />} />
          <Route path="/Create-task" element={<Taskcreate />} />
          <Route path="/Update-task" element={<Taskupdate />} />
          
          
        </Routes>
      </Router>
      
      {/* <SignUp/> */}
    </div>
  );
}

export default App;
