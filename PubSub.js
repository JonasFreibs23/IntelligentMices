/**
 * [PubSub Publish/subscribe class for decoupling simulation events and GUI updates]
 */
class PubSub {

    /**
     * [constructor Initializes a dictionnary of keys : subscribers and values : their callback function]
     */
    constructor() {
      this.subscriptions = {}
    }

    /**
     * [subscribe Subscription to a topic]
     * @param  {String} topic      [The event's topic]
     * @param  {Function} callbackFn [The action to realize in a publish case]
     */
    subscribe(topic, callbackFn){
      this.subscriptions[topic] = callbackFn
    }

    /**
     * [publish Calls the action from all the subscribers subscribed to the specified topic]
     * @param  {String} topic [The event's topic]
     * @param  {Unspecified} data  [The data to pass to the action]
     */
    publish(topic, data){
      for(let subcribedTopic in this.subscriptions){
        if(topic === subcribedTopic)
          this.subscriptions[subcribedTopic](data)
      }
    }
}
