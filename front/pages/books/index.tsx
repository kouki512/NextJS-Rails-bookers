import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect } from 'react';

type props = {
  books: {
    map(arg0: (book: books) => import("react").JSX.Element): import("react").ReactNode;
    id: number;
    title: string;
    body: string;
  }
}
type books = {
  id: number;
  title: string;
  body: string;
}
export async function getStaticProps() {
  const res = await axios.get("http://back:3000/api/v1/books");
  const books = res.data;
  //console.log(res)
 // console.log(books)
  return {
    props:{
      books,
    }
  };
}

export default function Index(props: props) {
  console.log(props)
  return (
    <>
      <h1>Books</h1>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>body</th>
          </tr>
        </thead>
        <tbody>
          
          {props.books.map((book:books)=> {
            return (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.body}</td>
                <td><Link href={`books/${book.id}`}>詳細</Link></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}