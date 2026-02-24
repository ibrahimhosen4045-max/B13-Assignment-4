let interViewList = [];
let rejectedList = [];
let currantStatus = "all";

const totalCount = document.getElementById("totalCount");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount")
const jobCount = document.getElementById("job-count")

const allCard = document.getElementById("all-card");
const mainContainer = document.querySelector("main");
const filterSection = document.getElementById("filter-section")


const allFilterBtn = document.getElementById("All-filter-btn")
const interviewFilterBtn = document.getElementById("interview-filter-btn")
const rejectFilterBtn = document.getElementById("rejected-filter-btn")


function calculateCount (){
    const totalJobs = allCard.children.length;

    totalCount.innerText = allCard.children.length;
    interviewCount.innerText = interViewList.length;
    rejectedCount.innerText = rejectedList.length;

    if(currantStatus == "interview-filter-btn") {
        jobCount.innerText = interViewList.length + " of " + totalJobs + " jobs";
    } else if(currantStatus == "rejected-filter-btn") {
        jobCount.innerText = rejectedList.length + " of " + totalJobs + " jobs";
    } else {
        jobCount.innerText = totalJobs + " jobs";
    }

}
calculateCount();

function toggling(id){
    allFilterBtn.classList.remove("bg-blue-500", "text-white")
    interviewFilterBtn.classList.remove("bg-blue-500", "text-white")
    rejectFilterBtn.classList.remove("bg-blue-500", "text-white")


    allFilterBtn.classList.add("bg-white", "text-black")
    interviewFilterBtn.classList.add("bg-white", "text-black")
    rejectFilterBtn.classList.add("bg-white", "text-black")

    const selected = document.getElementById(id);
    currantStatus = id;

    selected.classList.remove("bg-white", "text-black")
    selected.classList.add("bg-blue-500", "text-white")

    if(id == "interview-filter-btn"){
        allCard.classList.add("hidden")
        filterSection.classList.remove("hidden")

        renderInterview();

    } else if (id == "All-filter-btn") {
        allCard.classList.remove("hidden")
        filterSection.classList.add("hidden")

    } else if (id == "rejected-filter-btn"){
        allCard.classList.add("hidden")
        filterSection.classList.remove("hidden")
        renderrejected();

    }
}

mainContainer.addEventListener("click", function(event){
    
    if(event.target.classList.contains("interView-btn")){
    const parent = event.target.parentNode.parentNode;
    const jobName = parent.querySelector(".job-name").innerText
    const jobType = parent.querySelector(".job-type").innerText
    const apply = parent.querySelector(".apply").innerHTML
    const jobSelary = parent.querySelector(".job-selary").innerText
    const jobTitle = parent.querySelector(".job-title").innerText

    parent.querySelector(".apply").innerHTML = "INTERVIEW"

    const carInfo = {
        jobType,
        jobName, 
        apply:"INTERVIEW",
        jobSelary,
        jobTitle
    }
    
    const exist = interViewList.find(item => item.jobType == carInfo.jobType)


    if(!exist){
        interViewList.push(carInfo)
    }

    rejectedList = rejectedList.filter(item => item.jobType !== carInfo.jobType)

    calculateCount();
    if(currantStatus == "rejected-filter-btn"){
        renderrejected();
        
    }
    
    }

    else if(event.target.classList.contains("rejected-btn")){
        const parent = event.target.parentNode.parentNode;
        const jobName = parent.querySelector(".job-name").innerText
        const jobType = parent.querySelector(".job-type").innerText
        const apply = parent.querySelector(".apply").innerHTML
        const jobSelary = parent.querySelector(".job-selary").innerText
        const jobTitle = parent.querySelector(".job-title").innerText

    parent.querySelector(".apply").innerHTML = "REJECTED"

    const carInfo = {
        jobType,
        jobName, 
        apply:"REJECTED",
        jobSelary,
        jobTitle
    }
    
    const exist = rejectedList.find(item => item.jobType == carInfo.jobType)


    if(!exist){
        rejectedList.push(carInfo)
    }

    interViewList = interViewList.filter(item => item.jobType !== carInfo.jobType)

    if(currantStatus == "interview-filter-btn"){
        renderInterview();

    }

    calculateCount();
    
    }

    else if (event.target.closest(".delet-btn")){

        const parent = event.target.closest(".cards");
        const jobType = parent.querySelector(".job-type").innerText
        parent.remove();

        interViewList = interViewList.filter(item => item.jobType !== jobType)
        rejectedList = rejectedList.filter(item => item.jobType !== jobType)

        calculateCount();
    }
})

function renderInterview(){
    filterSection.innerHTML = ''

    if(interViewList.length === 0){
        document.getElementById("no-jobs").classList.remove("hidden");
        filterSection.classList.add("hidden");
        return;
    } else {
        document.getElementById("no-jobs").classList.add("hidden")
        filterSection.classList.remove("hidden")
    }

    for(let inter of interViewList){

        let div = document.createElement("div");
        div.className = 'cards flex p-6 bg-white shadow-sm justify-between rounded-lg hover:-translate-y-0.5 duration-200 hover:shadow-lg'
        div.innerHTML = `
        <div class="space-y-5">
                    <div class="space-y-3">
                        <h1 class="job-type text-2xl font-semibold">${inter.jobType}</h1>
                        <p class="job-name text-xl font-medium text-black/50">${inter.jobName}</p>
                    </div>
                    <p class="job-selary text-lg text-black/50">${inter.jobSelary}</p>
                    <div class="flex flex-col items-start space-y-3">
                        <p class="apply text-[17px] py-1.5 px-2 bg-blue-100 uppercase font-medium rounded-md">${inter.apply}</p>
                        <p class="job-title text-lg">${inter.jobTitle}</p>
                    </div>
                    <div class="space-x-3">
                        <button class="interView-btn btn btn-soft btn-success text-lg uppercase border-green-500">interview</button>
                        <button class="rejected-btn btn btn-soft btn-error text-lg border-red-400 uppercase">Rejected</button>
                    </div>
                </div>
                <div>
                    <button class="delet-btn btn rounded-full py-5.5 px-3 text-[16px]"><i class="fa-regular fa-trash-can"></i></button>
                </div>
        `
        filterSection.appendChild(div)
    }
}

function renderrejected(){
    filterSection.innerHTML = ''

    if(rejectedList.length === 0){
        document.getElementById("no-jobs").classList.remove("hidden");
        filterSection.classList.add("hidden");
        return;
    } else {
        document.getElementById("no-jobs").classList.add("hidden")
        filterSection.classList.remove("hidden")
    }

    for(let reject of rejectedList){

        let div = document.createElement("div");
        div.className = 'cards flex p-6 bg-white shadow-sm justify-between rounded-lg hover:-translate-y-0.5 duration-200 hover:shadow-lg'
        div.innerHTML = `
        <div class="space-y-5">
                    <div class="space-y-3">
                        <h1 class="job-type text-2xl font-semibold">${reject.jobType}</h1>
                        <p class="job-name text-xl font-medium text-black/50">${reject.jobName}</p>
                    </div>
                    <p class="job-selary text-lg text-black/50">${reject.jobSelary}</p>
                    <div class="flex flex-col items-start space-y-3">
                        <p class="apply text-[17px] py-1.5 px-2 bg-blue-100 uppercase font-medium rounded-md">${reject.apply}</p>
                        <p class="job-title text-lg">${reject.jobTitle}</p>
                    </div>
                    <div class="space-x-3">
                        <button class="interView-btn btn btn-soft btn-success text-lg uppercase border-green-500">interview</button>
                        <button class="rejected-btn btn btn-soft btn-error text-lg border-red-400 uppercase">Rejected</button>
                    </div>
                </div>
                <div>
                    <button class="delet-btn btn rounded-full py-5.5 px-3 text-[16px]"><i class="fa-regular fa-trash-can"></i></button>
                </div>
        `
        filterSection.appendChild(div)
    }
}
