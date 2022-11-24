import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = ({ servers }: any) => {
  return (
    <div className="p-2 md:p-5 lg:px-6 2xl:px-80">
      <Head>
        <title>The Furry Fediverse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <p className="text-4xl text-gray-200 place-self-center">The Furry Fediverse</p>
      <br />
      <div className="flex flex-col space-y-4">
        <div className="bg-gray-200 text-slate-800 rounded-md p-3">
          <p className="text-2xl">What is the Furry Fediverse?</p>
          <p>
            We are a collection of furry instances on the Fediverse, which is just a fancy way of saying
            we are a bunch of servers that federate together allowing furries to join the wider Fediverse.
            To ease the confusion, Fediverse just means a collection of servers that all communicate with 
            each other. Matodon, Pleroma, Pixelfed, and more are all software that speak Activity Pub which 
            is the protocol the Fediverse runs on.
          </p>
          <p>
            There is no ownership of the wider Fediverse, just instances. All instances are operated by 
            real people and not faceless companies(or at least the ones listed on this site). Which means 
            you are moderated by other real furries and server costs are managed by your instance admins. 
            Or if you are nerdy enough, you can host your own and federate with the rest of us!
          </p>
        </div>
        <div className="bg-gray-200 text-slate-800 rounded-md p-3">
          <p className="text-2xl">Getting Started</p>
          <p>
            Joining is really simple and easy, just pick a server from below to get started. Or if you are 
            nerdy like stated before setup your own server... but I still think it is best to start out on 
            an existing instance first. You will be able to move easily with all your followers if you want.
          </p>
          <p>
            <strong>Note:</strong> You may feel like you should join a LARGE instance, but you should keep in 
            mind the larger the instance, the most costly it is on your instance owner. Also it doens&apos;t matter 
            what instance you are on, as you can follow and people can follow you no matter which instance you 
            join. We are all interconnected!
          </p>
        </div>
        <div className="bg-gray-200 text-slate-800 rounded-md p-3">
          <p className="text-2xl">Tools To Get You Going!</p>
          <p className="font-bold py-4">Find Your Friends on the Fediverse</p>
          <div className="px-2 space-x-2">
            <a href="https://fedifinder-backup.glitch.me" className="bg-sky-600 p-3 text-slate-200 rounded-md hover:bg-sky-500" target="_blank" rel="noreferrer"><i className="fa-brands fa-twitter"></i><i className="fa-solid fa-arrow-right"></i> <i className="fa-brands fa-mastodon"></i> Fedifinder</a>
            <a href="https://twitodon.com" className="bg-sky-600 p-3 text-slate-200 rounded-md hover:bg-sky-500" target="_blank" rel="noreferrer"><i className="fa-brands fa-twitter"></i><i className="fa-solid fa-arrow-right"></i> <i className="fa-brands fa-mastodon"></i> Twitodon</a>
          </div>
          <p className="font-bold py-4">Recomended Apps</p>
          <div className="px-2 space-x-2">
            <a href="https://apps.apple.com/us/app/toot/id1229021451" className="bg-sky-600 p-3 text-slate-200 rounded-md hover:bg-sky-500" target="_blank" rel="noreferrer"><i className="fa-brands fa-apple"></i> Toot! (Paid)</a>
            <a href="https://apps.apple.com/us/app/metatext/id1523996615?mt=8" className="bg-sky-600 p-3 text-slate-200 rounded-md hover:bg-sky-500" target="_blank" rel="noreferrer"><i className="fa-brands fa-apple"></i> Metatext</a>
            <a href="https://play.google.com/store/apps/details?id=app.fedilab.android" className="bg-sky-600 p-3 text-slate-200 rounded-md hover:bg-sky-500" target="_blank" rel="noreferrer"><i className="fa-brands fa-android"></i> Fedilab (Paid)</a>
            <a href="https://tusky.app" className="bg-sky-600 p-3 text-slate-200 rounded-md hover:bg-sky-500" target="_blank" rel="noreferrer"><i className="fa-brands fa-android"></i> Tusky</a>
          </div>
          <br />
        </div>
        <div className="bg-gray-200 text-slate-800 rounded-md p-3">
          <p className="text-2xl">Instances</p>
          <p className="italic text-sm">To Opt-In To Being Displayed Here, please fill out <a href="/add-instance" target="_blank" rel="noreferrer nofollow" className="underline">This Form</a></p>
          <br />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {servers?.map((data: { title: any; thumbnail: any; description: any; registrations: any; approval_required: any; uri: any; user_count: any }) => 
              <div className="bg-slate-600 text-zinc-200 p-1 flex flex-col rounded-md border-4 border-solid border-slate-600 space-y-2">
              <div><picture><img src={data.thumbnail} className="max-h-52 w-full object-cover rounded-md" height="630" alt={data.title}/></picture></div>
              <div className="flex flex-col justify-between space-y-4 h-full">
                <div className="flex flex-col space-y-2">
                  <p className="font-bold text-2xl mx-4">{data.title}</p>
                  <p className="mx-4">{(data.description.replace(/(<([^>]+)>)/gi, ""))}</p>
                </div>
                <div className="flex flex-col">
                  <p className="mx-4 py-1 text-lg italic"><i className="fa-solid fa-key"></i> {(data.registrations) ? 'Registrations Open' : 'Registrations Closed' } {(data.approval_required) ? 'With Approval Required' : ''}</p>
                  <p className="mx-4 py-1 text-lg"><i className="fa-solid fa-users"></i> {(data.user_count)}</p>
                  <a href={'https://'+data.uri} className="p-3 mt-3 bg-sky-500 text-gray-100 rounded-md font-bold" target="_blank" rel="noreferrer">Visit Instance</a>
                </div>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('https://furryfediverse-worker.hack13.workers.dev/')
  const servers = await res.json()

  // Build the array from the list of servers
  let buildup = []
  for (let i of servers) {
    let serverQuery = await fetch(`https://furryfediverse-worker.hack13.workers.dev/instance/${i}`)
    let serverData = await serverQuery.json()
    buildup.push({
      "title": serverData.title,
      "thumbnail": serverData.thumbnail,
      "description": serverData.description,
      "registrations": serverData.registrations,
      "approval_required": serverData.approval_required,
      "user_count": serverData.stats.user_count,
      "uri": serverData.uri
    })
  }

  // Pass data to the page via props
  return {
    props: {
      servers: buildup,
    }
  }
}

export default Home