import axios from 'axios';
import { headers, body, MeetingI } from '../_helper'

export default async function api(req, res) {
    const { method } = req;

    switch(method) {
        case "GET":
            const data = await axios.post("https://api.zoom.us/v2/users/me/meetings", body, headers).then(res => {
                console.log("res", res)

                return res.data
            }).catch(err => console.log("err", err))

            console.log(data)
            res.status(200).json({data})
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }

}