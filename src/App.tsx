import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [Messages, setMessages] = useState<string[]>([])

  // server
  // /{}
  // GET -> json object
  // POST -> json body -> store

  // /chat -> messages: string[]

  useEffect(() => {
    // polling
    // sse, ws

    // fetch(path: string, settings: obj) -> Promise
    const inter = setInterval(() => {
      fetch("http://213.171.15.237:8080/chat", {
        "method":"GET"
      }).then((res) => {
        return res.json()
      })
      .then((body) => {
        setMessages(body["messages"] || [])
      })
      .catch(err => {
        console.error(err)
      })
    }, 100)
    return () => clearInterval(inter)
  }, [])

  useEffect(() => {
    if (Messages.length == 0) {return}
    fetch("http://213.171.15.237:8080/chat", {
      "method":"POST",
      "headers":{
        "Content-Type":"application/json"// "plain/text", "document/html", "image/png"
      },
      "body":JSON.stringify({"messages":Messages})
    })
  }, [Messages])

  function submit(e:any) {
    e.preventDefault()
    setMessages([...Messages, e.target[0].value])
    e.target[0].value = ""
  }

  return (
    <>
      <div>
        {Messages.map(el => <p>{el}</p>)}
        <form onSubmit={submit}>
          <input type="text" />
        </form>
      </div>
    </>
  )
}

export default App
