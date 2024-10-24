import React from 'react';
import {Button} from "@radix-ui/themes";
import Alert from "@/app/components/Alert";

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
    return (
        <Alert
            description={ "Are you sure you want to delete this issue? This is not recoverable."}
            actionName={ "Delete Issue" }
            alertTitle={"Confirm Deletion"}
        >
            <Button color="red" size="3">Delete Issue</Button>
        </Alert>
    );
};

export default DeleteIssueButton;