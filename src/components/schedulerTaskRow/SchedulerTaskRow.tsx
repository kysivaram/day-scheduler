import { Form, Button, Row, Col } from "react-bootstrap";

enum SchedulerTaskType {
  DailyChores = "DailyChores",
  Personal = "Personal",
  Internet = "Internet",
  Food = "Food",
  Academic = "Academic",
  NothingSpecific = "NothingSpecific",
  Official = "Official"
}

export function SchedulerTaskRow(schedulerTaskRowProps: SchedulerTaskRowProps) {
  const {
    taskDetails,
    taskDetails: {
      id,
      taskName = "",
      taskDuration,
      taskType,
      taskStartTime = "",
    },
    onTaskDetailsUpdate,
    onAddButtonClicked,
    onRemoveButtonClicked,
    isTemplateTaskRow = false,
  } = schedulerTaskRowProps;
  return (
    <div className="mt-4">
      <button type="button" className="btn-close float-end btn-close-white" aria-label="Close" 
        onClick={() => onRemoveButtonClicked(id)}>
      </button>
      <Row className="g-2 mt-1">
        <Col className={isTemplateTaskRow? 'col-6 col-md-4': 'col-6 col-md-3'}>
          <Form.Group className="" controlId="taskName">
            <Form.Label>Task name</Form.Label>
            <Form.Control type="text" placeholder="Task name" value={taskName} 
              onChange={(event) => handleTaskDetailsUpdate({
                updatedAttribute: "taskName",
                updatedValue: event.target.value, 
                taskDetails,
                onTaskDetailsUpdate,
              })} 
            />
          </Form.Group>
        </Col>
        <Col className="col-5 col-md-3">
          <Form.Group className="" controlId="taskType">
            <Form.Label>Task type</Form.Label>
            <Form.Select aria-label="Task type"
              value={taskType}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleTaskDetailsUpdate({
                updatedAttribute: "taskType",
                updatedValue: event.target.value, 
                taskDetails,
                onTaskDetailsUpdate,
              })}
            >
              <option>Select task type</option>
              <option value={SchedulerTaskType.DailyChores}>Daily chores</option>
              <option value={SchedulerTaskType.Academic}>Academic</option>
              <option value={SchedulerTaskType.Official}>Official</option>
              <option value={SchedulerTaskType.Food}>Food</option>
              <option value={SchedulerTaskType.Internet}>Internet</option>
              <option value={SchedulerTaskType.Personal}>Personal</option>
              <option value={SchedulerTaskType.NothingSpecific}>Nothing specific</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col className={isTemplateTaskRow? 'col-11 col-md-4': 'col-6 col-md-3'}>
          <Form.Group className="" controlId="taskDuration">
            <Form.Label>Task duration in minutes</Form.Label>
            <Form.Control type="number" placeholder="Task duration in minutes" value={taskDuration} 
              onChange={(event) => handleTaskDetailsUpdate({
                updatedAttribute: "taskDuration",
                updatedValue: event.target.value, 
                taskDetails,
                onTaskDetailsUpdate,
              })} 
            />
          </Form.Group>
        </Col>
        {!isTemplateTaskRow && 
          <Col className="col-5 col-md-2">
            <Form.Group className="" controlId="taskStartTime">
              <Form.Label>Task Start time</Form.Label>
              <Form.Control type="text" placeholder="Task start time" value={taskStartTime} 
                onChange={(event) => handleTaskDetailsUpdate({
                  updatedAttribute: "taskStartTime",
                  updatedValue: event.target.value, 
                  taskDetails,
                  onTaskDetailsUpdate,
                })} 
              />
            </Form.Group>
          </Col>
        }
        <Col className="col-1 col-md-1 mt-auto">
          <Button className="btn-primary-custom" onClick={() => onAddButtonClicked(id)} >
            Add
          </Button>
        </Col>
      </Row>
    </div>
  );
}

//Utils
function handleTaskDetailsUpdate(
  handleTaskDetailsUpdateArgs: HandleTaskDetailsUpdateArgs,
): void {
  const {
    updatedAttribute,
    updatedValue,
    taskDetails,
    onTaskDetailsUpdate,
  } = handleTaskDetailsUpdateArgs;
  const updatedTaskDetails: SchedulerTaskDetails = {
    ...taskDetails,
    [updatedAttribute]: updatedValue,
  }
  onTaskDetailsUpdate(updatedTaskDetails);
}

//Types
interface SchedulerTaskRowProps {
  taskDetails: SchedulerTaskDetails;
  onTaskDetailsUpdate: (updatedTaskDetails: SchedulerTaskDetails) => void;
  onAddButtonClicked: (id: string) => void;
  onRemoveButtonClicked: (id: string) => void;
  isTemplateTaskRow?: boolean;
}
export interface SchedulerTaskDetails {
  id: string;
  taskName?: string;
  taskDuration?: number;
  taskType?: SchedulerTaskType;
  taskStartTime?: string;
}
interface HandleTaskDetailsUpdateArgs {
  updatedAttribute: keyof SchedulerTaskDetails;
  updatedValue: string | number;
  taskDetails: SchedulerTaskDetails;
  onTaskDetailsUpdate: (updatedTaskDetails: SchedulerTaskDetails) => void;
}
