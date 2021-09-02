//spinner
const showSpiner= displayStyle =>
{
    document.getElementById('spiner').style.display=displayStyle;  
}
//clean in the time of new search
const togolSearchResult= (displayStyle) =>
{ 
        document.getElementById('count-book').style.display=displayStyle;        
}
const errorResult= (displayStyle) =>
{ 
        document.getElementById('error').style.display=displayStyle;        
}
//load data
function searchBtn(){ 
    const inputText = document.getElementById('input-value');
    showSpiner('block');
    togolSearchResult('none');
    errorResult('none');
 //clear display in the time of new search
    const display = document.getElementById('display-fild');
    display.textContent='';

   const inputValue=inputText.value;
   inputText.value='';
   if(inputValue==='')
   {
    errorMsg();
   } 
   else{
    const url=`https://openlibrary.org/search.json?q=${inputValue}`;
    fetch(url)
    .then (res => res.json())
     .then (data => NumberOfBook(data))
   }
      
}

// count number of result found
const NumberOfBook =number=>
{
    showSpiner('none'); 
    
    const countBook = document.getElementById('count-book');
    countBook.textContent='';
    const div =document.createElement('div');
    div.innerHTML =`
   <p class="m-3 ">Number of Result Found: <span class="text-primary">${number.numFound}</span> Books </p>
   <p class="m-3 "> Showing Result of: <span class="text-primary">${number.docs.length} </span> Books</p>
    `;
    countBook.appendChild(div);
    togolSearchResult('block');   
    displayBookList(number.docs);    
}

// show Book list
const displayBookList = bookInfo=>
{    
     showSpiner('none');
    if(bookInfo.length===0)
    {
        errorMsg();              
    }
    else{      
        const displayFild = document.getElementById('display-fild');
        displayFild.textContent='';              
        bookInfo.forEach(user=> {
        const div =document.createElement('div');
        div.classList.add('col-lg-4');       
        div.innerHTML =`       
         <div  class="card m-2    " >   
       <img  src="https://covers.openlibrary.org/b/id/${user.cover_i}-M.jpg" alt="Card image cap" height="350">
     <div class="card-body">
       <h3> ${user.title}</h3>    
       <p class='text-danger'> ${user.author_name}</p>   
       <p>Publisher: ${user.publisher}</p>
       <p>First Publish: ${user.first_publish_year}</p>   
   </div>
        `;
        displayFild.appendChild(div);
        });        
        showSpiner('none');       
    }  
}

//show error msg
const errorMsg=()=>
{
    errorResult('block'); 
    const displayFild = document.getElementById('error');
        displayFild.textContent='';        
        const div =document.createElement('div');        
        div.innerHTML =`
         <p class="text-danger ml-5"> <b>Please Input a Book Name</b> </p>
        `;
        displayFild.appendChild(div);
        showSpiner('none');
        const display = document.getElementById('display-fild');
        display.textContent=''; 
        
}

