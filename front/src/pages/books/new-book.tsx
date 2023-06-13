import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const newBook = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();
  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    // APIを叩く
    try{
      await axios.post("http://localhost:3000/api/v1/books", {
      title: title,
      body: body,
    });
      router.push("/books");
    } catch (err) {
    alert("失敗しました")
    }
  };
  return (
    <>
      <div>
        <h1>新規登録</h1>
        <form onSubmit={handleSubmit}>
          <div className="">
            <label>Title：</label>
            <input type="text" 
              onChange={(e: ChangeEvent<HTMLInputElement>) => 
                setTitle(e.target.value)
              }
            />
          </div>
          <div className="">
            <label >本文：</label>
            <textarea 
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => 
              setBody(e.target.value)
            }
            />
          </div>
          <div className="">
            <button type="submit">投稿</button>
          </div>
        </form>
      </div>
    
    </>
  );
}

export default newBook;
