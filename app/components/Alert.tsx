import {AlertDialog, Button, Flex} from '@radix-ui/themes';

interface AlertProps {
    children: React.ReactNode;
    description: string;
    actionName: string;
    alertTitle: string;
    deleteIssue: () => void;
}

const Alert = ({children, description, actionName, alertTitle,deleteIssue }: AlertProps) => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                {children}
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>{alertTitle}</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    { description }
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={deleteIssue}>
                            { actionName }
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    
    );
};

export default Alert;