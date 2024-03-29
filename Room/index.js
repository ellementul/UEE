import { Provider, Types } from '@ellementul/uee-core'
import buildEvent from './events/build-room.js'
import openEvent from './events/open-room.js'

const INIT = Symbol()
const BUILDED = Symbol()
const OPENED = Symbol()

class Room {
  constructor({ provider } = {}) {
    this.uuid = Types.UUID.Def().rand()
    this.provider = provider || new Provider

    this.members = new Map
    this.state = INIT
  }

  addMember(MemberConstructor) {
    if(this.state !== INIT)
      throw new Error("The room is builded already! You cannot add new members now.")

    const member = new MemberConstructor
    this.members.set(member.uuid, member)
  }

  build(config) {
    if(this.state === BUILDED)
      throw new Error("The room is builded already!")
    else
      this.state = BUILDED

    for (const [_, member] of this.members) {
      member.setProvider(this.provider)
    }
    this.provider.sendEvent({
      ...buildEvent.create(),
      config
  })
  }

  open(config) {
    if(this.state !== BUILDED)
      throw new Error("The room isn't builded yet! Run 'build' method on room.")

    if(this.state === OPENED)
      console.warn("Repeat opening room!")

    this.provider.sendEvent({ 
      ...openEvent.create(),
      uuid: this.uuid,
      config
    })
  }
}
const events = { buildEvent, openEvent }
Room.events = events
export { Room, events }