import {z} from "zod";

export const createIssueSchema = z.object({
    title:
        z.string(
            {message: 'Title is required'}
        )
            .min(1, {message: 'Title must be at least 1 character long'})
            .max(255, {message: 'Title must be at most 255 characters long'}),
    description:
        z.string(
            {message: 'Description is required'}
        ).min(1)
});