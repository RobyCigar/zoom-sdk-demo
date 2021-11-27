 import { useState, useEffect } from "react"
 import { useRouter } from "next/router"
 import axios from 'axios'

 import s from '../styles/Home.module.css'

export default function Home() {
	// konfigurasi
	const [ meeting, setMeeting ] = useState("");
  const [ joinUrl, setJoinUrl ] = useState("")
  const [ loading, setLoading ] = useState(false);


  const createMeeting = async () => {
    setLoading(true);
    // cannot fetch zoom api from client side
    // fetch zoom api from pages/api/index.js, then consume the API here   
    const { data } = await axios.get("api").then(res => res.data ).catch(err => console.log("err", err))
    setMeeting(data)
    setJoinUrl(data.join_url)
    setLoading(false);
    console.log("meeitng has been created, ini data dari response", data)

    setTimeout(()=> {setLoading(false)}, 4000)
  }

  return (
    <>
    <div style={styles.center}>
      <div>
        <button onClick={createMeeting} style={styles.button}>Create Room</button>
      <div>
        {loading ? svg : null}
        { joinUrl && !loading ? 
        <a href={joinUrl} >
          <button style={{...styles.button, ...styles.tangerine}}>Join Here</button>
        </a>
        : null}
      </div>
    </div>
    </div>
    </>
  )
}

const svg = (
        <svg stroke="#97c2ed" className={s.spinner} viewBox="0 0 50 50">
          <circle className={s.path} cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
        </svg>)


const styles = {
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    overflow: "none"
  },
  button: {
    width: "200px",
    height: "50px",
    backgroundColor: "#00bcd4",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "block"
  },
  tangerine: {
    backgroundColor: "#F28500",
    marginTop: 40
  }
}