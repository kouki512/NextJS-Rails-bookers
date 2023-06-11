class Api::V1::BooksController < ApplicationController
  def index
    @books = Book.all
    render json: @books , status: :created
  end

  def show
    @book = Book.find(params[:id])
    render json: @book ,status: :created
  end
  def create
    @book = Book.new(book_params)
    if @book.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def update
    @book = Book.find(params[:id])
    if @book.update(book_params)
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end
  def destroy
    @book = Book.find(params[:id])
    @book.destroy
    render json: {status: :created, data:@book}
  end

  private
   def book_params
      params.require(:book).permit(:title, :body)
   end
end
