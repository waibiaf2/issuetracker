import React from 'react';
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import delay from "delay";
import ReactMarkdown from "react-markdown";

import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

interface Props {
    params: { id: string }
}

const IssueDetailsPage = async (
    {params}: Props
) => {

    const issue =
        await prisma.issue.findUnique({
            where: {
                id: parseInt(params.id),
            }
        })


    if (!issue) {
        return notFound();
    }

    delay(2000);

    return (
        <div className="space-y-4">
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
        </div>
    );
};

export default IssueDetailsPage;