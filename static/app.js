async function editMemo(memo) {
  const edit_val = document.querySelector("#memo-input").value;
  console.log(edit_val);
  edit_val.innerText = "";
  document.querySelector(`button[data-id='${memo.id}']`);

  await fetch("/memos", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      content: edit_val,
    }),
  });
}

function displayMemos(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  const crebutton = document.createElement("button");
  li.innerText = `[id: ${memo.id}] ${memo.content}`;

  crebutton.dataset.id = memo.id;
  crebutton.innerText = "수정하기";

  ul.append(li);
  li.append(crebutton);
  let button = document.querySelector(`button[data-id='${memo.id}']`);
  button.addEventListener("click", editMemo);
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
