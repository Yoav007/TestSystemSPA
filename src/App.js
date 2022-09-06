import logo from './logo.svg';
import './App.css';
import { MainMenu } from './components/mainMenu/mainMenu';
import { Routes, Route } from 'react-router-dom';
import { ManageQuestions } from './components/manageQuestions/manageQuestions';
import { ManageTests } from './components/manageTests/manageTests';
import { ReportsMenu } from './components/manageReports/reportsMenu/reportsMenu';
import { ReportByTestMenu } from './components/manageReports/reportByTestMenu/reportByTestMenu';
import { ShowQuestion } from './components/manageQuestions/showQuestion/showQuestion';
import { EditQuestion } from './components/manageQuestions/editQuestion/editQuestion';
import { CreateTest } from './components/manageTests/createTest/createTest';
import { AddQuestion } from './components/manageQuestions/addQuestion/addQuestion';
import { EditTest } from './components/manageTests/editTest/editTest';
import { ReportByStudent } from './components/manageReports/reportsByStudent/reportsByStudent';
import {TakeTest} from './components/manageTests/takeTest/takeTest';
import {ReportByStudentId} from './components/manageReports/reportsByStudent/reportsByStudentId';



//hello
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/manageQuestions/:id" element={<ManageQuestions />} />
        <Route path="/manageQuestions/add/:topicId" element={<AddQuestion />} />
        <Route path="/manageQuestions/edit/:id" element={<EditQuestion />} />
        <Route path="/manageQuestions/show/:id" element={<ShowQuestion />} />
        <Route path="/manageTests/:id" element={<ManageTests />} />
        <Route path="/createTest/:id" element={<CreateTest />} />
        <Route path="/manageTest/editTest/:id/:topicId" element={<EditTest/>}/>
        <Route path="/manageTest/takeTest/:id" element={<TakeTest/>}/>
        <Route path="/reports/:id" element={<ReportsMenu />} />
        <Route path="/reports/testsByTopic/:id" element={<ReportByTestMenu />} />
        <Route path="/reports/byStudent/" element={<ReportByStudent/>} />
        <Route path="/reports/byStudent/:id" element={<ReportByStudentId/>} />
      </Routes>
    </div>
  );
}

export default App;
