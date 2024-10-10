'use client'

import axios from 'axios';
import "easymde/dist/easymde.min.css";
import {Controller, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
// import SimpleMDE from "react-simplemde-editor";
import {z} from "zod";
import dynamic from "next/dynamic";

import {Issue} from "@prisma/client";
import {Button, Spinner, TextField} from '@radix-ui/themes'
import {createIssueSchema} from "@/app/validationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";

const SimpleMDE = dynamic(
    () => import("react-simplemde-editor"),
    {ssr: false}
);

type IssueFormData= z.infer<typeof createIssueSchema>;

const IssueForm =  ({issue}: {issue?: Issue}) => {
    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isSubmitting}
    } = useForm<IssueFormData>({
        resolver: zodResolver(createIssueSchema)
    });

    const router = useRouter();

    const submitHandler = async (data: IssueFormData) => {
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
                handleSubmit(data => {
                        console.log(data);
                        submitHandler(data);
                    }
                )
            }
            className="max-w-xl space-y-4"
        >
            <TextField.Root
                defaultValue={issue?.title}
                {...register("title", {required: true})}
                placeholder="Title"
            />

            <ErrorMessage>
                {errors.title?.message}
            </ErrorMessage>

            <Controller
                name="description"
                control={control}
                defaultValue={issue?.description}
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
                disabled={isSubmitting}
                type="submit"
                size={"3"}
                className="hover:cursor-pointer"
            >
                {isSubmitting ? <Spinner/> : ""}
                Submit New Issue
            </Button>
        </form>
    )
};

export default IssueForm;