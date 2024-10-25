'use client';

import {AlertDialog, Button, Flex} from "@radix-ui/themes";
import Alert from "@/app/components/Alert";
import {useRouter} from "next/navigation";
import axios from "axios";

const DeleteIssueButton = ({issueId}: { issueId: number }) => {
    const router = useRouter();
    
    const deleteIssueHandler = async () => {
        await axios.delete(`/api/issues/${ issueId }`, {
            method: "DELETE",
        });
        
        router.push(`/issues`);
        router.refresh();
    }
    
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button
                    variant="solid"
                    color="red"
                    size="3"
                    className={'hover:cursor-pointer'}
                >
                    Delete Issue
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>{'Confirm Issue Delete'}</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    { 'Are you sure you want to delete this issue?' }
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray" className='hover:cursor-pointer'>
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button
                            variant="solid"
                            color="red"
                            className={'hover:cursor-pointer'}
                            onClick={deleteIssueHandler}>
                            Delete Issue
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export default DeleteIssueButton;