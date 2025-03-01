import { Link } from "@/src/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BlurFade } from "@/components/ui/blur-fade";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function RoomPatternPage({ params }: Props) {
  const t = getTranslations('');
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <BlurFade className="[&_a]:underline [&_a]:text-blue-500">
      <h2 style={{textAlign: 'center'}}><b>Room pattern</b></h2>

      <p>
      {`The Room package is designed to be used whenever there are multiple clients communicating with each other via a central server. Usually there's a lot of setup involved with creating such rooms including setting up the websocket server, working out when the client is initialized and ready to receive the initial rooms state, and cleaning up resources such as event listeners, and if you want to implement more advanced functionality such as disconnect/reconnect management, then things can get messy. This room package is designed to greatly simplify all of this.`}

      <br/><br/>Client Room git repo: <a href="https://github.com/Git-Ashley/client-room" target="_blank">https://github.com/Git-Ashley/client-room</a>
      <br/>Server Room git repo: <a href="https://github.com/Git-Ashley/server-room" target="_blank">https://github.com/Git-Ashley/server-room</a>
      </p>

      <br/>
      <h3><b>Features</b></h3>
      <p>
      {`All of the features are demonstrated in the `}<Link locale={locale} href='/projects/room-pattern/samples'>samples section</Link>{`. The server side module exports a class, `}<a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#class-room" target="_blank">Room</a>{`, which is intended to be extended from, and exposes hooks, while `}<a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#client-side-module" target="_blank">the client side module</a>{` is simpler and is designed to be an interface to the corresponding room on the server. There are 6 samples which walk you through how to use the room package to build a chat-room. Sample 1 shows simple setup, and a feature-less basic chat-room. Samples 2 - 5 each demonstrate a different feature; Disconect/reconnect functionality, permissions, initialization and multiple rooms of the same type, while sample 6 demonstrates them all working together.`}
      </p>
      <p>
      {`The server side Room module stores clients by session ID, which has a natural side effect of multiple clients over different devices being able to log into the same user unless you choose to disallow it via the `} <a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#hook-roomonjoinrequestclient-userinfo" target="_blank">permission hook</a>{`.`}
      </p>
      <br/>
      <h4><b>Client Pooling</b></h4>
      <p>
      <a target="_blank" href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#class-client">Client</a>{` objects are created to represent each client session, and placed in a client pool so that each Room can share the client connection. This client pool is not exposed to code using the module. Clients are automatically removed from the pool if they are no longer in any rooms which it provides for.`}
      </p>
      <br/>
      <h4><b>Socket Handler</b></h4>
      <p>
      {`The Room pattern makes use of the SocketHandler class, with each `}<a target="_blank" href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#class-client">client</a>{` object on the server containing a SocketHandler. The SocketHandler could (and will) be its own module. It is a wrapper for the raw websocket and handles the disconnect/reconnect functionality with pings/pongs, and emits 'disconnect' upon disconnecting, in which case the client side SocketHandler goes into reconnect mode, and the SocketHandler will emit 'reconnect' upon reconnecting, with the ability the reassign the raw websocket reference to the new one. It also follows socket.io's message sending style of emitting an event with a payload. You may be wondering why I haven't just used socket.io instead, for which there are many reasons beyond the scope of this article, but among them, are its performance and size. The client-side code for the SocketHandler can be found `}<a target="_blank" href="https://github.com/Git-Ashley/client-room/blob/master/Sockets.js">here</a>{` and the server-side code `}<a target="_blank" href="https://github.com/Git-Ashley/server-room/blob/master/ClientPool/SocketHandler.js">here</a>{`. The main difference between the two is the implemention of ping/pong functionality on the server, _reconnect method on the client, as well as the clients _enqueue function which is necessary incase messages are sent while the connection is initializing. Other than that they are very similar.`}
      </p>
    </BlurFade>
  )
}