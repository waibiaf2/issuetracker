import ReactMarkdown from "react-markdown";
import {Table} from "@radix-ui/themes";
import prisma from "@/prisma/client";

import IssueActions from "@/app/issues/IssueActions";
import {IssueStatusBadge, Link} from "@/app/components";

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
            createdAt: true
        }
    });

    return (
        <div>

            <IssueActions/>

            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>
                            ID
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell
                            className="hidden md:table-cell "
                        >
                            Status
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>
                            Title
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>
                            Description
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell
                            className="hidden md:table-cell "
                        >
                            Created At
                        </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        issues.map(issue =>
                            <Table.Row key={issue.id}>
                                <Table.RowHeaderCell>
                                    {issue.id}
                                    <div className="block md:hidden">
                                        <IssueStatusBadge
                                            status={issue.status}
                                        />
                                    </div>
                                </Table.RowHeaderCell>
                                <Table.Cell className="hidden md:table-cell ">
                                    <IssueStatusBadge status={issue.status}/>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link href={`/issues/${issue.id}`} className="hover:cursor-pointer text-blue-500">
                                        {issue.title}
                                    </Link>
                                </Table.Cell>
                                <Table.Cell className="prose">
                                    <ReactMarkdown>
                                        {issue.description}
                                    </ReactMarkdown>
                                </Table.Cell>
                                <Table.Cell className="hidden md:table-cell ">
                                    {issue.createdAt.toLocaleDateString('en-UK')}
                                </Table.Cell>
                            </Table.Row>
                        )
                    }
                </Table.Body>
            </Table.Root>
        </div>
    );
};

export default IssuesPage;