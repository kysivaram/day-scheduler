import { Modal } from "react-bootstrap";
import { DismissibleAlert, DismissibleAlertVariant } from "../dismissableAlert";

export function SchedulerTemplateModal(schedulerTemplateModalProps: SchedulerTemplateModalProps) {
    const {
        showTemplateModal,
        onModalClose,
        children,
    } = schedulerTemplateModalProps;
    return (
        <Modal show={showTemplateModal} onHide={onModalClose} size="lg" >
            <Modal.Header closeButton>
                <Modal.Title>Scheduler Template</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DismissibleAlert 
                    variant={DismissibleAlertVariant.Info}
                    message="Based on this template your daily schedule will be set. You can edit this anytime."
                />
                {children}
            </Modal.Body>
        </Modal>
      );
}

//Types
interface SchedulerTemplateModalProps {
    showTemplateModal: boolean;
    onModalClose: () => void;
    children: React.ReactNode;
}