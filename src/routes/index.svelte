<script>
	import { onMount } from "svelte";
	import { testTool } from "./_helper.js";
	import { goto } from "@sapper/app"

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
	let API_KEY = "QZ9dSBz3SUq-thfPe71XMw";
	let API_SECRET = "m9l4FqPgrsg9bw3Le1MeLyecmPPOrCnTjjvR";

	onMount(() => {
		setTimeout(() => {
			document.querySelector("#zmmtg-root").remove()
		}, 100)

		window.addEventListener('DOMContentLoaded', function(event) {
		  console.log('DOM fully loaded and parsed');
		  websdkready();
		});

		function websdkready() {
		  if (testTool.isMobileDevice()) {
		    vConsole = new VConsole();
		  }
		  console.log("checkSystemRequirements");
		  console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

		  // it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
		  // if (!china) ZoomMtg.setZoomJSLib('https://source.zoom.us/2.0.1/lib', '/av'); // CDN version default
		  // else ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/2.0.1/lib', '/av'); // china cdn option
		  // ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/@zoomus/websdk/dist/lib', '/av'); // Local version default, Angular Project change to use cdn version
		  // ZoomMtg.preLoadWasm(); // pre download wasm file to save time.

		  // API_KEY = "QZ9dSBz3SUq-thfPe71XMw";
		  /**
		   * NEVER PUT YOUR ACTUAL API SECRET IN CLIENT SIDE CODE, THIS IS JUST FOR QUICK PROTOTYPING
		   * The below generateSignature should be done server side as not to expose your api secret in public
		   * You can find an eaxmple in here: https://marketplace.zoom.us/docs/sdk/native-sdks/web/essential/signature
		   */
		  // API_SECRET = "m9l4FqPgrsg9bw3Le1MeLyecmPPOrCnTjjvR";

		  // some help code, remember mn, pwd, lang to cookie, and autofill.
		  meeting_number = testTool.getCookie("meeting_number");
		  meeting_pwd = testTool.getCookie("meeting_pwd");
		  
		  if (testTool.getCookie("meeting_lang"))
		    meeting_lang = testTool.getCookie("meeting_lang");

		  document
		    .getElementById("meeting_lang")
		    .addEventListener("change", function (e) {
		      testTool.setCookie(
		        "meeting_lang",
		        document.getElementById("meeting_lang").value
		      );
		      testTool.setCookie(
		        "_zm_lang",
		        document.getElementById("meeting_lang").value
		      );
		    });
		  // copy zoom invite link to mn, autofill mn and pwd.
		  document
		    .getElementById("meeting_number")
		    .addEventListener("input", function (e) {
		      var tmpMn = e.target.value.replace(/([^0-9])+/i, "");
		      if (tmpMn.match(/([0-9]{9,11})/)) {
		        tmpMn = tmpMn.match(/([0-9]{9,11})/)[1];
		      }
		      var tmpPwd = e.target.value.match(/pwd=([\d,\w]+)/);
		      if (tmpPwd) {
		        meeting_pwd = tmpPwd[1];
		        testTool.setCookie("meeting_pwd", tmpPwd[1]);
		      }
		      meeting_number = tmpMn;
		      testTool.setCookie(
		        "meeting_number",
		        meeting_number
		      );
		    });

		}
	})

	// click join meeting button
	function handleJoin() {
			console.log("HEREEE")
			meeting_config = [display_name, meeting_number, meeting_pwd, meeting_role, meeting_email, meeting_lang, meeting_china];
		      
		      meetingConfig = testTool.getMeetingConfig(meeting_config);
		      console.log("conf",meetingConfig)
		      if (!meetingConfig.mn || !meetingConfig.name) {
		        alert("Meeting number or username is empty");
		        return false;
		      }
		      testTool.setCookie("meeting_number", meetingConfig.mn);
		      testTool.setCookie("meeting_pwd", meetingConfig.pwd);
		      console.log("HERE2" )

		      signature = ZoomMtg.generateSignature({
		        meetingNumber: meetingConfig.mn,
		        apiKey: API_KEY,
		        apiSecret: API_SECRET,
		        role: meetingConfig.role,
		        success: async function (res) {
		        console.log(signature)
		        console.log(meetingConfig)
		          console.log(res.result);
		          meetingConfig.signature = res.result;
		          meetingConfig.apiKey = API_KEY;
		          var joinUrl = "/meeting?" + testTool.serialize(meetingConfig);
		          console.log("joinurl", joinUrl);
		          await goto(joinUrl);
		        },
		      });
	}

$: console.log("configg", meeting_config)
</script>

<svelte:head>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</svelte:head>

    <nav id="nav-tool" class="">
        <div class="container">
            <div>
                <h1>Zoom WebSDK</h1>
            </div>
            <div id="navbar" class="websdktest">
                <form>
                    <div class="form-group">
                        <input bind:value={display_name} type="text" maxLength="100"
                            placeholder="Name" required> 
                    </div>
                    <div class="form-group">
                        <input bind:value={meeting_number} type="text" name="meeting_number" id="meeting_number" maxLength="200"
                            style="width:150px" placeholder="Meeting Number" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <input bind:value={meeting_pwd} type="text" name="meeting_pwd" id="meeting_pwd" style="width:150px"
                            maxLength="32" placeholder="Meeting Password" class="form-control">
                    </div>
                    <div class="form-group">
                        <input bind:value={meeting_email} type="text" name="meeting_email" id="meeting_email" style="width:150px"
                            maxLength="32" placeholder="Email option" class="form-control">
                    </div>

                    <div class="form-group">
                        <select bind:value={meeting_role} id="meeting_role" class="sdk-select">
                            <option value=0>Attendee</option>
                            <option value=1>Host</option>
                            <option value=5>Assistant</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select bind:value={meeting_china} id="meeting_china" class="sdk-select">
                            <option value=0>Global</option>
                            <option value=1>China</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select bind:value={meeting_lang} id="meeting_lang" class="sdk-select">
                            <option value="en-US">English</option>
                            <option value="de-DE">German Deutsch</option>
                            <option value="es-ES">Spanish Español</option>
                            <option value="fr-FR">French Français</option>
                            <option value="jp-JP">Japanese 日本語</option>
                            <option value="pt-PT">Portuguese Portuguese</option>
                            <option value="ru-RU">Russian Русский</option>
                            <option value="zh-CN">Chinese 简体中文</option>
                            <option value="zh-TW">Chinese 繁体中文</option>
                            <option value="ko-KO">Korean 한국어</option>
                            <option value="vi-VN">Vietnamese Tiếng Việt</option>
                            <option value="it-IT">Italian italiano</option>
                        </select>
                    </div>


                </form>
            </div>
            <!--/.navbar-collapse -->
        </div>
    </nav>
    <div class="container">
    	<button class="btn btn-primary" on:click={handleJoin}>JOIN</button>
    </div>
 
<h1 style="text-align: center"> Display name: {display_name}</h1>
<h1 style="text-align: center"> Meet number: {meeting_number}</h1>
<h1 style="text-align: center"> Pass: {meeting_pwd}</h1>
<h1 style="text-align: center"> Lang: {meeting_lang}</h1>
<h1 style="text-align: center"> Is Admin? {meeting_role}</h1> 
<h1 style="text-align: center"> Email: {meeting_email}</h1>
<h1 style="text-align: center"> Is China? {meeting_china}</h1>