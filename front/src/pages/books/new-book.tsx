import {useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
const newBook = () => {
  const router = useRouter();
  const { register, handleSubmit , formState: { errors } } = useForm<BookForm>();
  const onSubmit: SubmitHandler<BookForm> = async (data) => {
    console.log(data);
    // APIを叩く
    try {
      await axios.post("http://localhost:3000/api/v1/books", {
        title: data.title,
        body: data.body,
      });
      router.push("/books");
    } catch (err) {
      alert("失敗しました");
    }
  };

  return (
    <>
      <div>
        <h1>新規登録</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <label>Title：</label>
            <input
              {...register("title", {
                maxLength: 20,
                required: true,
              })}
            />
            <div className="errors">
              {errors.title && <span style={{color:"red"}}>文字は20文字以内で作成してください！</span>}
            </div>
          </div>
          <div className="">
            <label>本文：</label>
            <textarea
              {...register("body", { maxLength: 60, required: true })}
            />
            <div className="errors">
            {errors.body && <span style={{color:"red"}}>文字は60文字以内で作成してください！</span>}
            </div>
          </div>
          <div className="">
            <button type="submit">投稿</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default newBook;
function register(
  arg0: string
): import("react").JSX.IntrinsicAttributes &
  import("react").ClassAttributes<HTMLInputElement> &
  import("react").InputHTMLAttributes<HTMLInputElement> {
  throw new Error("Function not implemented.");
}
