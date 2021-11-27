// token JWT dari zoom
export const JWT_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlFaOWRTQnozU1VxLXRoZlBlNzFYTXciLCJleHAiOjE2Mzg1OTQwMzYsImlhdCI6MTYzNzk4OTIzNn0.FU2NgJ0haHGd3sgwFWBhS3MZ24ZgKJnTCF6sszNNIvE'

// konfigurasi meeting
export const body = {
  topic: "Belajar"
}

export const headers = {
  headers: {
    "authorization": JWT_TOKEN,
  }
}

export const MeetingI = {
    "created_at": "date",
    "duration": "number",
    "encrypted_password": "string",
    "h323_password": "string",
    "host_email": "string",
    "host_id": "string",
    "id": "number",
    "join_url": "string",
    "password": "string",
    "pre_schedule": "boolean",
    "pstn_password": "string",
    "settings": {
        "allow_multiple_devices": "boolean",
        "alternative_hosts": "",
        "alternative_hosts_email_notification": true,
        "approval_type": 2,
        "approved_or_denied_countries_or_regions": {
            "enable": false
        },
        "audio": "voip",
        "auto_recording": "none",
        "breakout_room": {
            "enable": false
        },
        "close_registration": false,
        "cn_meeting": false,
        "device_testing": false,
        "encryption_type": "enhanced_encryption",
        "enforce_login": false,
        "enforce_login_domains": "",
        "focus_mode": false,
        "host_video": false,
        "in_meeting": false,
        "jbh_time": 0,
        "join_before_host": false,
        "meeting_authentication": false,
        "mute_upon_entry": false,
        "participant_video": false,
        "registrants_confirmation_email": true,
        "registrants_email_notification": true,
        "request_permission_to_unmute_participants": false,
        "show_share_button": false,
        "use_pmi": false,
        "waiting_room": true,
        "watermark": false
    },
    "start_time": "date",
    "start_url": "string",
    "status": "waiting",
    "timezone": "string",
    "topic": "belajar",
    "type": "number",
    "uuid": "string"
}
