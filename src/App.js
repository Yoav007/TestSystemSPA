import logo from './logo.svg';
import './App.css';
import { MainMenu } from './components/mainMenu/mainMenu';
import { Routes, Route} from 'react-router-dom';
import { ManageQuestions } from './components/manageQuestions/manageQuestions';
import { ManageTests } from './components/manageTests/manageTests';
import { ReportsMenu } from './components/reportsMenu/reportsMenu';
import { ReportByTestMenu } from './components/reportByTestMenu/reportByTestMenu';
import { ShowQuestion } from './components/showQuestion/showQuestion';
import { CreateTest } from './components/createTest/createTest';


//hello
function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<MainMenu/>}/>
      <Route path="/manageQuestions/:id" element={<ManageQuestions/>}/>
      <Route path="/manageQuestions/edit/:id" element={<ManageQuestions/>}/>
      <Route path="/manageQuestions/show/:id" element={<ShowQuestion/>}/>
      <Route path="/manageTests/:id" element={<ManageTests/>}/>
      <Route path="/reports/:id" element={<ReportsMenu/>}/>
      <Route path="/reports/byTest/:id" element={<ReportByTestMenu/>}/>
      <Route path="/createTest/:id" element={<CreateTest/>}/>
    </Routes>
    </div>
  );
}

export default App;
