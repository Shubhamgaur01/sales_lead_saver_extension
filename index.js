// let myLeads=`["www.awesomeleads.com"]`
// // 1 turning myLeads string into array
// myLeads=JSON.parse(myLeads)
// //2 push a new value to array
// myLeads.push("www.leads.com")
// // 3 turn the array into string again
// myLeads=JSON.stringify(myLeads)
// // 4 console.log the string using typeof to verify its a string
// console.log(typeof myLeads)

// just above is the practise of working with localstorage
// we just have working with localstorage because it is type of data storage
//which stores the data and even retains its inside LocalStorage when user refresh the extension

let myLeads=[]

const inputEl=document.getElementById("input_el")
const inputBtn=document.getElementById("input_btn")
const ulEl=document.getElementById("un_el")
const deleteBtn=document.getElementById("delete_btn")
const tabBtn=document.getElementById("save_tab")




tabBtn.addEventListener("click",function(){
	//using the chrome API to get the link of current tab 
	chrome.tabs.query({active:true,currentWindow:true},function(tabs){
		console.log(tabs[0].url)
		myLeads.push(tabs[0].url)
		localStorage.setItem("myLeadsKey",JSON.stringify(myLeads))
		renderLeads(myLeads)

	})
})



let leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeadsKey"))
if(leadsFromLocalStorage){
	myLeads=leadsFromLocalStorage
	renderLeads(myLeads)
}


function renderLeads(leads){
	let listItems=""
	for(let i=0;i<leads.length;i++){
		// listItems+="<li><a target='_blank' href='"+ myLeads[i] +"'>"+ myLeads[i]+ "</a></li>"			//good method 3
		// the above line is much more confusing because of lots of double and single commas we can solve it using template strings
		// the belw line is much more comforting than the oboce one
		listItems+=`
		<li>
			<a target='_blank' href="${leads[i]}""> 
				${leads[i]}
			</a>
		</li>
		`

		// ulEl.innerHTML+= "<li>" +myLeads[i]+ "</li>"		//method1
		// another method below but a difficult ones
		// const li=document.createElement("li")			//method2 
		// li.textContent=myLeads[i]
		// ulEl.append(li)
	}
	ulEl.innerHTML=listItems
}




deleteBtn.addEventListener("dblclick",function(){
	console.log("doubled clicked")
	localStorage.clear()
	myLeads=[]
	renderLeads(myLeads)
})



inputBtn.addEventListener("click", function(){
	myLeads.push(inputEl.value)
	inputEl.value=""
	localStorage.setItem("myLeadsKey", JSON.stringify(myLeads))
	renderLeads(myLeads)
	// console.log(localStorage.getItem("myLeadsKey"))
})



