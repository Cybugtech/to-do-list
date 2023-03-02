let user_input = document.querySelector(".user_input")
let search_btn = document.querySelector(".search_btn")
let render_container = document.querySelector(".result_box")
let date = new Date();
let data_arr =  []
let is_update = false
let updated_index

window.addEventListener("load",()=>{
    data_arr = JSON.parse(localStorage.getItem("data"))
    data_arr == null?data_arr= []:
    set_data()
})


search_btn.addEventListener("click", () => {

    if(is_update){
      data_arr[updated_index] = user_input.value
      is_update = false
      localStorage.setItem("data",JSON.stringify(data_arr))
    }
    else{
        data_arr.push(user_input.value)
    }
    localStorage.setItem("data",JSON.stringify(data_arr))
    set_data()
})



set_data = () => {

   let result_box =  document.querySelectorAll(".result")
   result_box.forEach((current)=>{
      current.remove()
   })
    
    data_arr.forEach((current,index)=>{

   

    let html = `
    <div class="result">
        <div class="content">
            <h3 >${current} </h3>
        </div>
        <div class="date">
            <h3>${date.getDate()}${"-"}${date.getMonth()}${"-"}${date.getFullYear()}</h3>
        </div>
        <div class="icon">
            <div class="edit" onclick="edit(${index})">
                <i class="fa-solid fa-pen-to-square"></i>
            </div>
            <div class="delete" onclick="delete_item(${index})">
                <i class="fa-solid fa-trash"></i>
            </div>
        </div>
    </div>`

    render_container.insertAdjacentHTML("afterend",html)


})
}

edit=(get_index)=>{
    updated_index = get_index
    is_update = true
    
}
delete_item=(get_index)=>{
    data_arr.splice(get_index,1)
    localStorage.setItem("data",JSON.stringify(data_arr))
    set_data()
}