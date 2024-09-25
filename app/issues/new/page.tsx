'use client'

import axios from 'axios';
import "easymde/dist/easymde.min.css";
import {Controller, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";

import {Button, TextField} from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";

interface IssueForm {
    title: string;
    description: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

const NewIssuePage = () => {
    const {register, handleSubmit, control} = useForm<IssueForm>();
    const router = useRouter();

    const handSubmitHandler = async (data: IssueForm) => {
        try {
            await axios.post('/api/issues', data)
            router.push('/issues');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form
            onSubmit = {
                handleSubmit((data) => handSubmitHandler(data) )
            }
            className="max-w-xl space-y-4"
        >
            <TextField.Root
                {...register("title", {required: true})}
            />
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