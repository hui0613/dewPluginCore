export default class EventCodeFactory{
  private $args: any[] = []
  private $options: any
  constructor(){

  }

  public create(options: {[key: string]: any}){
    this.init(options)
    let fn;
    
  }

  private init(options: any){
    this.$options = options
    this.$args = options.args
  }
}