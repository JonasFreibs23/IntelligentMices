class PubSub {

    constructor() {
      this.subscriptions = {}
    }

    subscribe(topic, callbackFn){
      this.subscriptions[topic] = callbackFn
    }

    publish(topic, data){
      for(let subcribedTopic in this.subscriptions){
        if(topic === subcribedTopic)
          this.subscriptions[subcribedTopic](data)
      }
    }
}
