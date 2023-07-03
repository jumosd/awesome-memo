from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

#리퀘스트 바디로 들어온 객체의 형식을 지정해줌
class Memo(BaseModel):
    id : str 
    content : str

memos =[]

app = FastAPI() 

@app.get('/memos')
def read_memo():
    return memos

@app.post("/memos")
def create_memo(memo:Memo):
    memos.append(memo)
    print(memos)
    return "메모추가 성공했습니다."

@app.put('/memos/{memo_id}')
def edit_memo(req_memo:Memo):
    for m in memos:
        if m.id == req_memo.id:
            m.content = req_memo.content
            return "성공했습니다."
    return "그런 메모 없습니다."

@app.delete('/memos/{memo_id}')
def deletememo(memo_id):
    # 열거형 인덱스를 뽑기위해선  enumerate함수로 감싸주어야한다
    for index,memo in enumerate(memos):
        if memo.id == memo_id:
            memos.pop(index)


app.mount("/", StaticFiles(directory='static', html=True), name = 'static')