import axios from "axios";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
type Props = {
  book: Book;
};
export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params.id;
  const res = await fetch(`http://back:3000/api/v1/books/${id}`);
  const book = await res.json();
  return {
    props: {
      book,
    },
  };
};
export const getStaticPaths = async () => {
  const res = await fetch("http://back:3000/api/v1/books");
  const books = await res.json();
  const paths = books.map((book: { id: number }) => ({
    params: { id: book.id.toString() },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

const Edit = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookForm>({
    defaultValues: {
      title: props.book.title,
      body: props.book.body,
    },
  });
  const router = useRouter();
  const { id } = props.book;
  const onSubmit: SubmitHandler<BookForm> = async (data) => {
    console.log(data);
    // APIを叩く
    try {
      await axios.patch(`http://localhost:3000/api/v1/books/${id}`, {
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
      <h1>Edit Book</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">Title</label>
          <input
            {...register("title", {
              maxLength: 20,
              required: true,
            })}
          />
          <div className="errors">
            {errors.title && (
              <span style={{ color: "red" }}>
                文字は20文字以内で作成してください！
              </span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="">Body</label>
          <textarea
            cols={30}
            rows={10}
            {...register("body", { maxLength: 60, required: true })}
          />
          <div className="errors">
            {errors.body && (
              <span style={{ color: "red" }}>
                文字は60文字以内で作成してください！
              </span>
            )}
          </div>
        </div>
        <button type="submit">登録する</button>
      </form>
    </>
  );
};
export default Edit;
