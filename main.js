function searchBtn(){
  
    const inputValue = document.getElementById('input-value').value;
    //   console.log(inputValue);
    const url=`https://openlibrary.org/search.json?q=${inputValue}`;
    fetch(url)
    .then (res => res.json())
     .then (data => display(data.docs))
    
    // console.log(data.docs.numFound);
}
function display(data){
    // Number of book
    console.log(data);
    //  console.log(data.cover_i);

     const countBook = document.getElementById('count-book');
     const div =document.createElement('div');
     div.innerHTML =`
    <h3 class="m-3 ">Number Of Result is: ${data.length}</h3>
     `;
     countBook.appendChild(div);

    //  about book
    const displayFild = document.getElementById('display-fild');

    for(const user of data)
   {
    // console.log(user);

    const div =document.createElement('div');
    div.classList.add('col-4');
    div.innerHTML =`
    <div  class="card m-2 p-3" >   
    <img  src="https://covers.openlibrary.org/b/id/${user.cover_i}-M.jpg" alt="Card image cap" width="300" height="400">
  <div class="card-body">
    <h3> ${user.title}</h3>    
    <p class='text-danger'> ${user.author_name}</p>   
    <p>Publisher: ${user.publisher}</p>
    <p>first publish: ${user.first_publish_year}</p>   
</div>
    `;
    displayFild.appendChild(div);
   }

   

   
}