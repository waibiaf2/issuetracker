import React from 'react';
import {Button} from "@radix-ui/themes";

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
    return (
        <Button color="red" size="3">Delete Issue</Button>
    );
};

export default DeleteIssueButton;