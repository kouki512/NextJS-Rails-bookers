import Link from "next/link";
import { Book } from "../types";

type Props = {
  book: Book[];
}
export const getStaticProps = async (context: { params: { id: string; }; }) => {
  const id = context.params.id;
  const res = await fetch(`http://back:3000/api/v1/books/${id}`)
  const book = await res.json()

  return {
    props: {
      book,
    }
  }
}

export const getStaticPaths = async () => {
  const res = await fetch('http://back:3000/api/v1/books')
  const books = await res.json()
  const paths = books.map((book: { id: number; }) => ({
    params: {id: book.id.toString()}
  }))
  return {
    paths,
    fallback: false
  }
}

export default function Book(props:Props){
  return (
    <>
      <div className="book-show-container">
        <div className="book-contents">
          <div className="book-content">
            <p>Title:{props.book.title}</p>
            <p>Body:{props.book.body}</p>
            <p><Link href="/books">戻る</Link></p>
          </div>
        </div>
      </div>

    </>
  )
}