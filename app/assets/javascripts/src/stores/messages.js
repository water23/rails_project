// import _ from 'lodash'
import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
// import UserStore from '../stores/user'

// const messages = {
//   2: {
//     user: {
//       profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
//       id: 2,
//       name: 'Ryan Clark',
//       status: 'online',
//     },
//     lastAccess: {
//       recipient: 1424469794050,
//       currentUser: 1424469794080,
//     },
//     messages: [
//       {
//         contents: 'Hey!',
//         from: 2,
//         timestamp: 1424469793023,
//       },
//       {
//         contents: 'Hey, what\'s up?',
//         from: 1,
//         timestamp: 1424469794000,
//       },
//     ],
//   },
//   3: {
//     user: {
//       read: true,
//       profilePicture: 'https://avatars3.githubusercontent.com/u/2955483?v=3&s=460',
//       name: 'Jilles Soeters',
//       id: 3,
//       status: 'online',
//     },
//     lastAccess: {
//       recipient: 1424352522000,
//       currentUser: 1424352522080,
//     },
//     messages: [
//       {
//         contents: 'Want a game of ping pong?',
//         from: 3,
//         timestamp: 1424352522000,
//       },
//     ],
//   },
//   4: {
//     user: {
//       name: 'Todd Motto',
//       id: 4,
//       profilePicture: 'https://avatars1.githubusercontent.com/u/1655968?v=3&s=460',
//       status: 'online',
//     },
//     lastAccess: {
//       recipient: 1424423579000,
//       currentUser: 1424423574000,
//     },
//     messages: [
//       {
//         contents: 'Please follow me on twitter I\'ll pay you',
//         timestamp: 1424423579000,
//         from: 4,
//       },
//     ],
//   },
// }

// var openChatID = parseInt(Object.keys(messages)[0], 10)

class MessageStore extends BaseStore {
  getOpenChatUserID() {
    var openChatID = parseInt(Object.keys(this.getMessage())[0], 10)
    return openChatID
  }

  getChatByUserID(id) {
    return this.getMessage()[id]
  }

  // getAllChats() {
  //   return messages
  // }

  getMessage() {
    if (!this.get('message')) this.set('message', [])
    return this.get('message')
  }

  setMessage(array) {
    // _.merge(this.getMessage(), obj)
    this.set('message', array)
  }
}

const MessagesStore = new MessageStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const actions = {
    // updateOpenChatID(payload) {
    //   var openChatID = payload.action.userID
    //   messages[openChatID].lastAccess.currentUser = +new Date()

    //   MessagesStore.emitChange()
    // },
    // sendMessage(payload) {
    //   const messages = MessagesStore.getMessage()
    //   messages.push({
    //     id: Math.floor( Math.random() * 1000000 ),
    //     message: payload.action.message,
    //   })
      // const userID = payload.action.userID
      // messages[userID].messages.push({
      //   contents: payload.action.message,
      //   timestamp: payload.action.timestamp,
      //   from: UserStore.user.id,
      // })
      // messages[userID].lastAccess.currentUser = +new Date()
    //   MessagesStore.emitChange()
    // },
    LOAD_MESSAGE(payload) {
      MessagesStore.setMessage(payload.action.json)
      MessagesStore.emitChange()
    },
    SAVE_MESSAGE(payload) {
      const messages = MessagesStore.getMessage()
      messages.push({
        id: Math.floor(Math.random() * 1000000),
        message: payload.action.message,
      })
      MessagesStore.setMessage(messages)
      MessagesStore.emitChange()
    },
  }

  actions[payload.action.type] && actions[payload.action.type](payload)
})

window.MessagesStore = MessagesStore
export default MessagesStore
