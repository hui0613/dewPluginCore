export default class EventManager{
  private $args: string[] = []
  private taps: any[] = []
  constructor(args=[]){
    this.$args = args
  }

  public tapAsync(name: string, fn: Function){
    const options = {name, fn}

    this.taps.push(options)
  }

  public callAsync(...rest: any[]){
    const cb = rest.splice(rest.length - 1)[0]
    for(const tap of this.taps){
      tap.fn(...rest, cb)
    }
  }

}