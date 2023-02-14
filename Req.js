var USER = {};

function initReq() {
  if (JSON.parse(localStorage["USER"]) != undefined) {
    USER = JSON.parse(localStorage["USER"]);
    if (USER.Requests.length == 0) {
      //no history yet
    } else {
      Render2ConPh(USER.Requests);
    }
  }
}

function Render2ConPh(arr) {
  const PH = document.getElementById("Gph");
  let str = ``;

  arr.forEach((req) => {
    str += `<div class="cerd col-10 col-md-4 col-lg-3">`;
    str += `<div class="REQ">`;
    str += `<div class="imgwrraper">`;
    str += `<img  class="img-fluid" src="${req.imgSrc}" alt="AI CREATE THIS">`;
    str += `<div class="overlay">`;
    str += `<div class="text">COMMAND : ${req.command}</div>`;
    str += `</div></div></div></div>`;
    
  });

  PH.innerHTML=str;




//   <div class="cerd col-10 col-md-4 col-lg-3">
//   <div class="REQ">
//       <div class="imgwrraper">
//           <img class="img-fluid"
//               src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/14/yvA5SpUH-IMG-Worlds-1200x800.jpg"
//               alt="AI CREATE THIS">
//           <div class="overlay">
//               <div class="text">Hello World</div>
//           </div>
//       </div>

//   </div>
// </div>
}


