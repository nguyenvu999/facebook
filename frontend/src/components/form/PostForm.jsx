import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import FileUploader from "../shared/FileUploader";
import { AuthContext } from "@/context/authContext";
import { callCreatePost } from "@/apiCall";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '@/components/shared/Loader';

const PostFormValidation = z.object({
  caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2000, { message: "Maximum 2000 characters" }),
  file: z.any().nullable(),
  isPrivate: z.boolean(),
});

const PostForm = ({ post }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(PostFormValidation),
    defaultValues: {
      caption: post ? post.caption : "",
      file: null,
      isPrivate: post ? post.isPrivate : false,
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true); // Set loading state to true
    const formData = new FormData();
    formData.append('caption', values.caption);
    formData.append('isPrivate', values.isPrivate);

    if (values.file && values.file.length > 0) {
      formData.append('file', values.file[0]);
    }

    try {
      await callCreatePost(formData, dispatch);
      navigate('/');
    } catch (error) {
      toast.error('Error creating post:', error);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add photo</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={(file) => field.onChange(file)}
                  mediaUrl={post?.imgURL || ''}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPrivate"
          render={({ field }) => (
            <FormItem className="max-w-5xl flex-start gap-2 justify-start w-full">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                {...field}
              />
              <p>Just share with friend</p>
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4">Cancel</Button>
          <Button type="submit" className="shad-button_primary whitespace-nowrap" disabled={isLoading}>
            {isLoading ? <Loader /> : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;