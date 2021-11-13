import { useEffect, useState } from "react";
import moment from "moment";
import { Row, Col, Form, Button } from "react-bootstrap";
import { SchedulerTaskDetails, SchedulerTaskRow } from "..";
import {
  handleTaskDetailsUpdate,
  handleAddTaskDetails,
  handleRemoveTaskDetails,
  checkIfTaskDataNotPresent,
} from "../../utils";
import dailyScheduleStyles from "./dailySchedule.module.css";

export function DailySchedule(dailyScheduleProps: DailyScheduleProps) {
  const {
    userName,
    showSchedule,
    templateData,
    wakeUpTime: receivedWakeUpTime,
    todaysSchedule: receivedTodaysSchedule,
    onScheduleSave,
  } = dailyScheduleProps;
  const isTodaysScheduleNotPresent: boolean = checkIfTaskDataNotPresent(
    receivedTodaysSchedule
  );
  const defaultSchedule: SchedulerTaskDetails[] = isTodaysScheduleNotPresent
    ? templateData
    : receivedTodaysSchedule;
  const [wakeUpTime, setWakeUpTime] = useState<string>(receivedWakeUpTime);
  const [schedule, setSchedule] =
    useState<SchedulerTaskDetails[]>(defaultSchedule);
  useEffect(() => {
    setSchedule(defaultSchedule);
  }, [defaultSchedule]);
  if (!showSchedule) {
    return <></>;
  }
  return (
    <div className="p-3">
      <Row>
        <span>Hi {userName}!</span>
      </Row>
      <Row className="g-2 mt-1 clearfix">
        <Col className="col-sm-12 col-md-4">
          <Form.Group className="" controlId="wakeUpTime">
              <Form.Label>Wake up time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wake up time"
                value={wakeUpTime}
                onChange={(event) =>
                  handleWakeUpTimeChange({
                    wakeUpTime: event.target.value,
                    setWakeUpTime,
                    schedule,
                    setSchedule,
                  })
                }
              />
            </Form.Group>
        </Col>
      </Row>
      {schedule.map((schedulerTemplateTaskDetails: SchedulerTaskDetails) => (
        <SchedulerTaskRow
          key={schedulerTemplateTaskDetails.id}
          taskDetails={schedulerTemplateTaskDetails}
          onTaskDetailsUpdate={(updatedTaskDetails: SchedulerTaskDetails) =>
            handleTaskDetailsUpdate(updatedTaskDetails, schedule, setSchedule)
          }
          onAddButtonClicked={(id: string) =>
            handleAddTaskDetails(id, schedule, setSchedule)
          }
          onRemoveButtonClicked={(id: string) =>
            handleRemoveTaskDetails(id, schedule, setSchedule)
          }
        />
      ))}
      <Row className="g-2 mt-4 clearfix float-end">
        <Col className="col-12">
          <Button
            className={`${dailyScheduleStyles.marginRight} btn-primary-custom`}
            onClick={() => 
              handleScheduleChangeAsPerWakeUpTime(
                wakeUpTime,
                schedule,
                setSchedule,
              )
            }
          >
            Update
          </Button>
          <Button
            className="btn-primary-custom"
            onClick={() => onScheduleSave(wakeUpTime, schedule)}
          >
            Save
          </Button>
        </Col>
      </Row>
    </div>
  );
}

//Utils
function handleWakeUpTimeChange(
  handleWakeUpTimeChangeParams: HandleWakeUpTimeChangeParams
) {
  const { wakeUpTime, setWakeUpTime, schedule, setSchedule } =
    handleWakeUpTimeChangeParams;
  setWakeUpTime(wakeUpTime);
  handleScheduleChangeAsPerWakeUpTime(
    wakeUpTime,
    schedule,
    setSchedule,
  );
  
}
function handleScheduleChangeAsPerWakeUpTime(
  wakeUpTime: string,
  schedule: SchedulerTaskDetails[],
  setSchedule: (schedule: SchedulerTaskDetails[]) => void,
) {
  //const wakeUpTimeInMoment: string = moment(wakeUpTime,'h:mm a').format('h:mm a');
  let timeTracker = wakeUpTime;
  const updatedSchedule: SchedulerTaskDetails[] = schedule.map(
    (taskDetails: SchedulerTaskDetails, index: number) => {
      const { taskDuration } = taskDetails;
      // if(index === 0) {
      //     return {
      //         ...taskDetails,
      //         taskStartTime: wakeUpTimeInMoment,
      //     }
      // }

      const updatedTaskStartTime = moment(timeTracker, "hh:mm")
        .add(taskDuration, "minutes")
        .format("hh:mm");
      timeTracker = String(updatedTaskStartTime);
      return {
        ...taskDetails,
        taskStartTime: String(updatedTaskStartTime),
      };
    }
  );
  setSchedule(updatedSchedule);
}
//Types
interface DailyScheduleProps {
  userName: string;
  showSchedule: boolean;
  templateData: SchedulerTaskDetails[];
  wakeUpTime: string;
  todaysSchedule: SchedulerTaskDetails[];
  onScheduleSave: (
    wakeUpTime: string,
    todaysSchedule: SchedulerTaskDetails[]
  ) => void;
}
interface HandleWakeUpTimeChangeParams {
  wakeUpTime: string;
  setWakeUpTime: (wakeUpTime: string) => void;
  schedule: SchedulerTaskDetails[];
  setSchedule: (schedule: SchedulerTaskDetails[]) => void;
}
