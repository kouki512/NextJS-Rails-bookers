interface Book {

  id:string;
  title:string;
  body:string;
  created_at: string;
  updated_at: string;
}


type BookForm = Pick<Book,"title" | "body">;