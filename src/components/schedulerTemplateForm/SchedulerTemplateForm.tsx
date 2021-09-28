import { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { handleAddTaskDetails, handleRemoveTaskDetails, handleTaskDetailsUpdate } from "../../utils";
import { SchedulerTaskDetails, SchedulerTaskRow } from "../schedulerTaskRow";

export function SchedulerTemplateForm(schedulerTemplateFormProps: SchedulerTemplateFormProps) {
const { 
  userName: receivedUserName,
  schedulerTemplateData,
  onFormSubmit,
} = schedulerTemplateFormProps;
const [userName, setUserName] = useState<string>(receivedUserName);
const [templateData, setTemplateData] = useState<SchedulerTaskDetails[]>(schedulerTemplateData);
  return (
    <Form>
      <FloatingLabel
        controlId="nameInput"
        label="Enter your name"
        className="mb-3"
        >
            <Form.Control type="text" placeholder="Enter your name" value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
        </FloatingLabel>
        {
            templateData.map((schedulerTemplateTaskDetails: SchedulerTaskDetails) => (
                <SchedulerTaskRow
                  key={schedulerTemplateTaskDetails.id}
                  taskDetails={schedulerTemplateTaskDetails}
                  isTemplateTaskRow={true}
                  onTaskDetailsUpdate={
                    (updatedTaskDetails: SchedulerTaskDetails) => handleTaskDetailsUpdate(
                      updatedTaskDetails, 
                      templateData,
                      setTemplateData,
                    )
                  }
                  onAddButtonClicked={(id: string) => handleAddTaskDetails(
                    id,
                    templateData,
                    setTemplateData,
                  )}
                  onRemoveButtonClicked={(id: string) => handleRemoveTaskDetails(
                    id,
                    templateData,
                    setTemplateData,
                  )}
                />
            ))
        }
      <Button variant="primary" type="submit" className="mt-2 float-end" onClick={(event) => 
        onFormSubmit(event, userName, templateData)
      }>
        Submit
      </Button>
    </Form>
  );
}

//Types
interface SchedulerTemplateFormProps {
  userName: string;
  schedulerTemplateData: SchedulerTaskDetails[]; 
  onFormSubmit: (event: React.MouseEvent, userName: string, templateData: SchedulerTaskDetails[]) => void;
}
