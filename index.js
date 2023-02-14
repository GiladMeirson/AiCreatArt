let USER = {};
let Requests = [];
let pos = [];
let procces;
let apiGenrations =
  "https://fattest-stabilityai-stable-diffusion-2-1.hf.space/run/predict";
let apistable =
  "https://antreyes-stabilityai-stable-diffusion-2.hf.space/run/predict";
let MyApiGen = "https://giladthefixer-trygene.hf.space/run/predict"; //my model
let apiGenrations2 =
  "https://devrym-prompthero-openjourney.hf.space/run/predict"; //hero
let openjuornryApi =
  "https://kitkatchoco-prompthero-openjourney.hf.space/run/predict"; //hero
let openAiApi = "https://api.openai.com/v1/images/generations"; //open ai
let AnimaApi = "https://vanessa9178-ai-generator.hf.space/run/predict"; //anima

function GetServerRespon() {
  let text = document.getElementById("comand").value;
  $("#ImgPH").fadeOut(1);
  //$("#Load").fadeIn(500);
  var obj = {
    prompt: text,
    n: 2,
    size: "512x512",
  };

  procces = setInterval(CanvasHandle, 100);

  $.ajax({
    type: "POST",
    url: apistable,
    data: JSON.stringify({
      data: [text],
    }),
    cache: false,
    contentType: "application/json",
    dataType: "json",
    success: successCB,
    error: errorCB,
  });
}
function init() {
  if (JSON.parse(localStorage.getItem("USER")) != undefined) {
    $("#Valid").fadeOut(1);
    $("#container").fadeIn(500);
    USER = JSON.parse(localStorage["USER"]);
    if (USER.Requests != undefined) {
      Requests = USER.Requests;
    }

    if (USER.isBlock) {
      let d1 = new Date(USER.timeStampRealese);
      let d2 = new Date(USER.timeStamp);
      let daysToRealese = (d1 - d2) / 86400000;
      if (daysToRealese <= 0) {
        USER.isBlock = false;
        USER.timeStamp = null;
        USER.timeStampRealese = null;
        location.reload();
      }
      document.getElementById("passs").disabled = true;
      document.getElementById("passs").style.background = "#093009";
      document.getElementById(
        "headlineValid"
      ).innerHTML = `YOU ARE BLOCKED FOR ${daysToRealese} DAYS`;
    }
  } else {
    USER = {
      try: 3,
      isBlock: false,
      timeStamp: null,
      timeStampRealese: null,
      Requests: [],
    };
    localStorage["USER"] = JSON.stringify(USER);
  }
  document.getElementById("passs").addEventListener("keypress", (e) => {
    console.log(e);
    if (e.key === "Enter") {
      if (Check()) {
        document.body.style.backgroundColor = "#000";
        $("#Valid").fadeOut(1);
        $("#container").fadeIn(500);
      } else {
        USER.try--;
        swal(
          "Incorrect password",
          `left ${USER.try} times before BLOCK!`,
          "error"
        );
        localStorage["USER"] = JSON.stringify(USER);
        if (USER.try == 0) {
          USER.isBlock = true;
          USER.timeStamp = new Date();
          USER.timeStampRealese = new Date();
          // Add five days to current date
          USER.timeStampRealese.setDate(USER.timeStamp.getDate() + 5);

          localStorage["USER"] = JSON.stringify(USER);
          location.reload();
        }
      }
    }
  });
}
function successCB(data) {
  // console.log(data);
  // console.log(data.data[0]); // img
  // console.log(data.duration)// time to get the img
  clearInterval(procces);
  $("#canWrraper").fadeOut(1);
  let text = document.getElementById("comand").value;
  let img = document.getElementById("thePH");
  let src = data.data[0];
  img.src = src;

  let obj = { command: text, imgSrc: src };
  Requests.push(obj);
  USER.Requests = Requests;
  localStorage["USER"] = JSON.stringify(USER);

  $("#Load").fadeOut(250);
  $("#ImgPH").fadeIn(1500);

  let time = Math.floor(data.duration * 100);
  time = time / 100;

  document.getElementById("time").innerHTML = `Procces time : ${time} sec`;
}

function errorCB(err) {
  let text = document.getElementById("comand").value;
  $("#ImgPH").fadeOut(1);
  $("#Load").fadeIn(500);
  $.ajax({
    type: "POST",
    url: MyApiGen,
    data: JSON.stringify({
      data: [text],
    }),
    cache: false,
    contentType: "application/json",
    dataType: "json",
    success: successCB,
    error: SecError,
  });

  console.log("once faild Trying Again !");
}
function SecError(err) {
  console.log(err);
  swal("Sorry", "There are to many request.\n please try again later.");
  $("#Load").fadeOut(250);
  //$("#ImgPH").fadeIn(1500);
  //setTimeout(() => location.reload(), 2500);
}

function handleTheStats() {
  let d = new Date();
  return handleTimeCreate(d.getHours(), d.getMinutes());
}

function handleTimeCreate(h, m) {
  let S = MathSum(parseInt(h), parseInt(m));
  h = Normailzer(h);
  m = Normailzer(m);
  return fixString(h, m, S);
}

function Normailzer(s) {
  if (s.length == 1) {
    s = "0" + s.toString();
  }
  return s;
}

function MathSum(x, y) {
  return x + y;
}

function fixString(s1, s2, s3) {
  return s1.toString() + s2.toString() + s3.toString() + GetPrefix();
}

function GetPrefix() {
  return "GiladM";
}

function GetsToken() {
  let token = document.getElementById("passs").value;
  obj = {
    token: token,
    SendTo: Send,
  };

  return obj;
}

function Send() {
  return handleTheStats();
}

function IsCorrect() {
  let data = GetsToken();
  if (data.SendTo() == data.token) {
    return true;
  } else {
    return false;
  }
}

function MangerAdmin() {
  let M = { isCorrect: IsCorrect };
  return M;
}

function Check() {
  const GM = MangerAdmin();
  return GM.isCorrect();
}

function DownloadIMG() {
  var img = document.getElementById("thePH");
  //console.log(img.src);
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(img, "canvasGenrator.png");
  } else {
    const a = document.createElement("a");
    document.body.appendChild(a);
    //console.log(img.src);
    a.href = img.src;
    a.download = "AiCreateThis.png";
    a.click();
    document.body.removeChild(a);
  }
}

function GenralError(err) {
  console.log(err);
}

function ref() {
  location.assign("./history.html");
}

function CanvasHandle() {
  const canvas = document.getElementById("can");
  canvas.width = 0.9 * innerWidth;
  canvas.height = 0.75 * innerHeight;
  $("#canWrraper").fadeIn(250);
  CreateLayer(200, 20, 14);
  CreateLayer(400, 170, 8);
  CreateLayer(600, 170, 8);
  CreateLayer(800, 170, 8);
  CreateLayer(1000, 270, 4);
  CreateLayer(1200, 345, 1);
  Connects(0, 1);
  Connects(1, 2);
  Connects(2, 3);
  Connects(3, 4);
  Connects(4, 5);
}

function CreateLayer(startX, startY, amount) {
  const canvas = document.getElementById("can");
  const ctx = canvas.getContext("2d");
  var obj = {};
  obj.amount = amount;
  obj.points = [];
  for (let i = 0; i < amount; i++) {
    let y = startY + i * 50;
    obj.points.push({ startX, y });
    ctx.arc(startX, startY + i * 50, 15, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
  }
  pos.push(obj);
}

function Connects(layer1, layer2) {
  const canvas = document.getElementById("can");
  const ctx = canvas.getContext("2d");
  pos[layer1].points.forEach((point) => {
    pos[layer2].points.forEach((endpoint) => {
      if (Math.random() > 0.85) {
        ctx.strokeStyle = "#ffdf44";
        ctx.lineWidth = 2;
      } else {
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1;
      }
      ctx.beginPath();
      ctx.moveTo(point.startX, point.y);
      ctx.lineTo(endpoint.startX, endpoint.y);
      ctx.stroke();
      ctx.closePath();
    });
  });
}
