import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

const ErrorComponents = ({ msg }) => {
  return (
    <Alert
      status="error"
      position={"fixed"}
      bottom={"4"}
      left={"50"}
      transform={"translateX(-50%"}
      w={"contaner.lg"}
    >
      <AlertIcon />
      {msg}
    </Alert>
  );
};

export default ErrorComponents;
