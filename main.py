from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

#리퀘스트 바디로 들어온 객체의 형식을 지정해줌
class Memo(BaseModel):
    id : str 
    content : str

memos =[]

app = FastAPI() 


@app.post("/memos")
def create_memo(memo:Memo):
    memos.append(memo)
    print(memos)
    return "메모추가 성공했습니다."

@app.get('/memos')
def read_memo():
    return memos



app.mount("/", StaticFiles(directory='static', html=True), name = 'static')