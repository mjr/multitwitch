import * as React from 'react'

import { useRouter } from 'next/router'

function capitalize(s) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function Streams() {
  const router = useRouter()
  const [streams, setStreams] = React.useState([])

  React.useEffect(() => {
    if (!router.query.streams) return
    setStreams(router.query.streams)
  }, [router.query.streams])

  const rowsSize = Math.round(Math.sqrt(streams.length))
  const colsSize = Math.ceil(Math.sqrt(streams.length))

  return (
    <main className="flex items-center h-screen">
      <div className="max-w-7xl mx-auto w-full sm:px-6 lg:px-8">
        {router.isReady && !router.query.streams ? (
          <>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Adicione na URL
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Por exemplo: /gaules/casimito/
            </p>
          </>
        ) : (
          <div
            className={`grid grid-rows-${rowsSize} grid-cols-${colsSize} gap-2`}
          >
            {streams.map(stream => (
              <div key={stream} className="aspect-w-16 aspect-h-9">
                <iframe
                  id={`idEmbed${capitalize(stream)}`}
                  src={`https://player.twitch.tv/?muted=true&channel=${stream}&parent=mtwitch.vercel.app`}
                  allowFullScreen={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
