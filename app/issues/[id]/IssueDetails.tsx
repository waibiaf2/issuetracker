import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import {IssueStatusBadge} from "@/app/components";
import ReactMarkdown from "react-markdown";
import {Issue} from "@prisma/client";

const IssueDetails = ({ issue }: {issue: Issue}) => {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap={"3"} my={"2"}>
                <IssueStatusBadge status={issue.status}/> |
                <Text>{issue.createdAt.toLocaleDateString('en-UK')}</Text>
            </Flex>
            <Card className="prose" mt="4">
                <ReactMarkdown>
                    {issue.description}
                </ReactMarkdown>
            </Card>
        </>
    );
};

export default IssueDetails;