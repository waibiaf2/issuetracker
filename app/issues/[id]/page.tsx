import prisma from "@/prisma/client";
import {notFound, useRouter} from "next/navigation";
import {Box, Flex, Grid} from "@radix-ui/themes";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";

interface Props {
    params: { id: string }
}


const IssueDetailsPage = async (
    {params}: Props
) => {
    
    const router = useRouter();
    
    const issue =
        await prisma.issue.findUnique({
            where: {
                id: parseInt(params.id),
            }
        })
        
    if (!issue) {
        return notFound();
    }
    
    const issueDeleteHandler = async () => {
        fetch(`/api/issues/${issue.id}`, {
            method: "DELETE",
        });
        
        router.push(`/issues`);
        router.refresh();
    }
    
    return (
        <Grid columns={ {initial: "1", sm: "4"} } gap="4">
            <Box className="md:col-span-3">
                <IssueDetails issue={ issue }/>
            </Box>
            <Box>
                <Flex direction="column" gap="3">
                    <EditIssueButton issueId={ issue.id }/>
                    <DeleteIssueButton
                        issueId={ issue.id }
                    />
                </Flex>
            </Box>
        </Grid>
    );
};

export default IssueDetailsPage;