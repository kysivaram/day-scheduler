import { Alert } from "react-bootstrap";
import { useState } from "react";

export function DismissibleAlert(dismissibleAlertProps: DismissibleAlertProps) {
  const { variant, heading = "", message = "" } = dismissibleAlertProps;
  const [showAlert, setShowAlert] = useState(true);
  return (
    <>
      {showAlert && (
        <Alert
          variant={variant}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>{heading}</Alert.Heading>
          {message}          
        </Alert>
      )}
    </>
  );
}

//Types
interface DismissibleAlertProps {
  variant: DismissibleAlertVariant;
  heading?: string;
  message?: string
}

export enum DismissibleAlertVariant {
  Primary = "primary",
  Secondary = "secondary",
  Success = "success",
  Warning = "warning",
  Info = "info",
  Light = "light",
  Dark = "dark",
}
