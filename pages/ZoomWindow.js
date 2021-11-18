import { useEffect } from "react"
export default function ZoomWindow({zoomMtg}) {

 let signature = "UVo5ZFNCejNTVXEtdGhmUGU3MVhNdy40MzI0LjE2MzcyNDk2MTkxMzEuMS5DNEgwQW41Smk4bExyQUpoUWZrYkRyK3ZhRHdlcU1lYW0zRXhHdEJ6VmNzPQ=="


    useEffect(() => {
        	ZoomMtg.init({
		      leaveUrl: "/leave",
		      webEndpoint: "",
		      disableCORP: !window.crossOriginIsolated, // default true
		      // disablePreview: false, // default false
		      success: function () {
		        console.log(meetingConfig);
		        console.log("signature", signature);
		        ZoomMtg.i18n.load(meetingConfig.lang);
		        ZoomMtg.i18n.reload(meetingConfig.lang);
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
        console.log("loaded")
    }, [zoomMtg])

    return (

        <div className="zoom-window"></div>
    )

}