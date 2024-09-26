import {z} from "zod";

export const createIssueSchema = z.object({
    title: z.string({message: 'Title is required, and must have atleast 1 character'}).min(1).max(255),
    description: z.string({message: 'Description is required'}).min(1)
});