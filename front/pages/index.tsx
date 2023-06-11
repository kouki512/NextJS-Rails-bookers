import axios from 'axios';
import Image from 'next/image'
import { useEffect } from 'react';
//import { GetStaticProps } from "next";

type props = {
  posts: {
    id: number;
    title: string;
    body: string;
  }
}
export async function getStaticProps() {
  const res = await axios.get("http://back:3000/api/v1/books");
  const posts = res.data;
  console.log(res)
  console.log(posts)
  return {
    props:{
      posts,
    }
   // revalidate: 60 * 60 * 24, // 24 hours
  };
}

export default function Home() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("http://localhost:3000/api/v1/books");
  //     const  books = await res.json()
  //     console.log(books)
  //   };
  //   fetchData();
  // }, []);
  // const res = fetch("http://localhost:3000/api/v1/books");
  // const books = await res.json();
  // console.log(res)
  return (
    <>
      <main>
        <h1>テストページ</h1>
      </main>
    
    </>
  )
}
