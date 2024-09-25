'use client'

import axios from 'axios';
import "easymde/dist/easymde.min.css";
import {Controller, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import SimpleMDE from "react-simplemde-editor";
import {z} from "zod";

import {Button, TextField, Text} from '@radix-ui/themes'
import {createIssueSchema} from "@/app/validationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const {register, handleSubmit, control, formState: {errors}} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const router = useRouter();

    const submitHandler = async (data: IssueForm) => {
        try {
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form
            onSubmit={
                handleSubmit((data) => submitHandler(data))
            }
            className="max-w-xl space-y-4"
        >
            <TextField.Root
                {...register("title", {required: true})}
            />
            <ErrorMessage>
                {errors.title?.message}
            </ErrorMessage>

            <Controller
                name="description"
                control={control}
                render={({field}) =>
                    <SimpleMDE
                        placeholder="Description"
                        {...field}
                    />
                }
            />
            <ErrorMessage>
                {errors.description?.message}
            </ErrorMessage>

            <Button
                type="submit"
                size={"3"}
                className="hover:cursor-pointer"
            >
                Submit New Issue
            </Button>
        </form>
    )
};

export default NewIssuePage;