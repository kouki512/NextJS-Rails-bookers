import axios from 'axios';
import Image from 'next/image'
import { useEffect } from 'react';
import Link from 'next/link';
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
  return {
    props:{
      posts,
    }
  };
}

export default function Home() {
  return (
    <>
      
        <h1>ようこそ<b>Bookersへ！</b></h1>
        <p>Bookers では、さまざまな書籍に関するあなたの意見や<br>
        </br>印象を共有し交換することができます</p>
        <Link href="books/">start</Link>
    </>
  )
}
