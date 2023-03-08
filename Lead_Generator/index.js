let my_leads = []

const inputValue =document.getElementById("input-el")
const listEl = document.getElementById("list-el")

const inputBtn = document.getElementById("input-btn")
const addTabBtn = document.getElementById("add-tab-btn")
const clearAllBtn = document.getElementById("clear-all-btn")

let leadsFromLocal = JSON.parse(localStorage.getItem("my_leads"))
if (leadsFromLocal){
    my_leads = leadsFromLocal
    render(my_leads)
}
function render(my_leads){
    let lists = ""
    for (let i=0; i<my_leads.length; i++){
        lists += `<li>
                    <a target="_blank" href="${my_leads[i]}">${my_leads[i]}</a>
                </li>`
    listEl.innerHTML = lists
}
}
inputBtn.addEventListener("click", function(){
    if(inputValue.value.length > 5){
        my_leads.push(inputValue.value)
        inputValue.value = ""
        localStorage.setItem("my_leads", JSON.stringify(my_leads))
        render(my_leads)
    }
    else{
        inputValue.value = ""
        alert("Your link is not valid!")
    }
})

addTabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let link = tabs[0].url
        my_leads.push(link)
        localStorage.setItem("my_leads", JSON.stringify(my_leads))
        render(my_leads)
    })
})

clearAllBtn.addEventListener("click", function(){
    let ask = prompt("Are you sure want to clear all Leads? (yes/no)")
    if (ask === "yes" || ask === "Yes" || ask === "YES"){
        localStorage.clear()
        my_leads = []
        render(my_leads)
        window.location.reload()
    }
})