'use client'
import {Button, TextField} from '@radix-ui/themes'
import {HiMiniMagnifyingGlass} from "react-icons/hi2";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from "react-hook-form";

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const {register, handleSubmit, control} = useForm<IssueForm>();

    return (
        <form
            onSubmit={handleSubmit((data) => console.log(data))}
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