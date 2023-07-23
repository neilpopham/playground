const Channel = require('./channel.js');

module.exports = class ChannelManager {
  constructor (name) {
    this.channels = new Map();
  }

  channel (name) {
    if (false === this.channels.has(name)) {
      this.channels.set(name, new Channel(name));
    }
    return this.channels.get(name);
  }

  delete (name) {
    return this.channels.delete(name);
  }

  unsubscribe (member) {
    this.channels.forEach((channel) => {
      // console.log(channel);
      channel.unsubscribe(member);
    });
    // for (const channel of this.channels) {
    //   console.log(channel);
    //   console.log(channel)
    //   //if (channel.members.has(member)) {
    //     channel.unsubscribe(member);
    //   //}
    // }
  }

  subs (member) {
    const subs = {};
    this.channels.forEach((channel) => {
      subs[channel.name] = channel.subs(member); 
    });
    return subs;
  }
}; 
