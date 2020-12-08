//variables
filter[1].style.background='white';
filter[1].style.color="black";
let list=document.querySelector(".list");
let add=document.querySelector(".add");
let value=document.querySelector("#todo");
let filter=document.querySelectorAll(".filter span");

//funtions
createItem=()=>{
    let itemContainer=document.createElement('li');
    itemContainer.classList.add('itemContainer');
    let item=document.createElement("div");
    item.innerText=value.value;
    item.classList.add("listItem");
    itemContainer.appendChild(item);

    let mark=document.createElement("button");
    mark.innerHTML=`<i class="fa fa-check-square"></i>`;
    mark.classList.add('mark');
    itemContainer.appendChild(mark);

    let del=document.createElement("button");
    del.innerHTML=`<i class="fa fa-minus-square"></i>`;
    del.classList.add('delete');
    itemContainer.appendChild(del);

    value.value=null;
    return itemContainer;
}

addItem=(e)=>{
    e.preventDefault();
    list.appendChild(createItem());
}

modifyItem=(e)=>{
    let item=e.target.parentElement.parentElement;
    //marking
    if(e.target.classList[1]==='fa-check-square')
        item.firstChild.classList.toggle('marked');
    //deleting
    if(e.target.classList[1]==='fa-minus-square'){
        item.classList.add('fall');
        item.addEventListener('transitionend',()=>{
            item.remove();
        })
    }
}

applyFilter=(e)=>{
    let list=document.querySelectorAll('.itemContainer');
    list.forEach(i => {
        i.classList.remove('remove');
    });
    filter.forEach(i => {
        i.style.background='black';
        i.style.color='white';
    });
    e.target.style.background='white';
    e.target.style.color="black";
    if(e.target.innerHTML==='Incomplete'){
        let x=document.querySelectorAll('.marked');
        x.forEach(i=>{
            i.parentElement.classList.add('remove');
        })
    }
    else if(e.target.innerHTML==='Completed'){
        let x=[];
        console.log(list);
        list.forEach(i=>{
            if(!i.firstChild.classList.contains('marked'))
                x.push(i);
        })
        x.forEach(i=>{
            i.classList.add('remove');
        })
    }
}

//event listeners
add.addEventListener("click",addItem);
list.addEventListener("click",modifyItem);
filter.forEach(i => {
    i.addEventListener("click",applyFilter);
});