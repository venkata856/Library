const myLibrary = [];

const addButton=document.querySelector(".addBook");
const form =document.querySelector(".form");
const cancelButton = document.querySelector(".cancel")
const submitButton = document.querySelector(".submit")
const library = document.querySelector(".library");
const readButtons1=document.querySelectorAll(".readtype");
const notReadButtons1=document.querySelectorAll(".notread");


function Book(bookId,bookName,author,numberOfPages,read) {
    this.bookId=bookId;
  this.bookName=bookName;
  this.author=author;
  this.numberOfPages=numberOfPages;
  this.read=Boolean(read);
  return this;
}

function addBookToLibrary(myLibrary,book) {
  
    myLibrary.push(book);
}


function disableCardButtons(){

    const readButtons=document.querySelectorAll(".readtype");
    const notReadButtons=document.querySelectorAll(".notread");
    const removeButtons=document.querySelectorAll(".remove");

    if(readButtons){

        readButtons.forEach((readButton)=>{

            readButton.disabled = true;

        })
        
    }

    if(notReadButtons){

        notReadButtons.forEach((notReadButton)=>{

            notReadButton.disabled = true;

        })
    }

    if(removeButtons){

        removeButtons.forEach((removeButton)=>{

            removeButton.disabled = true;

        })
    }


}

function enableCardButtons(){

    const readButtons=document.querySelectorAll(".readtype");
    const notReadButtons=document.querySelectorAll(".notread");
    const removeButtons=document.querySelectorAll(".remove");
    if(readButtons){

        readButtons.forEach((readButton)=>{

            readButton.disabled = false;

        })
        
        
    }

    if(notReadButtons){

        
        notReadButtons.forEach((notReadButton)=>{

            notReadButton.disabled = false;

        })

    }

    if(removeButtons){

        removeButtons.forEach((removeButton)=>{

            removeButton.disabled = false;

        })
    }

}


addButton.addEventListener("click",()=>{

    addButton.classList.add("inactive");
    form.classList.remove("inactive")
    disableCardButtons();
 
})

cancelButton.addEventListener("click",()=>{

    addButton.classList.remove("inactive");
    form.classList.add("inactive");
    enableCardButtons();



})

submitButton.addEventListener("click",(e)=>{

    e.preventDefault()

    var child = library.lastElementChild; 
        while (child) {
            library.removeChild(child);
            child = library.lastElementChild;
        }
    let bookId =generateGuuid();
    let bookName=document.getElementById("name").value;
    let bookAuthor=document.getElementById("author").value;
    let bookPages=document.getElementById("pages").value;
    let readvalue=document.getElementById("read-box").checked;
    console.log(bookId,bookName,bookAuthor,bookPages,readvalue);
    let bookInLib= new Book(bookId,bookName,bookAuthor,bookPages,readvalue)

    addBookToLibrary(myLibrary,bookInLib);
    form.reset();
    addButton.classList.remove("inactive");
    form.classList.add("inactive")
    displayBooks(myLibrary);
    enableCardButtons();

    
})

const displayBooks=(mylibrary)=>{


    if(mylibrary.length>0){

        mylibrary.forEach((val,index)=>{
            // console.log(index,val);

            let readvalClass=val.read?"readtype":"notread";

            let readValUpdate=val.read?"Read":"Not Read";

            let bookval="bookno";
            let bookValIndex="bookno"+val.bookId.substring(val.bookId.length-12,val.bookId.length);
            let divElm=document.createElement("div");
            divElm.classList.add(bookval,bookValIndex);
            divElm.innerHTML=`
            <div class='libbookname'><p>${val.bookName}</p></div>\
            <div class='libbookauthor'><p>${val.author}</p></div>\
            <div class='libbookpages'><p>${val.numberOfPages}</p></div>`;
            // <div class='libbookread'><button class='${readvalClass}'>${val.read}</button></div>\
            // <div class='removebutton'><button class='remove'>Remove</button></div>`


            library.appendChild(divElm);

            let divElm1=document.createElement("div");
            divElm1.classList.add("libbookread")
            const divButton1=document.createElement("button");
            divButton1.classList.add(`${readvalClass}`);
            divButton1.innerHTML=readValUpdate
            divElm1.appendChild(divButton1);

            divButton1.addEventListener("click",updateRead)

            divElm.appendChild(divElm1);

            let divElm2=document.createElement("div");
            divElm2.classList.add("removebutton")
            const divButton2=document.createElement("button");
            divButton2.classList.add("remove");
            divButton2.innerHTML="Remove"

            divElm2.appendChild(divButton2);

            divButton2.onclick=deleteItem;

            divElm.appendChild(divElm2);

            // <p class="hidden">${val.bookId}<p>


        })

        // removeButtons1=document.querySelectorAll(".remove");
    }

    
    
   
  
}



    // removeButtons1.forEach(removeButton1=>{

    //     console.log(removeButton1)
    //     removeButton1.addEventListener("click",deleteItem(removeButton1))
    // })


const deleteItem=function(e){

                // console.log(e.target)
            const parents=e.target.parentElement.parentElement.classList;
            const classIndex=parents[parents.length-1];

            let valIndex=classIndex.substring(6,classIndex.length-1);

            console.log(valIndex);


            let valIndexx=myLibrary.findIndex((elm)=>elm.bookId.substring(elm.bookId.length-12,elm.bookId.length-1)===valIndex);

            console.log(valIndexx);
            

                myLibrary.splice(parseInt(valIndexx),1)
                console.log(myLibrary)

                var child = library.lastElementChild; 
            while (child) {
                library.removeChild(child);
            child = library.lastElementChild;
            }
                displayBooks(myLibrary);
    

}




const updateRead=(e)=>{


                    // console.log(e.target)
                    const parents=e.target.parentElement.parentElement.classList;
                    const classIndex=parents[parents.length-1];
        
                    let valIndex=classIndex.substring(6,classIndex.length-1);
        
                    console.log(valIndex);
        
        
                    let valIndexx=myLibrary.findIndex((elm)=>elm.bookId.substring(elm.bookId.length-12,elm.bookId.length-1)===valIndex);
        
                    console.log(valIndexx);

                        myLibrary[valIndexx].read= !myLibrary[valIndexx].read;
                        console.log(myLibrary)
        
                        var child = library.lastElementChild; 
                    while (child) {
                        library.removeChild(child);
                    child = library.lastElementChild;
                    }
                        displayBooks(myLibrary);

}



function generateGuuid(){

    let u = Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16);
    return [u.substr(0,8), u.substr(8,4), '4000-8' + u.substr(13,3), u.substr(16,12)].join('-');

}




    
    








