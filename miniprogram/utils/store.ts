interface State {
  terminal: Map<string, Terminal>
  alarms: Map<string, uartAlarmObject>
}
const Stat: State = {
  terminal: new Map(),
  alarms: new Map()
}

class Mutation {
  static setTerminal(terminal: Terminal[] | Terminal) {
    if (terminal instanceof Array) {
      Stat.terminal = new Map(terminal.map(el => [el._id, el]))
    } else {
      Stat.terminal.set(terminal._id, terminal)
    }
  }
}

class Action {

}

const GetState = <T extends keyof State>(state: T, id: string) => {
  return Stat[state].get(id)!
}

export default { Stat, Mutation, Action }