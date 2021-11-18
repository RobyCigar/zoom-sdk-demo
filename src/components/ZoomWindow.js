import dynamic from 'next/dynamic'

const any = dynamic(
  () => import('@zoomus/websdk'),
  { ssr: false }
)


const ZoomWindow= ({ url }) => {
	console.log(any)
    return (
        <div>
            <iframe src={url} frameBorder='0'></iframe>
        </div>
    )
}

export default ZoomWindow
