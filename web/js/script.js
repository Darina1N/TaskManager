const btn = document.getElementById("addTask");

btn.addEventListener("click", function(){
    const name=document.getElementById("taskname").value;
    const priority=parseInt(document.getElementById("priority").value);
    const price=parseFloat(document.getElementById("price").value);

    const object={name, priority};
    if(price>0.00){
        object.price=price;
    }
    console.log(object);
})