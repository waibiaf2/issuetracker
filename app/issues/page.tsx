import React from 'react';
import Link from "next/link";
import {Button} from "@radix-ui/themes";

const IssuesPage = () => {
    return (
        <div>
            <Button size={"4"}>
                <Link href="/issues/new">
                    New Issue
                </Link>
            </Button>
        </div>
    );
};

export default IssuesPage;