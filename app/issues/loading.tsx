import React from 'react';
import {Table} from "@radix-ui/themes";
import IssueActions from "@/app/issues/IssueActions";
import {Skeleton} from "@/app/components";

const LoadingIssuesPage = () => {
    const issues = [1, 2, 3, 4, 5, 6];

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
                            <Table.Row key={ issue }>
                                <Table.RowHeaderCell>
                                    <Skeleton/>
                                </Table.RowHeaderCell>
                                <Table.Cell className="hidden md:table-cell ">
                                    <Skeleton/>
                                </Table.Cell>
                                <Table.Cell><Skeleton/></Table.Cell>
                                <Table.Cell><Skeleton/></Table.Cell>
                                <Table.Cell className="hidden md:table-cell ">
                                    <Skeleton/>
                                </Table.Cell>
                            </Table.Row>
                        )
                    }
                </Table.Body>
            </Table.Root>
        </div>

    );
};

export default LoadingIssuesPage;