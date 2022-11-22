
const draggable_list=document.getElementById("draggable-list");
const check_button=document.getElementById("check");

const top10countries=["Russia","Canada","China","USA","Brazil","Australia","India","Argentina","Kazakhstan","Algeria"];

//Store Listitems
const listItems=[];

let startIndex;

createlist();

//Insert List items into DOM
function createlist(){
    [...top10countries]
    .map(a=> ({value: a,sort: Math.random()}))
    .sort((a,b)=> a.sort-b.sort)
    .map(a=> a.value)
    .forEach((country, index) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `
          <span class="number">${index + 1}</span>
          <div class="draggable" draggable="true">
            <p class="country-name">${country}</p>
          </div>
        `;
        listItems.push(listItem);
        draggable_list.appendChild(listItem);
      });

      addEventListeners();
}

function dragStart(){
    startIndex= +this.closest('li').getAttribute('data-index');
}
function dragOver(e){
    //To prevent default action does not allow to place over other
    e.preventDefault();
}
function dragDrop(){
    const endIndex= +this.getAttribute('data-index');
    swap(startIndex,endIndex);
    this.classList.remove('over');

}
function dragEnter(){
    this.classList.add('over');
}
function dragLeave(){
    this.classList.remove('over');
}

function swap(si,ei){
    const one=listItems[si].querySelector(".draggable");
    const two=listItems[ei].querySelector(".draggable");

    listItems[si].appendChild(two);
    listItems[ei].appendChild(one);
}

function addEventListeners(){
    const draggables=document.querySelectorAll(".draggable");
    const dragListItem=document.querySelectorAll(".draggable-list li");

    for(var i=0;i<draggables.length;i++){
        draggables[i].addEventListener('dragstart',dragStart);
    }
    
    for(var i=0;i<dragListItem.length;i++){
        dragListItem[i].addEventListener('dragover',dragOver);
        dragListItem[i].addEventListener('drop',dragDrop);
        dragListItem[i].addEventListener('dragenter',dragEnter);
        dragListItem[i].addEventListener('dragleave',dragLeave);
    }
}

check.addEventListener('click',checkOrder);

function checkOrder(){
    for(var i=0;i<top10countries.length;i++){
        const countryName=listItems[i].querySelector(".draggable").textContent.trim();
        if(countryName!=top10countries[i]){
            listItems[i].classList.add('wrong');
        }
        else{
            listItems[i].classList.remove('wrong');
            listItems[i].classList.add('right');
        }
    }
}
