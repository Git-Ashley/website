import { getTranslations, setRequestLocale } from "next-intl/server";
import { BlurFade } from "@/components/ui/blur-fade";
import { Link } from "@/src/i18n/routing";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Suspense } from "react";
import { Placeholder } from "../../project-placeholder";

type Props = {
  params: Promise<{locale: string}>;
};

const codeBlockStyles = "border-2 border-primary-50"

export default async function Samples({ params }: Props) {
  const t = await getTranslations('roomsamples');
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Suspense fallback={<Placeholder/>}>
      <BlurFade className="[&_h4]:text-xl [&_pre]:my-1.5">
        {locale === "fr" && <div className="text-red-500 pb-4">{"Désolé, cette page n'est pas encore disponible en français."}</div>}
        <div>{t("LINE_0")}</div>
        <ul>
          <li><a href="https://github.com/Git-Ashley/room-samples/tree/master/sample-1" target="_blank">{t("TITLE_1")}</a></li>
          <li><a href="https://github.com/Git-Ashley/room-samples/tree/master/sample-2" target="_blank">{t("TITLE_2")}</a></li>
          <li><a href="https://github.com/Git-Ashley/room-samples/tree/master/sample-3" target="_blank">{t("TITLE_3")}</a></li>
          <li><a href="https://github.com/Git-Ashley/room-samples/tree/master/sample-4" target="_blank">{t("TITLE_4")}</a></li>
          <li><a href="https://github.com/Git-Ashley/room-samples/tree/master/sample-5" target="_blank">{t("TITLE_5")}</a></li>
          <li><a href="https://github.com/Git-Ashley/room-samples/tree/master/sample-6" target="_blank">{t("TITLE_6")}</a></li>
        </ul>

        <br/>
        <h4><b>{t("TITLE_1")}</b></h4>
        <p>
        <a href="https://github.com/Git-Ashley/room-samples/tree/master/sample-1">Sample 1</a> {t("LINE_1")}
        </p>
        <p>
        {t("LINE_2")}
        </p>
        <SyntaxHighlighter className={codeBlockStyles} language="javascript" style={docco}>
        {`
        chatRoom = new ClientRoom();
        chatRoom.join('/chatroom', {username: nameInput.value})
          .then(() => {
            //Socket events
            chatRoom.on('INIT', users => {
              for(let user of users)
                userList.set(user.username, user);
              renderUserList();
            });

            // etc...

            chatRoom.initialized();
          })
          .catch(err => console.log(err));`}
          </SyntaxHighlighter>
          <p>
          {t("LINE_3")} <a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#clientroomjoinurl-payload" target="_blank">ClientRoom.join</a> {t("LINE_4")} <a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#clientroominitialized" target="_blank">initialized()</a> {t("LINE_5")}
          {' '}{t("LINE_6")}
          </p>
          <SyntaxHighlighter className={codeBlockStyles} language="javascript" style={docco}>
          {`
          const server = http.createServer(app);
          Room.initialize(server, {sidCookie: SID});`}
          </SyntaxHighlighter>
          {t("LINE_7")}
          <a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#clientroominitialized" target="_blank"> Room.initialize()</a>, {t("LINE_8")}

          <SyntaxHighlighter className={codeBlockStyles} language="javascript" style={docco}>
          {`
          app.post('/chatroom', (req, res) => {
            const result = chatRoom.join({cookie: req.headers.cookie, id: req.body.username});
            res.json(result);
          });`}
          </SyntaxHighlighter>
          <p>
          {t("LINE_9")} <a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#hook-roomonjoinrequestclient-userinfo" target="_blank">permission hook</a> {t("LINE_10")} <a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#hook-roomonclientacceptedclient" target="_blank">onClientAccepted</a> {t("LINE_11")}
          </p>
          <SyntaxHighlighter className={codeBlockStyles} language="javascript" style={docco}>
          {`
          class ChatRoom extends Room {
            constructor(){
              super();
              this._users = new Map();
            }

            initClient(client){
              super.initClient(client); // Must always call super for this hook

              if(!client.id)
                this.leave(client);

              this._users.set(client.id, {username: client.id});

              this.addListener(client, 'SEND_MSG', msg => {
                this.broadcast('USER_MSG', {username: client.id, text: msg});
              });
              this.broadcast('USER_JOINED', this._users.get(client.id));
              this.emit(client, 'INIT', [...this._users.values()]); // Convert to array of user objects
            }

            onClientLeave(client){
              super.onClientLeave(client); // Must always call super for this hook

              this._users.delete(client.id);
              this.broadcast('USER_LEFT', {username: client.id});
            }
          }`}</SyntaxHighlighter>
          <p>
          {t("LINE_12")} <a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#clientroominitialized" target="_blank">ClientRoom.initialized()</a>, {t("LINE_13")} <a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#hook-roomonclientleaveclient" target="_blank">onClientLeave</a> {t("LINE_14")} <a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#clientroomleave" target="_blank">client</a> {t("and")} <a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#hook-roomonclientleaveclient" target="_blank">server</a> {t("LINE_15")}
        </p>

        <br/>
        <br/>
        <h4><b>{t("TITLE_2")}</b></h4>
        <p>
        {t("LINE_16")} <Link locale={locale} href='/projects/room-pattern/samples'>Summary</Link> {t("LINE_17")} <a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#hook-roomonclientdisconnectclient" target="_blank">onClientDisconnect</a> {t("and")} <a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#hook-roomonclientreconnectclient" target="_blank">onClientReconnect</a> {t("LINE_18")} <a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#new-roomoptions" target="_blank">constructor</a>, {t("LINE_19")}
        </p>
        <SyntaxHighlighter className={codeBlockStyles} language="javascript" style={docco}>
        {`
        constructor(){
          super({reconnectTimeout: 15000});
          this._users = new Map();
        }`}
        </SyntaxHighlighter>
        <p>
        {t("LINE_20")}
        </p>
        <SyntaxHighlighter className={codeBlockStyles} language="javascript" style={docco}>
        {`
        onClientDisconnect(client){
          super.onClientDisconnect(client); // Must always call super for this hook
          const user = this._users.get(client.id);
          user.status = 'DISCONNECTED';
          this.broadcast('USER_DISCONNECTED', user);
        }

        onClientReconnect(client){
          super.onClientReconnect(client); // Must always call super for this hook
          const user = this._users.get(client.id);
          user.status = 'ONLINE';
          this.broadcast('USER_RECONNECTED', user, {exclude: new Set([client.sid])});
          this.sendInitialData(client);
        }`}
        </SyntaxHighlighter>
        <p>
        {t("LINE_21")}
        </p>
        <SyntaxHighlighter className={codeBlockStyles} language="javascript" style={docco}>
        {`
        chatRoom.on('USER_DISCONNECTED', user => {
          userList.set(user.username, user);
          newMessage(\`\${user.username} disconnected\`);
          renderUserList();
        });
        chatRoom.on('USER_RECONNECTED', user => {
          userList.set(user.username, user);
          newMessage(\`\${user.username} reconnected\`);
          renderUserList();
        });`}
        </SyntaxHighlighter>

        <br/>
        <br/>
        <h4><b>{t("TITLE_3")}</b></h4>
        <p>
        {t("LINE_22")} <a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#hook-roomonjoinrequestclient-userinfo" target="_blank">onJoinRequest</a> {t("LINE_23")}
        </p>
        <SyntaxHighlighter className={codeBlockStyles} language="javascript" style={docco}>
        {`
        onJoinRequest(userInfo){ // Do not call super for this hook
          if(!userInfo.id)
            return {success: false, reason: 'Username cannot be empty'};

          if(userInfo.id.length > 8)
            return {success: false, reason: 'Username cannot be longer than 8 characters'};

          return true; // You can also return a boolean, but if it's false, it's recommended to include a reason
        }`}
        </SyntaxHighlighter>
        <p>
        {t("LINE_24")}
        </p>

        <br/>
        <br/>
        <h4><b>{t("TITLE_4")}</b></h4>
        <p>
        {t("LINE_25")} <a href="" target="_blank">onClientAccepted</a> {t("LINE_26")}
        </p>
        <p>
        {t("LINE_27")}
        </p>
        <SyntaxHighlighter className={codeBlockStyles} language="javascript" style={docco}>
        {`
          chatRoom.on('USER_INITIALIZED', user => {
            userList.set(user.username, user);
            renderUserList();
            newMessage(\`\${user.username} initialized\`);
          });

          //etc...

          setTimeout(() => chatRoom.initialized(), 5000);
        `}
        </SyntaxHighlighter>
        <p>
        {t("LINE_28")}
        </p>
        <SyntaxHighlighter className={codeBlockStyles} language="javascript" style={docco}>
        {`
          initClient(client){
            super.initClient(client); // Must always call super for this hook

            const user = this._users.get(client.id);
            if(!user)
              return this.leave(client);

            user.status = 'ONLINE';

            this.addListener(client, 'SEND_MSG', msg => {
              this.broadcast('USER_MSG', {username: client.id, text: msg});
            });

            this.broadcast('USER_INITIALIZED', this._users.get(client.id));
            this.emit(client, 'INIT', [...this._users.values()]); // Convert to array of user objects since Map objects cannot be converted to JSON
          }

          onClientAccepted(client){
            super.onClientAccepted(client); // Always call super for this hook

            if(!client.id)
              return console.log('Cannot create client with empty id');

            const newUser = {username: client.id, status: 'INITIALIZING'};
            this._users.set(client.id, newUser);
            this.broadcast('USER_JOINED', newUser);
          }`}
        </SyntaxHighlighter>

        <br/>
        <br/>
        <h4><b>{t("TITLE_5")}</b></h4>
        <p>
        {t("LINE_29")}
        </p>
        <SyntaxHighlighter className={codeBlockStyles} language="javascript" style={docco}>
        {`
          const chatRooms = [];
          for(let i = 0; i < 4; ++i)
            chatRooms.push(new ChatRoom());

          /*
          *  API
          */
          const namesInUse = new Map();

          // Simple auth-free login just to be able to set a session name
          app.post('/login', (req, res) => {
            const username = req.body.username;
            if(!username || (namesInUse.get(username) && namesInUse.get(username) !== req.sessionID))
              return res.sendStatus(400);
            req.session.username = username;
            namesInUse.set(username, req.sessionID);
            res.sendStatus(200);
          });

          app.post('/logout', (req, res) => {
            namesInUse.delete(req.session.username);
            req.session.username = null;
            res.sendStatus(200);
          });

          //Same as before, but with a url parameter for the room we wish to join
          app.post('/chatroom/:roomId', (req, res) => {
            const roomId = req.params.roomId;
            if(!roomId)
              return res.json({success:false, reason:'Room Id not provided'});
            if(!req.session.username)
              return res.json({success: false, reason:'Username not provided'});
            if(isNaN(roomId) || (roomId < 0 || roomId > 3))
              return res.json({success: false, reason: 'Invalid Room ID'});

            const result = chatRooms[roomId].join({cookie: req.headers.cookie, id: req.session.username});
            res.json(result);
          });`}
        </SyntaxHighlighter>
        <p>
        {t("LINE_30")} <a href="https://github.com/Git-Ashley/room-samples/blob/master/sample-5/client/chat-room.js" target="_blank">chat-room.js</a>{"),"} {t("LINE_31")}
        </p>
        <SyntaxHighlighter className={codeBlockStyles} language="javascript" style={docco}>
        {`
          const chatRooms = [];
          for(let i = 0; i <= 3; ++i)
            chatRooms.push(new ChatRoom(i));`}
        </SyntaxHighlighter>
        <br/>
        <br/>
        <h4><b>{t("TITLE_6")}</b></h4>
        <p>
          {t("LINE_32")}
        </p>
      </BlurFade>
    </Suspense>
  )
}