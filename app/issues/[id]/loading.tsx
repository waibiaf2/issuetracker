import React from 'react';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {Box, Card, Flex} from "@radix-ui/themes";

const LoadingIssueDetailsPage = () => {
     return (
         <Box className="space-y-4">
             <Skeleton className="max-w-xl" />
             <Flex gap={"3"} my={"2"}>
                 <Skeleton width="5rem"/>
                 <Skeleton width="8rem"/>
             </Flex>
             <Card className="prose" mt="4">
                <Skeleton count={5}/>
             </Card>
         </Box>
     );
};

export default LoadingIssueDetailsPage;