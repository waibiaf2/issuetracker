'use client'

import axios from 'axios';
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from "react-hook-form";
import {useRouter} from "next/navigation";

import {Button, TextField} from '@radix-ui/themes'
import {HiMiniMagnifyingGlass} from "react-icons/hi2";
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

    return (
        <form
            onSubmit = {
                handleSubmit( async (data) => {
                    try {
                        await axios.post('/api/issues', data)
                        router.push('/issues');
                    } catch (err) {
                        console.log(err);
                    }
                })
            }
            className="max-w-xl space-y-4"
        >
            <TextField.Root {...register("title", {required: true})} >
                <TextField.Slot>
                    <HiMiniMagnifyingGlass/>
                </TextField.Slot>
            </TextField.Root>
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
    );
};

export default NewIssuePage;