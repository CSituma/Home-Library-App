// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI {
//display Books.//
static displayBooks () {
 const books = Store.getBooks();
 books.forEach(((book) =>
  UI.addBookToList(book)));
}


//addbooks
static addBookToList(book) {

  
const bookList = document.querySelector('#booklist');
const row = document.createElement('tr');

row.innerHTML= `<td>${book.title} </td>
               <td>${book.author}</td>
               <td>${book.isbn}</td>
              <td><i class="fa fa-trash-o"></i></td>`;

bookList.appendChild(row);

}


//deletebooks
static deleteBook(el){
 if(el.classList.contains('fa')){
   el.parentElement.parentElement.remove();
  }}
////show alert msg 
static showAlert(message, className){
const div = document. createElement('div');
div.className = `alert alert-${className}`;
div.appendChild(document.createTextNode(message));
const button = document.getElementById('button');
const form = document.getElementById('form');


form.insertBefore(div, button);


//message vanishing//

setTimeout(() => {
  document.querySelector('.alert').remove();
}, 3000);

}

//clear fields//

static clearFields() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#number').value = '';
}

}

///Events:
/* 1. Display Books */

document.addEventListener('DOMContentLoaded', UI.displayBooks);

/* 2. Add Books*/
document.querySelector("#form").addEventListener('submit',(e) => 
{
e.preventDefault();
///get form values//
const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const isbn = document.querySelector('#number').value;

  // Validate
 if(title ===''|| author===''|| isbn===''){
   UI.showAlert('Please fill in the Form', 'danger')
 }
else{ 
  //instantiate Book
  const book = new Book(title,author,isbn);

//////Adding
UI.addBookToList(book);

Store.addBook(book);

///Show Sucess Message
UI.showAlert('Added', 'success');
//Clearfields
UI.clearFields();


 }
}
);


/////3. Remove BOOK////
document.querySelector('#booklist').addEventListener('click', (e)=>{
e.preventDefault();
//deleting from UI

UI.deleteBook(e.target);
///deleting from Store
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
//Message
UI.showAlert('Book Deleted', 'danger');

}
);

///localStorage
class Store{
  static getBooks(){
    let books;
   if (localStorage.getItem('books') === null){
     books = [];
   }
   else { 
     books = JSON.parse(localStorage.getItem('books'));
   }
   return books;
  }
  
  static addBook(book){
    const books= Store.getBooks();
    books.push(book);
   localStorage.setItem('books',JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}








