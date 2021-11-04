import { Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";

export function SchedulerTaskRow(schedulerTaskRowProps: SchedulerTaskRowProps) {
  const {
    taskDetails,
    taskDetails: {
      id,
      taskName = "",
      taskDuration,
      taskStartTime = "",
    },
    onTaskDetailsUpdate,
    onAddButtonClicked,
    onRemoveButtonClicked,
    isTemplateTaskRow = false,
  } = schedulerTaskRowProps;
  const inputColumnClassName: string = isTemplateTaskRow? 'col-12 col-md-5': 'col-12 col-md-3';
  const buttonColumnClassName: string = isTemplateTaskRow? 'col-3 col-md-1 m-auto': 'col-3 col-md-1 m-auto';
  return (
    <Row className="g-2 mt-1">
      <Col className={inputColumnClassName}>
        <FloatingLabel controlId="taskName" label="Task name">
          <Form.Control type="text" placeholder="Task name" value={taskName} 
            onChange={(event) => handleTaskDetailsUpdate({
              updatedAttribute: "taskName",
              updatedValue: event.target.value, 
              taskDetails,
              onTaskDetailsUpdate,
            })} 
          />
        </FloatingLabel>
      </Col>
      <Col className={inputColumnClassName}>
        <FloatingLabel controlId="taskDuration" label="Task duration in minutes">
          <Form.Control type="number" placeholder="Task duration in minutes" value={taskDuration} 
            onChange={(event) => handleTaskDetailsUpdate({
              updatedAttribute: "taskDuration",
              updatedValue: event.target.value, 
              taskDetails,
              onTaskDetailsUpdate,
            })} 
          />
        </FloatingLabel>
      </Col>
      {!isTemplateTaskRow && 
        <Col className={inputColumnClassName}>
          <FloatingLabel controlId="taskStartTime" label="Task Start time">
            <Form.Control type="text" placeholder="Task start time" value={taskStartTime} 
              onChange={(event) => handleTaskDetailsUpdate({
                updatedAttribute: "taskStartTime",
                updatedValue: event.target.value, 
                taskDetails,
                onTaskDetailsUpdate,
              })} 
            />
          </FloatingLabel>
        </Col>
      }
      <Col className={buttonColumnClassName}>
        <Button variant="primary" size="sm" onClick={() => onAddButtonClicked(id)} >
          Add
        </Button>
      </Col>
      <Col className={buttonColumnClassName}>
        <Button variant="primary" size="sm" onClick={() => onRemoveButtonClicked(id)} >
          Delete
        </Button>
      </Col>
    </Row>
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
  taskStartTime?: string;
}
interface HandleTaskDetailsUpdateArgs {
  updatedAttribute: keyof SchedulerTaskDetails;
  updatedValue: string | number;
  taskDetails: SchedulerTaskDetails;
  onTaskDetailsUpdate: (updatedTaskDetails: SchedulerTaskDetails) => void;
}
