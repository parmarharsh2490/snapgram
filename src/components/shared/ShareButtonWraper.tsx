import React from 'react'
import { FaCopy, FaShareAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import ShareButtons from "./ShareButtons";
const ShareButtonWraper = ({postId} : {postId : string}) => {
  return (
    <AlertDialog >
    <AlertDialogTrigger><FaShareAlt /></AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogDescription className="flex items-center gap-4">
          Share this post link to others
          <AlertDialogCancel className="h-full"><MdCancel className=" w-6 h-6"/></AlertDialogCancel>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter> 
        <ShareButtons description={'hi'} url={`http://localhost:5173/posts/${postId}`} title={'Hey check out this amazing post'} />
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default ShareButtonWraper