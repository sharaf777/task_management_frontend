//import './App.css';
import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';

import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard';
import LogIn from './Pages/LogIn';
import Header from './Components/Header';
import Projectcreate from './Forms/Projectcreate';
import Projectupdate from './Forms/Projectupdate';
import Addmanager from './Forms/Addmanager';
import Project from './Pages/Project';
import Class from './Pages/Class';
import Task from './Pages/Task';
import ManagerRegister from './Pages/ManagerRegister';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/" element={<Dashboard />} >
             <Route index element={<Project/>}/>
             <Route path="class" element={<Class />} />
             <Route path="task" element={<Task />} />
             <Route path="/head" element={<Header />} />
          </Route>
          <Route path="/head" element={<Header />} />
          <Route path="/Create-manager" element={<ManagerRegister />} />
          <Route path="/Create-project" element={<Projectcreate />} />
          <Route path="/Update-project" element={<Projectupdate />} />
          <Route path="/Add-manager" element={<Addmanager />} />
        </Routes>
      </Router>
      
      {/* <SignUp/> */}
    </div>
  );
}

export default App;
