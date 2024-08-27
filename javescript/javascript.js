let title=document.getElementById("title")
let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let ads=document.getElementById("ads")
let discount=document.getElementById("discount")
let total=document.getElementById("total")
let count=document.getElementById("count")
let category=document.getElementById("category")
let submit=document.getElementById("submit")
let mood ='create'
let tmp ; 
function getTotal(){

    if(price.value!=''){
    let result=(+price.value + +taxes.value + +ads.value)- +discount.value;
    total.innerHTML=result
    total.style.background='#040'
}else{
    total.innerHTML='';
    total.style.background='#a00d02'
}}


//create product
let datapro;
if(localStorage.product!=null){
    datapro=JSON.parse(localStorage.product)
}else{
let datapro=[];
}



submit.onclick=function(){
 
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(mood==='create'){
         if(newpro.count>1){
        for(let i=0;i<newpro.count;i++){
            datapro.push(newpro)

        }
    }else{  
          datapro.push(newpro)
    }}
    else{
        datapro[tmp]=newpro
         mood='create'
         submit.innerHTML='create'
        count.style.display='block'
}
   

    localStorage.setItem('product',JSON.stringify(datapro))
  console.log(newpro)
  cleardata()
  showData()
}
//cleardata
function cleardata(params) {
title.value=''
taxes.value=''
price.value=''
count.value=''
ads.value=''
discount.value=''
total.innerHTML=''
category.value=''

}
//readData
function showData(params) {
    getTotal()
    let table='';
    for(let i = 0;i<datapro.length;i++){
        table+=`
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick='updateData(${i})' id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`
    }
    document.getElementById('tbody').innerHTML=table;
    let deleteAll=document.getElementById('deleteAll')
    if(datapro.length>0){
        deleteAll.innerHTML=`
       <button onclick='deleteAll()'>Delete All(${datapro.length})</button>
       `
    }else{  deleteAll.innerHTML=''
}
}showData()

//delete
function deleteData(i) {
    datapro.splice(i,1)
    localStorage.product=JSON.stringify(datapro)
    showData()
}


function deleteAll(params) {
    localStorage.clear()
    datapro.splice(0)
    showData()
}

//updateData
function updateData(i) {
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    getTotal()
    count.style.display='none'
    category.value=datapro[i].category;
   submit.innerHTML='Update'
   mood='update'
    tmp=i
    scroll({
        top:0,
        behavior:"smooth"
    })
}
//search
let searchmood='title'
function getsearchmood(id) {
    let search=document.getElementById('search')
if(id=='searchTitle'){
searchmood='title'
}else{
    
    searchmood='category'
}
search.placeholder='search By '+searchmood;
search.focus()
search.value=''
showData()
}

function searchdata(value) {
    let table=''
    for(let i=0;i<datapro.length;i++){
    if(searchmood=='title'){


    if(datapro[i].title.includes(value.toLowerCase())){     
       table+=`
    <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick='updateData(${i})' id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
</tr>`
}


    }
    else{
        
            if(datapro[i].category.includes(value.toLowerCase())){     
               table+=`
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick='updateData(${i})' id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`
        }
    }}
    document.getElementById('tbody').innerHTML=table;

}





