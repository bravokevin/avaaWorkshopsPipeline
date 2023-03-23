// Compiled using avaa_workshops_pipeline 1.0.0 (TypeScript 4.6.2)
"use strict";
//taken from  https://www.labnol.org/code/zoom-meetings-200628
const ZOOM_API_KEY = "OWY3qI3gSbWPgxIyyjxn_A";
const ZOOM_API_SECRET = "1BOJ9agAAmYVMsYr3eEFpbrCLdEEXlvHFdwZ";
const ZOOM_EMAIL = 'programa.proexcelencia@gmail.com';



const getZoomAccessToken = () => {
    const encode = (text) => Utilities.base64Encode(text).replace(/=+$/, '');

    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = encode(JSON.stringify(header));

    const payload = {
        iss: ZOOM_API_KEY,
        exp: Date.now() + 360000,
    };
    const encodedPayload = encode(JSON.stringify(payload));
    const toSign = `${encodedHeader}.${encodedPayload}`;
    const signature = encode(Utilities.computeHmacSha256Signature(toSign, ZOOM_API_SECRET));
    console.log(`${toSign}.${signature}`)
    return `${toSign}.${signature}`;
};
const getZoomUserId = () => {
    const request = UrlFetchApp.fetch('https://api.zoom.us/v2/users/', {
        method: 'get',
        contentType: 'application/json',
        headers: { Authorization: `Bearer ${getZoomAccessToken()}` },
    });
    const { users } = JSON.parse(request.getContentText());
    const [{ id } = {}] = users.filter(({ email }) => email === ZOOM_EMAIL);
    return id;
};
const createZoomMeeting = (name, startTime) => {
    const meetingOptions = {
        topic: name,
        type: 2,
        start_time: startTime,
        duration: 120,
        timezone: 'America/Caracas',
        default_password: true,
        settings: {
            auto_recording: 'none',
            mute_upon_entry: true,
            participant_video: false,
            waiting_room: true,
            breakout_room: {
              enable: true
            },
            
        },
    };
    const request = UrlFetchApp.fetch(`https://api.zoom.us/v2/users/${getZoomUserId()}/meetings`, {
        method: 'post',
        contentType: 'application/json',
        headers: { Authorization: `Bearer ${getZoomAccessToken()}` },
        payload: JSON.stringify(meetingOptions),
    });
    const { join_url, id, password } = JSON.parse(request.getContentText());
    return [join_url, id, password];
};
