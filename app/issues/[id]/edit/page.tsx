import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import IssueForm from "@/app/issues/_components/IssueForm";

interface Props {
    params: { id: string };
}

const EditIssuePage = async ({params}: Props) => {
    const issue = await prisma.issue.findUnique({
        select: {
            id: true,
            title: true,
            description: true
        },
        where: {id: parseInt(params.id)}
    });

    console.log(issue);

    if (!issue) notFound()

    return (
        <IssueForm issue={issue} isUpdate={true}/>
    );
}

export default EditIssuePage;