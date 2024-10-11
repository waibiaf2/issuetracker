'use client'

import axios from 'axios';
import {Controller, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
// import SimpleMDE from "react-simplemde-editor";
import {z} from "zod";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";

import {Issue} from "@prisma/client";
import {Button, Spinner, TextField} from '@radix-ui/themes'
import {issueSchema} from "@/app/validationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";


const SimpleMDE = dynamic(
    () => import("react-simplemde-editor"),
    {ssr: false}
);

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({issue}: { issue?: Issue }) => {

    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isSubmitting}
    } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    })

    const router = useRouter();

    const submitHandler =
        async (data: IssueFormData) => {
            try {
                if (issue) {
                    await axios.patch('/api/issues/' + issue.id, data);
                    console.log("Successfully updated issue");
                }else {
                    await axios.post('/api/issues', data);
                    console.log("Successfully created new issue");
                }

                router.push('/issues');
                router.refresh();
            } catch (e) {
                console.log(e);
            }
        }

    return (
        <form
            onSubmit={
                handleSubmit(data => {
                        console.log(data);
                        submitHandler(data).then(r => console.log(r));
                    }
                )
            }
            className="max-w-xl space-y-4"
        >
            <TextField.Root
                defaultValue={ issue?.title }
                { ...register("title", {required: true}) }
                placeholder="Title"
            />

            <ErrorMessage>
                { errors.title?.message }
            </ErrorMessage>

            <Controller
                name="description"
                control={ control }
                defaultValue={ issue?.description }
                render={ ({field}) =>
                    <SimpleMDE
                        placeholder="Description"
                        { ...field }
                    />
                }
            />
            <ErrorMessage>
                { errors.description?.message }
            </ErrorMessage>
            <Button
                disabled={ isSubmitting }
                type="submit"
                size={ "3" }
                className="hover:cursor-pointer"
            >
                { isSubmitting ? <Spinner/> : "" }
                {issue ? "Update Issue" : "Create Issue"}
            </Button>
        </form>
    )
};

export default IssueForm;