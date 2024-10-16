import React from 'react';
import {Skeleton} from "@/app/components";
import {Box} from "@radix-ui/themes";

const IssueFormSkeleton = () => {
    return (
        <Box className='max-w-xl space-y-4'>
            <Skeleton height="2rem"/>
            <Skeleton height="35rem"/>
            <Skeleton width="30%" height="3rem"/>
        </Box>
    );
};

export default IssueFormSkeleton;