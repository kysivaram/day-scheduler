import './App.css';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  SchedulerHeader,
  SchedulerTemplateModal, 
  SchedulerTemplateForm, 
  SchedulerTaskDetails, 
  DailySchedule,
} from "./components";
import { useLocalStorage } from "./hooks";
import { checkIfTaskDataNotPresent, getEmptyTaskDetails } from "./utils";
import moment from "moment";

function App() {
  const [userName, saveUserName] = useLocalStorage("userName", "");
  const [templateData, saveTemplateData] = useLocalStorage("templateData", [getEmptyTaskDetails()]);
  const [wakeUpTime, saveWakeUpTime] = useLocalStorage("wakeUpTime", "");
  const [todaysSchedule, saveTodaysSchedule] = useLocalStorage("todaysSchedule", templateData);
  const isTemplateDataNotPresent: boolean = checkIfTaskDataNotPresent(templateData);
  const [showTemplateModal, setShowTemplateModal] = useState(isTemplateDataNotPresent);

  const handleCloseTemplateModal = () => setShowTemplateModal(false);
  const handleShowTemplateModal = () => setShowTemplateModal(true);

  const [scheduleDate, saveScheduleDate] = useLocalStorage("scheduleDate", new Date());
  checkAndResetTodaysSchedule({
    scheduleDate,
    saveScheduleDate,
    saveTodaysSchedule,
    templateData
  });
  return (
    <>
      <SchedulerHeader 
        handleShowTemplateModal={handleShowTemplateModal}
      />
      <DailySchedule
        userName={userName}
        showSchedule={!showTemplateModal}
        templateData={templateData}
        wakeUpTime={wakeUpTime}
        todaysSchedule={todaysSchedule}
        onScheduleSave={(updatedWakeUpTime: string, todaysUpdatedSchedule: SchedulerTaskDetails[]) => {
          handleDailyScheduleSave({
            wakeUpTime: updatedWakeUpTime,
            todaysSchedule: todaysUpdatedSchedule,
            saveWakeUpTime,
            saveTodaysSchedule,
          })
        }}
      />
      <SchedulerTemplateModal 
        showTemplateModal={showTemplateModal}
        onModalClose={handleCloseTemplateModal}
      >
        <SchedulerTemplateForm 
          userName={userName}
          schedulerTemplateData={templateData}
          onFormSubmit={
            (event: React.MouseEvent, updatedUserName: string, updatedTemplateData: SchedulerTaskDetails[]) => 
              handleTemplateFormSubmit({
              event,
              userName: updatedUserName,
              templateData: updatedTemplateData,
              saveUserName,
              saveTemplateData,
              saveTodaysSchedule,
              handleCloseTemplateModal,
            })
          }
        />
      </SchedulerTemplateModal>
    </>
  );
}

export default App;

//Utils
async function handleTemplateFormSubmit(
  handleTemplateFormSubmitParams: HandleTemplateFormSubmitParams,
) {
  const {
    event,
    userName,
    templateData,
    saveUserName,
    saveTemplateData,
    saveTodaysSchedule,
    handleCloseTemplateModal,
  } = handleTemplateFormSubmitParams;
  event.preventDefault();
  await saveUserName(userName);
  await saveTemplateData(templateData);
  await saveTodaysSchedule(templateData);
  handleCloseTemplateModal();
}

async function handleDailyScheduleSave(
  handleDailyScheduleSaveParams: ParamsToHandleDailyScheduleSave,
) {
  const {
    wakeUpTime,
    todaysSchedule,
    saveWakeUpTime,
    saveTodaysSchedule,
  } = handleDailyScheduleSaveParams;
  await saveWakeUpTime(wakeUpTime);
  await saveTodaysSchedule(todaysSchedule);
  alert("Schedule saved successfully!");
} 
async function checkAndResetTodaysSchedule(
  checkAndResetTodaysScheduleParams: CheckAndResetTodaysScheduleParams,
) {
  const {
    scheduleDate,
    saveScheduleDate,
    saveTodaysSchedule,
    templateData
  } = checkAndResetTodaysScheduleParams;
  const date = new Date();
  const scheduleDateInMoment = moment(scheduleDate);
  const currentDateInMoment = moment(date);
  const daysDifference = currentDateInMoment.diff(scheduleDateInMoment, 'days'); 
  if(daysDifference > 0) {
    await saveScheduleDate(String(currentDateInMoment));
    await saveTodaysSchedule(templateData);
  }
}
//Types
interface HandleTemplateFormSubmitParams {
  event: React.MouseEvent;
  userName: string;
  templateData: SchedulerTaskDetails[];
  saveUserName: (userName: string) => void;
  saveTemplateData: (templateData: SchedulerTaskDetails[]) => void;
  saveTodaysSchedule: (templateData: SchedulerTaskDetails[]) => void;
  handleCloseTemplateModal: () => void;
}
interface ParamsToHandleDailyScheduleSave {
  wakeUpTime: string;
  todaysSchedule: SchedulerTaskDetails[];
  saveWakeUpTime: (wakeUpTime: string) => void;
  saveTodaysSchedule: (todaysSchedule: SchedulerTaskDetails[]) => void;
}
interface CheckAndResetTodaysScheduleParams {
  scheduleDate: string;
  saveScheduleDate: ( scheduleDate: string) => void;
  saveTodaysSchedule: (todaysSchedule: SchedulerTaskDetails[]) => void;
  templateData: SchedulerTaskDetails[];
}