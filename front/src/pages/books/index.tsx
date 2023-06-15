import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


type Props = {
  books: Book[];
};
export async function getStaticProps() {
  const res = await axios.get("http://back:3000/api/v1/books");
  const books = res.data;
  //console.log(res)
 // console.log(books)
  return {
    props:{
      books,
    },
    revalidate: 60,
  };
}

export default function Index(props: Props) {
  const router = useRouter();
  console.log(props)
  const BookDelete = async (bookId:string) => {
    alert("削除しますか？")
    try{
      await axios.delete(`http://localhost:3000/api/v1/books/${bookId}`)
      router.reload();
    }catch{
      alert("削除できませんでした");
    }
    }
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
          
          {props.books.map((book:Book)=> {
            return (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.body}</td>
                <td><Link href={`books/${book.id}`}>詳細</Link></td>
                <td><Link href={`books/edit/${book.id}`}>edit</Link></td>
                <td><button onClick={() => BookDelete(book.id)}>削除</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
        <Link href={'books/new-book'}>新規登録する</Link>
    </>
  )
}