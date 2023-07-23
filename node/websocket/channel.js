const Event = require('./event.js');

module.exports = class Channel {
    constructor (name) {
        this.name = name;
        this.members = new Map();
        this.events = new Map();
    }

    subscribe (member, events = null) {
        let eventSet;
        const meta = this.members.get(member);
        if (meta === undefined) {
            eventSet = new Set();
        } else {
            eventSet = meta.events;
        }
        if (events === null) {
            eventSet.add('_everything');
        } else {
            events.forEach((name) => {
                eventSet.add(name);
            });
        }
        this.members.set(member, { events: eventSet });
    }

    unsubscribe (member, events = null) {
        if (events === null) {
            this.members.delete(member);
            return;
        }
        const meta = this.members.get(member);
        events.forEach((name) => {
             meta.events.delete(name);
        });
        if (meta.events.size == 0) {
            this.members.delete(member);
            return;
        }
        this.members.set(member, meta);
    }

    event (name) {
        if (false === this.events.has(name)) {
            this.events.set(name, new Event(name, this));
        }
        return this.events.get(name);
    }

    publish (message, event = null) {
        console.log('publish', message, event);
        [...this.members.keys()].forEach((member) => {
            const meta = this.members.get(member);
            let send = false;
            // If the member has subscribed to /channel then send regardless
            if (meta.events.has('_everything')) {
                send = true;
            // If we are publishing to /channel then send regardless
            } else if (event === null) {
                send = true;
            // If we are publishing to /channel/event and the member is subscribed
            } else if (meta.events.has(event)) {
                send = true;
            }
            // If we're sending to this member
            if (send) {
                member.send(JSON.stringify(message));
            }
        });
    }

    subs (member) {
        const meta = this.members.get(member);
        if (meta === undefined) {
            return null;
        }
        return [...meta.events.values()];
    }

    count () {
        return this.members.size;
    }
};
