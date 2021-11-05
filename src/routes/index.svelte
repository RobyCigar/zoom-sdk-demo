<script>
	import { onMount } from "svelte";
	import { testTool } from "./_helper.js";

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


	onMount(() => {
		setTimeout(() => {
			document.querySelector("#zmmtg-root").remove()
		}, 1000)
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
		          
				  joinUrl = "/meeting?" + testTool.serialize(meetingConfig);
		          console.log("joinurl", joinUrl);
				  window.open(joinUrl, '_blank').focus();
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
                    <!-- <div class="form-group">
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
                    </div> -->


                </form>
            </div>
            <!--/.navbar-collapse -->
        </div>
    </nav>
    <div class="container">
    	<button class="btn btn-primary" on:click={handleJoin}>JOIN</button>
    </div>
 
<div class="container mt-4">
	<h1>Meeting Config</h1>
	<p> Display name: {display_name}</p>
	<p> Meet number: {meeting_number}</p>
	<p> Pass: {meeting_pwd}</p>
	<p> Lang: {meeting_lang}</p>
	<p> Is Admin? {meeting_role}</p> 
	<p> Email: {meeting_email}</p>
	<p> Is China? {meeting_china}</p>
</div>