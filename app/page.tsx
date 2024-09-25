import {Button} from "@radix-ui/themes";
import React from "react";
import {MdBookmarks} from "react-icons/md";

export default function Home() {
  return (
     <>
       <Button size={"4"} variant={"outline"} radius={"none"}>
         <MdBookmarks /> Bookmark
       </Button>

       <div>Hello World!</div>
     </>
  );
}
