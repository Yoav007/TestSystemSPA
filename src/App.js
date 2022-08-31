import logo from './logo.svg';
import './App.css';
import { MainMenu } from './components/mainMenu/mainMenu';
import { Routes, Route } from 'react-router-dom';
import { ManageQuestions } from './components/manageQuestions/manageQuestions';
import { ManageTests } from './components/manageTests/manageTests';
import { ReportsMenu } from './components/reportsMenu/reportsMenu';
import { ReportByTestMenu } from './components/reportByTestMenu/reportByTestMenu';
import { ShowQuestion } from './components/manageQuestions/showQuestion/showQuestion';
import { EditQuestion } from './components/manageQuestions/questionEditPage/editQuestion';
import { CreateTest } from './components/manageTests/createTest/createTest';
import { EditTest } from './components/manageTests/editTest/editTest';


//hello
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/manageQuestions/:id" element={<ManageQuestions />} />
        <Route path="/manageQuestions/edit/:id" element={<EditQuestion />} />
        <Route path="/manageQuestions/show/:id" element={<ShowQuestion />} />
        <Route path="/manageTests/:id" element={<ManageTests />} />
        <Route path="/createTest/:id" element={<CreateTest />} />
        <Route path="/manageTest/editTest/:id" element={<EditTest/>}/>
        <Route path="/reports/:id" element={<ReportsMenu />} />
        <Route path="/reports/byTest/:id" element={<ReportByTestMenu />} />
      </Routes>
    </div>
  );
}

export default App;
