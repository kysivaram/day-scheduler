import { Navbar, Container, Form, Button } from "react-bootstrap";

export function SchedulerHeader(schedulerHeaderProps: SchedulerHeaderProps) {
  const { handleShowTemplateModal } = schedulerHeaderProps;

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand className="color-white">Day Scheduler</Navbar.Brand>
        </Container>
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex">
            <Button
              className="btn-primary-custom float-end"
              onClick={handleShowTemplateModal}
            >
              Edit scheduler template
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

//Types
interface SchedulerHeaderProps {
  handleShowTemplateModal: () => void;
}
