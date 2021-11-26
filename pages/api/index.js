import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

function generateSignature(
    apiKey,
    apiSecret,
    meetingNumber,
    role
) {
    // Prevent time sync issue between client signature generation and zoom
    const timestamp = Date.now() - 30000
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
        'base64'
    )
    const hash = crypto
        .createHmac('sha256', apiSecret)
        .update(msg)
        .digest('base64')
    const signature = Buffer.from(
        `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
    ).toString('base64')

    return signature
}

const handler = (req, res) => {
    if (req.method === 'GET') {
        const { meetingNumber, role } = req.query

        if (typeof meetingNumber !== 'string' || typeof role !== 'string')
            return res
                .status(400)
                .send('Please add meetingNumber and role in your query')
        console.log(process.env.API_KEY)
        const signature = generateSignature(
            "QZ9dSBz3SUq-thfPe71XMw",
            "m9l4FqPgrsg9bw3Le1MeLyecmPPOrCnTjjvR",
            meetingNumber,
            role
        )
        return res.status(200).json({signature: signature})
    }

    return res.status(400).send(`${req.method} Bad request`)
}

export default handler