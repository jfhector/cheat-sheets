class IDGenerator {
  private length: number
  private timestamp: number

  constructor() {
    this.length = 10;
    this.timestamp = +new Date();
  }

  private _getRandomInt(min: number, max: number) {
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  }

  public generate(): string {
      var ts = this.timestamp.toString();
      var parts = ts.split( "" ).reverse();
      var id = "";
      
      for( var i = 0; i < this.length; ++i ) {
         var index = this._getRandomInt( 0, parts.length - 1 );
         id += parts[index];	 
      }
      
      return id;
  }
}

export const idGenerator = new IDGenerator();