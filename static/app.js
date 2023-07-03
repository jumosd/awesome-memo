async function deleteMemo(event) {
  let target_id = event.target.dataset["id"];
  const res = await fetch(`/memos/${target_id}`, {
    method: "DELETE",
  });

  readMemo();
}

async function editMemo(event) {
  console.log(event.target);
  let target_id = event.target.dataset["id"];

  const edit_val = document.querySelector("#memo-input").value;
  edit_val.innerText = "";
  console.log(edit_val);
  const res = await fetch(`/memos/${target_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: target_id,
      content: edit_val,
    }),
  });
  console.log(res);
  readMemo();
}

function displayMemos(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  const crebutton = document.createElement("button");
  const delbutton = document.createElement("button");
  li.innerText = `[id: ${memo.id}] ${memo.content}`;

  crebutton.dataset.id = memo.id;
  crebutton.innerText = "수정하기";
  crebutton.addEventListener("click", editMemo);

  delbutton.dataset.id = memo.id;
  delbutton.innerText = "삭제하기";
  delbutton.addEventListener("click", deleteMemo);

  ul.append(li);
  li.append(crebutton);
  li.append(delbutton);
}

// 메모 읽기
async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemos);
}

//메모만들어서 서버에 전송
async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });
  const jsonRes = await res.json();
  console.log(jsonRes);

  readMemo();
}

//제출핸들러
function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  console.log(input.value);
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();
