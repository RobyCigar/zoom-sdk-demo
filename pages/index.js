 import { useState, useEffect } from "react"
 import { useRouter } from "next/router"
 import axios from 'axios'


export default function Home() {
	// konfigurasi
  const [zoomMtg, setZoomMtg] = useState(null)
  const [meetingNumber, setMeetingNumber] = useState("8785200656")
  const [password, setPassword] = useState("123")
  const [role, setRole] = useState(1) // 0 untuk join, 1 untuk membuat meet
  // const [apiKey, setApiKey] = useState('QZ9dSBz3SUq-thfPe71XMw') // akun rabih
	const [apiKey, setApiKey] = useState('Q4Lah9qqT127gh5kMd_VQg') // akun lingo
  const router = useRouter();



  useEffect(() => {

  let sign = ""
	const getSignature = async () => {
		const { data: {signature }} = await axios.get(`/api?meetingNumber=${meetingNumber}&role=${role}`)
		return signature
	}

	getSignature().then(res => {
		sign = res
	}).catch(err => console.log("error", err));

	
    // mengimpor modul
   const loadZoom = async () => {
   	console.log('meeting Number', meetingNumber)
   	console.log('meeting signatiure', sign)
   	console.log('pass', password)
   	console.log('apikey', apiKey)
     if(typeof window !== "undefined"){
      const {ZoomMtg} = (await import('@zoomus/websdk'))
		  ZoomMtg.setZoomJSLib("https://source.zoom.us/2.0.1/lib", "/av"); // CDN version defaul
		  ZoomMtg.preLoadWasm();
		  ZoomMtg.prepareJssdk();
        	ZoomMtg.init({
		      leaveUrl: "/leave",
		      webEndpoint: "",
		      disableCORP: !window.crossOriginIsolated, // default true
		      // disablePreview: false, // default false
		      success: function () {
		        ZoomMtg.i18n.load("en-US");
		        ZoomMtg.i18n.reload("en-US");
		        ZoomMtg.join({
		          meetingNumber: meetingNumber,
		          userName: "Rabih",
		          signature: sign,
		          userEmail: "rabihutomo11@gmail.com", // opsional
		          passWord: password,
		          apiKey: apiKey,
		          success: function (res) {
		            console.log("join meeting success");
		            console.log("get attendeelist");
		            ZoomMtg.getAttendeeslist({});
		            ZoomMtg.getCurrentUser({
		              success: function (res) {
		                console.log("success getCurrentUser", res.result.currentUser);
		              },
		            });
		          },
		          error: function (res) {
		          	console.log("error here")
		            console.log(res);
		          },
		        });
		      },
		      error: function (res) {
		      	console.log("error here2")
		        console.log(res);
		      },
		    });

		    ZoomMtg.inMeetingServiceListener('onUserJoin', function (data) {
		      console.log('inMeetingServiceListener onUserJoin', data);
		    });
		  
		    ZoomMtg.inMeetingServiceListener('onUserLeave', function (data) {
		      console.log('inMeetingServiceListener onUserLeave', data);
		    });
		  
		    ZoomMtg.inMeetingServiceListener('onUserIsInWaitingRoom', function (data) {
		      console.log('inMeetingServiceListener onUserIsInWaitingRoom', data);
		    });
		  
		    ZoomMtg.inMeetingServiceListener('onMeetingStatus', function (data) {
		      console.log('inMeetingServiceListener onMeetingStatus', data);
		    });
      setZoomMtg(ZoomMtg)


    }
    }
    setTimeout( () => loadZoom(), 1000) 
    
    console.log("zoom meeting has already loaded")
  }, [])

  return (
    <div style={{color: "white"}}>
    </div>
  )
}
