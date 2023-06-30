//메모생성하기
function createMemo(value){

}


//제출핸들러
function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector('#memo-input');
  console.log(input.value)
  createMemo(input.value)
  input.value = "";

}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);
