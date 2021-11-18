 import { useState, useEffect } from "react"
// import ZoomWindow from "./ZoomWindow"


export default function Home() {
  const [zoomMtg, setZoomMtg] = useState(null)
  useEffect(() => {
    // mengimpor modul
   ( async () => {
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
		          meetingNumber: "54353",
		          userName: "Rabih",
		          signature: "UVo5ZFNCejNTVXEtdGhmUGU3MVhNdy40MzI0LjE2MzcyNDk2MTkxMzEuMS5DNEgwQW41Smk4bExyQUpoUWZrYkRyK3ZhRHdlcU1lYW0zRXhHdEJ6VmNzPQ==",
		          apiKey: "QZ9dSBz3SUq-thfPe71XMw",
		          userEmail: "rabihutomo@gamil.com",
		          passWord: "somepass",
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
    })()
    
    console.log("zoom meeting has already loaded")
  }, [])

  return (
    <div style={{color: "white"}}>
    </div>
  )
}
