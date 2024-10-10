import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import IssueForm from "@/app/issues/_components/IssueForm";

interface Props {
    params: { id: string };
}

const EditIssuePage = ({params: {id}}: Props) => {
    const issue = prisma.issue.findUnique({
        where: {id: parseInt(id)}
    });

    if (!issue) notFound()

    return (
        <IssueForm issue={issue }/>
    );
}

export default EditIssuePage;