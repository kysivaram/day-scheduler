import { v4 as uuidv4 } from "uuid";
import { SchedulerTaskDetails } from "../components";

export function getEmptyTaskDetails(): SchedulerTaskDetails {
  const emptyTaskDetails: SchedulerTaskDetails = {
    id: uuidv4(),
  };
  return emptyTaskDetails;
}

export function checkIfTaskDataNotPresent(
  taskData: SchedulerTaskDetails[],
): boolean {
  const taskDetailsWithData: SchedulerTaskDetails | undefined = 
    taskData.find((taskDetails: SchedulerTaskDetails) => {
      const {
        taskName,
        taskDuration,
      } = taskDetails;
      return taskName || taskDuration;
    });
  if(taskDetailsWithData) {
    return false;
  }
  return true;
}

export function handleTaskDetailsUpdate(
  updatedTaskDetails: SchedulerTaskDetails, 
  templateData: SchedulerTaskDetails[],
  setTemplateData: (templateData: SchedulerTaskDetails[]) => void,
) {
  const { id: taskIdToUpdate } = updatedTaskDetails;
  const updatedTemplateData: SchedulerTaskDetails[] = templateData.map(
    (taskDetails: SchedulerTaskDetails): SchedulerTaskDetails => {
      const { id: taskId } = taskDetails;
      if(taskId === taskIdToUpdate) {
        return updatedTaskDetails;
      }
      return taskDetails;
    }
  );
  setTemplateData(updatedTemplateData);
}

export function handleAddTaskDetails(
  taskIdAfterWhichRowToBeAdded: string,
  templateData: SchedulerTaskDetails[],
  setTemplateData: (templateData: SchedulerTaskDetails[]) => void,
) {
  const indexAfterWhichToAdd: number = templateData.findIndex(
    (taskDetails: SchedulerTaskDetails) => taskDetails.id === taskIdAfterWhichRowToBeAdded
  );
  const indexAtWhichToAdd: number = indexAfterWhichToAdd + 1;
  const emptyTaskDetails: SchedulerTaskDetails = getEmptyTaskDetails();
  const updatedTemplateData: SchedulerTaskDetails[] = 
    templateData.slice(0,indexAtWhichToAdd).concat(
      emptyTaskDetails,templateData.slice(indexAtWhichToAdd)
    );
  setTemplateData(updatedTemplateData);
}


export function handleRemoveTaskDetails(
  taskIdToDelete: string,
  templateData: SchedulerTaskDetails[],
  setTemplateData: (templateData: SchedulerTaskDetails[]) => void,
) {
  const updatedTemplateData: SchedulerTaskDetails[] = templateData.filter(
    (taskDetails: SchedulerTaskDetails) => taskDetails.id !== taskIdToDelete
  );
  setTemplateData(updatedTemplateData);
}