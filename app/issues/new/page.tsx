import React from 'react';
import {Button, TextArea, TextField} from '@radix-ui/themes'
import {HiMiniMagnifyingGlass} from "react-icons/hi2";
const NewIssuePage = () => {
    return (
        <div className="max-w-xl space-y-3">
           <TextField.Root>
               <TextField.Slot>
                   <HiMiniMagnifyingGlass />
               </TextField.Slot>
           </TextField.Root>
            <TextArea placeholder="Description...." />
            <Button size={"3"} className="hover:cursor-pointer">Submit New Issue</Button>
        </div>
    );
};

export default NewIssuePage;