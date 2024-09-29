import React from 'react';
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import ReactMarkdown from "react-markdown";

import {Pencil2Icon} from "@radix-ui/react-icons";
import {Box, Button, Card, Flex, Grid, Heading, Text} from "@radix-ui/themes";
import {IssueStatusBadge} from "@/app/components";
import Link from "next/link";

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

    return (
        <Grid columns={{initial:"1", md:"2"}} gap="4">
            <Box>
        ,        <Heading>{issue.title}</Heading>
                <Flex gap={"3"} my={"2"}>
                    <IssueStatusBadge status={issue.status}/> |
                    <Text>{issue.createdAt.toLocaleDateString('en-UK')}</Text>
                </Flex>
                <Card className="prose" mt="4">
                    <ReactMarkdown>
                        {issue.description}
                    </ReactMarkdown>
                </Card>
            </Box>
            <Box >
                <Button size="3">
                    <Pencil2Icon/>
                    <Link href={`/issues/${issue.id}/edit`} >
                        Edit Issue
                    </Link>
                </Button>
            </Box>
        </Grid>
    );
};

export default IssueDetailsPage;