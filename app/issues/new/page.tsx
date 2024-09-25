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

            {
                errors.title &&
                <Text color="red" as="p">
                    {errors.title.message}
                </Text>
            }

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

            {
                errors.description &&
                <Text color="red" as="p">
                    {errors.description.message}
                </Text>

            }

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