// Personal
const ably = new Ably.Realtime('BK-x-Q.xD_6DA:sf6kT_w5v13W99KZMx8WFkepoZ-Ho5RcPA0__YDwFzc');

// Unity 5
// var ably = new Ably.Realtime('0cEZ1Q.S0oWpQ:9T9K8HUX7Sk5FF07Yj0cagRKhzmATCWa1Ynl9EwLaEg');

function getSessionChannel() {
    const session = window.zatsuite.store.state.session;
    if (session) {
        return ably.channels.get(session.slug);
    }
    return null;
}

/*
function clone(object) {
    return JSON.parse(JSON.stringify(object));
}
*/

export class Publish {
    static join() {
        console.log('Publish.join');
        const channel = getSessionChannel();
        if (channel) {
            const user = window.zatsuite.store.getters.user;
            console.log(channel.name, user);
            channel.publish('join', user);
        }
    }
    static leave() {
        console.log('Publish.leave');
        const channel = getSessionChannel();
        if (channel) {
            const user = window.zatsuite.store.getters.user;
            console.log(channel.name, user);
            channel.publish('leave', user);
            channel.detach();
        }
    }
    static welcome(user) {
        console.log('Publish.welcome');
        const channel = getSessionChannel();
        if (channel) {
            const session = window.zatsuite.store.state.session;
            const user = window.zatsuite.store.getters.user;
            console.log(channel.name, user);
            channel.publish('welcome', { user: user, state: session.state });
        }
    }
    static pick() {
        console.log('Publish.pick');
        const channel = getSessionChannel();
        if (channel) {
            const user = window.zatsuite.store.getters.user;
            console.log(channel.name, user);
            channel.publish('pick', user);
        }
    }
    static reveal() {
        console.log('Publish.reveal');
        const channel = getSessionChannel();
        if (channel) {
            channel.publish('reveal', '');
        }
    }
    static reset() {
        console.log('Publish.reset');
        const channel = getSessionChannel();
        if (channel) {
            channel.publish('reset', '');
        }
    }
}

export class Subscribe {
    static session() {
        const channel = getSessionChannel();
        if (channel) {

            channel.subscribe('join', function(message) {
                console.log('Subscribe.join');
                console.log(message.data);
                const user = window.zatsuite.store.getters.user;
                Publish.welcome(user);
            });

            channel.subscribe('leave', function(message) {
                console.log('Subscribe.leave');
                console.log(message.data);
                window.zatsuite.store.commit('remove', message.data);
            });

            channel.subscribe('welcome', function(message) {
                console.log('Subscribe.welcome');
                console.log(message.data);
                window.zatsuite.store.commit('upsert', message.data.user);
                console.log(message.data.state);
                window.zatsuite.store.commit('session', message.data.state);
            });

            channel.subscribe('pick', function(message) {
                console.log('Subscribe.pick');
                console.log(message.data);
                window.zatsuite.store.commit('pick', message.data);
            });

            channel.subscribe('reveal', function(message) {
                console.log('Subscribe.reveal');
                window.zatsuite.store.commit('reveal', message.data);
            });

            channel.subscribe('reset', function(message) {
                console.log('Subscribe.reset');
                window.zatsuite.store.commit('reset');
            });
        }
    }
    /*
    static join() {
        console.log('Subscribe.join');
        const channel = getSessionChannel();
        if (channel) {
            channel.subscribe('join', function(message) {
                console.log(message.data);
            });
        }
    }
    static leave() {
        const channel = getSessionChannel();
        if (channel) {
            channel.subscribe('leave', function(message) {
                console.log(message.data);
            });
        }
    }
    static welcome() {
        console.log('Subscribe.join');
        const channel = getSessionChannel();
        if (channel) {
            channel.subscribe('welcome', function(message) {
                console.log(message.data);
            });
        }
    }
    static pick() {
        const channel = getSessionChannel();
        if (channel) {
            channel.subscribe('pick', function(message) {
                console.log(message.data);
            });
        }
    }
    static reveal() {
        const channel = getSessionChannel();
        if (channel) {
            channel.subscribe('reveal', function(message) {
                console.log(message.data);
            });
        }
    }
    static reset() {
        const channel = getSessionChannel();
        if (channel) {
            channel.subscribe('reset', function(message) {
                console.log(message.data);
            });
        }
    }
    */
}
