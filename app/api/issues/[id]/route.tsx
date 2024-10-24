import {NextRequest, NextResponse} from "next/server";
import {issueSchema} from "@/app/validationSchemas";
import prisma from "@/prisma/client";

export async function PATCH(request: NextRequest, {params}:{params: {id: string}}) {
    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400});
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if (!issue)
        return NextResponse.json({error: "Invalid Issue"}, {status: 404});

    const updatedIssue = await prisma.issue.update({
        where: {
            id: issue.id
        },
        data: {
            title:body.title,
            description:body.description
        }
    })

    return NextResponse.json(updatedIssue, {status: 200});
}

export async function DELETE(request: NextRequest, {params}:{params: {id: string}}) {
    /**
     * 1. Check if the issue exists
     * 2. Delete the issue
     * 3. Return a success message
     * */
    
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });
    
    if (!issue)
        return NextResponse.json({error: "Invalid Issue"}, {status: 404});
    
    await prisma.issue.delete({
        where: {
            id: issue.id
        }
    });
    
    return NextResponse.json({message: "Issue deleted successfully"}, {status: 200});
}
