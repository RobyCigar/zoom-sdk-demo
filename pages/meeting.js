// import { testTool } from './_helper';
// import { useState } from 'react'
// import { ZoomMtg } from '@zoomus/websdk';
// import { getMeetingUrl } from '../utils/join-meet'

let display_name = "Rabih"
let meeting_number = 90909;
let meeting_pwd = "pass";
let meeting_lang = "en-US"
let meeting_role = 1
let meeting_email = "robycigar"
let meeting_china = 0
let meeting_config;
let meetingConfig;
let signature;
let joinUrl;
let API_KEY = "QZ9dSBz3SUq-thfPe71XMw";
let API_SECRET = "m9l4FqPgrsg9bw3Le1MeLyecmPPOrCnTjjvR";


const Page = () => {
    // const [meetingUrl, setMeetingUrl] = useState('')

    const handleClick = async () => {
			// console.log("HEREEE")
			// meeting_config = [display_name, meeting_number, meeting_pwd, meeting_role, meeting_email, meeting_lang, meeting_china];
		      
		    //   meetingConfig = testTool.getMeetingConfig(meeting_config);
		    //   console.log("conf",meetingConfig)
		    //   if (!meetingConfig.mn || !meetingConfig.name) {
		    //     alert("Meeting number or username is empty");
		    //     return false;
		    //   }
		    //   testTool.setCookie("meeting_number", meetingConfig.mn);
		    //   testTool.setCookie("meeting_pwd", meetingConfig.pwd);
		    //   console.log("HERE2" )
		    //   signature = ZoomMtg.generateSignature({
		    //     meetingNumber: meetingConfig.mn,
		    //     apiKey: API_KEY,
		    //     apiSecret: API_SECRET,
		    //     role: meetingConfig.role,
		    //     success: async function (res) {
		    //     console.log(signature)
		    //     console.log(meetingConfig)
		    //       console.log(res.result);
		    //       meetingConfig.signature = res.result;
		    //       meetingConfig.apiKey = API_KEY;
		          
			// 	  setMeetingUrl("/meeting?" + testTool.serialize(meetingConfig))
		    //       console.log("joinurl", joinUrl);
			// 	  window.open(joinUrl, '_blank').focus();
		    //     },
		    //   });
    }

    return (
        <main>
            {/* get meeting number and role here (and password maybe) */}
            <button onClick={handleClick}>Join meeting</button>
            {/* <div>{meetingUrl && <ZoomWindow url={meetingUrl} />}</div>  */}
        </main>
    )
}

export default Page