const valInput = document.getElementById('input');
const add = document.getElementById("add");
const updata = document.getElementById("updata");
const tablebody = document.getElementById('tablebody');
const searchInput = document.getElementById("searchInput");


var jobs = [];
var finishedArr = [];
if (localStorage.getItem("all jobs") == null) {
    jobs = [];
  } else {
    jobs = JSON.parse(localStorage.getItem("all jobs"));
    displayJobs();
  }


  function addJob() {
    let jobTo = valInput.value;
    if (jobTo != '') {
    jobs.push(jobTo);
    localStorage.setItem("all jobs", JSON.stringify(jobs));
    displayJobs();
    clearInputs();
    }
  }


  function displayJobs() {
    view = "";
    for (var i = 0; i < jobs.length; i++) {
      view += `<tr>
                      <td onclick='updatetable(${i})'>${jobs[i]}</td>
                      <td><button onclick='finish(${i})' class="btn btn-primary"><i class="fa-solid fa-check"></i></button></td>
                      <td><button onclick='deleteJob(${i})' class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button></td>
                  </tr>
          `;
    }
    document.getElementById("tablebody").innerHTML = view;
  }

  function clearInputs() {
    valInput.value = "";
  }

  function deleteJob(i) {
    jobs.splice(i,1)
    localStorage.setItem("all jobs", JSON.stringify(jobs));
    displayJobs();
  }


  function updatetable(i) {
    valInput.value = jobs[i]
    add.classList.add("d-none")
    updata.classList.remove("d-none")
    updata.setAttribute("onclick",`upadate(${i})`)
  }


  function upadate(i) {
    jobs[i] = valInput.value
    if (jobs[i] != '') {
    localStorage.setItem("all jobs" , JSON.stringify(jobs))
    updata.classList.add("d-none")
    add.classList.remove("d-none")
    displayJobs()
    clearInputs()
    }
  }

  function searchJob(value) {
    let view = ""
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].toLowerCase().includes(value.toLowerCase())) {
        view += `<tr>
                    <td onclick='updatetable(${i})'>${jobs[i]}</td>
                    <td><button onclick='finish(${i})' class="btn btn-primary"><i class="fa-solid fa-check"></i></button></td>
                    <td><button onclick='deleteJob(${i})' class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button></td>
                </tr>
      `;
      }
      
    }
    document.getElementById("tablebody").innerHTML = view
  }




  if (localStorage.getItem("all finished") == null) {
    finishedArr = [];
  } else {
    finishedArr = JSON.parse(localStorage.getItem("all finished"));
    displayFinished();
  }



  function finish(i) {
    var finished = jobs.splice(i,1)[0]
    finishedArr.push(finished)
    localStorage.setItem("all jobs", JSON.stringify(jobs));
    localStorage.setItem("all finished", JSON.stringify(finishedArr));
    displayJobs();
    displayFinished();
  }

  function displayFinished() {
    let cartona2 = "";
    for (var i = 0; i < finishedArr.length; i++) {
      cartona2 += `
      <li>${finishedArr[i]}</li>
          `;
    }
    document.getElementById("done").innerHTML = cartona2;
  }
