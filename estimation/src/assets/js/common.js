function hashCode(str) {
    return Array.from(str).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
}

export function getUuid() {
    var nav = window.navigator;
    var screen = window.screen;
    var guid = nav.mimeTypes.length;
    guid += nav.userAgent.replace(/\D+/g, '');
    guid += nav.plugins.length;
    guid += nav.productSub || '';
    guid += screen.height || '';
    guid += screen.width || '';
    guid += screen.pixelDepth || '';
    return (hashCode(guid) >>> 0).toString(26);
}

export const STATE = {
    LOBBY: 1,
    ESTIMATING: 2,
    ESTIMATED: 3,
    REVEALED: 4,
};

export const DEFAULTS = {
    SESSION : { id: 0, slug: getUuid(), state: STATE.LOBBY },
};
