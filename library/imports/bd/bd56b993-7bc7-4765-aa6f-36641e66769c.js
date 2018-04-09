"use strict";
cc._RF.push(module, 'bd56bmTe8dHZapvNmQeZnac', 'Star');
// scripts/Star.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0,
        game: {
            default: null,
            serializable: false
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    getPlayerDistance: function getPlayerDistance() {
        var playerPos = this.game.player.getPosition();
        // console.log(playerPos);
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },
    onPicked: function onPicked() {
        this.game.spawnNewStar();

        this.game.gainScore();

        this.node.destroy();
    },
    update: function update(dt) {
        if (this.getPlayerDistance() < this.pickRadius) {
            this.onPicked();
            return;
        }

        var opacityRatio = 1 - this.game.timer / this.game.startDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
        // console.log(this.game.starDuration);
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();