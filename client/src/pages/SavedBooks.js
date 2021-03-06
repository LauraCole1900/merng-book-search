/* eslint-disable no-unused-vars */
import { Navigate } from "react-router-dom";
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_BOOK, QUERY_ME } from "../utils/gql";
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {

  //=================//
  //     Queries     //
  //=================//

  const { loading, data, error } = useQuery(QUERY_ME);
  const me = data?.me || {};


  //=================//
  //    Mutations    //
  //=================//

  const [deleteBook, { bookError, bookData }] = useMutation(DELETE_BOOK);


  //=================//
  //     Methods     //
  //=================//

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    try {
      const { data } = await deleteBook({
        variables: { id: me._id, bookToDelete: bookId }
      });
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }
  };


  //==================//
  //   Conditionals   //
  //==================//

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (!Auth.loggedIn()) {
    return <Navigate to="/" />
  }

  
  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {me.savedBooks.length
            ? `Viewing ${me.savedBooks.length} saved ${me.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {me.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
