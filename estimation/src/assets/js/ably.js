const ably = new Ably.Realtime('BK-x-Q.xD_6DA:sf6kT_w5v13W99KZMx8WFkepoZ-Ho5RcPA0__YDwFzc');

function getSessionChannel() {
    const session = { slug: 'test' }; // localStorage.getItem('session');
    if (session) {
        return ably.channels.get(session.slug);
    }
    return null;
}

function clone(object) {
    return JSON.parse(JSON.stringify(object));
}

export class Publish {
    static join(store) {
        console.log('Publish.join');
        const channel = getSessionChannel();
        if (channel) {
            const user = window.store.getters.user;
            console.log(channel.name, user);
            channel.publish('join', user);
        }
    }
    static leave() {
        console.log('Publish.welcome');
        const channel = getSessionChannel();
        if (channel) {
            const user = window.store.getters.user;
            console.log(channel.name, user);
            channel.publish('leave', user);
        }
    }
    static welcome(user) {
        console.log('Publish.welcome');
        const channel = getSessionChannel();
        if (channel) {
            const user = window.store.getters.user;
            console.log(channel.name, user);
            channel.publish('welcome', user);
        }
    }
    static pick() {
        console.log('Publish.pick');
        const channel = getSessionChannel();
        if (channel) {
            const user = window.store.getters.user;
            console.log(channel.name, user);          
            channel.publish('pick', user);
        }
    }  
    static reveal() {
        console.log('Publish.reveal');
        const channel = getSessionChannel();
        if (channel) {
            channel.publish('reveal', 'hello');
        }
    }     
    static reset() {
        console.log('Publish.reset');
        const channel = getSessionChannel();
        if (channel) {
            channel.publish('reset', 'hello');
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
                const user = window.store.getters.user; // clone(window.store.getters.user);
                console.log(user);
                //window.store.commit('reset');
                Publish.welcome(user);
            });

            channel.subscribe('leave', function(message) {
                console.log('Subscribe.leave');
                console.log(message.data);
                window.store.commit('remove', message.data);
            });

            channel.subscribe('welcome', function(message) {
                console.log('Subscribe.welcome');
                console.log(message.data);
                window.store.commit('upsert', message.data);
            });

            channel.subscribe('pick', function(message) {
                console.log('Subscribe.pick');
                console.log(message.data);
                window.store.commit('pick', message.data);
            });

            channel.subscribe('reveal', function(message) {
                console.log('Subscribe.reveal');
                console.log(message.data);
                window.store.commit('reveal', message.data);
            });

            channel.subscribe('reset', function(message) {
                console.log('Subscribe.reset');
                console.log(message.data);
                window.store.commit('reset', message.data);
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