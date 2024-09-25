'use client'

import axios from 'axios';
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from "react-hook-form";

import {Button, TextField} from '@radix-ui/themes'
import {HiMiniMagnifyingGlass} from "react-icons/hi2";
import SimpleMDE from "react-simplemde-editor";
import {useRouter} from "next/navigation";

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const {register, handleSubmit, control} = useForm<IssueForm>();
    const router = useRouter();

    const submitData = async (data) => {
       await  axios.post('/api/issues', data)
            .then((response) => {
                console.log('Data submitted successfully.',response);
                router.push('/issues');
            }).catch((error) => {
                console.log(error)
        })
    }

    return (
        <form
            onSubmit={handleSubmit((data) => submitData(data))}
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
                size={"3"}
                className="hover:cursor-pointer"
            >
                Submit New Issue
            </Button>
        </form>
    );
};

export default NewIssuePage;