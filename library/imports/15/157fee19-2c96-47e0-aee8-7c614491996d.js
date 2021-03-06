"use strict";
cc._RF.push(module, '157fe4ZLJZH4K7ofGFEkZlt', 'Game');
// scripts/Game.js

'use strict';

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
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        maxStarDuration: 0,
        minStarDuration: 0,
        ground: {
            default: null,
            type: cc.Node
        },
        player: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.groundY = this.ground.y + this.ground.height / 2;

        this.timer = 0;
        this.startDuration = 0;

        this.spawnNewStar();

        this.score = 0;
    },
    spawnNewStar: function spawnNewStar() {
        var newStar = cc.instantiate(this.starPrefab);

        this.node.addChild(newStar);

        newStar.setPosition(this.getNewStarPosition());

        newStar.getComponent('Star').game = this;

        this.startDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },
    getNewStarPosition: function getNewStarPosition() {
        var randX = 0;

        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50;

        var maxX = this.node.width / 2;
        randX = cc.randomMinus1To1() * maxX;

        return cc.p(randX, randY);
    },
    start: function start() {},
    update: function update(dt) {
        if (this.timer > this.startDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },
    gainScore: function gainScore() {
        this.score += 1;

        this.scoreDisplay.string = 'Score: ' + this.score.toString();

        cc.audioEngine.playEffect(this.scoreAudio, false);
    },
    gameOver: function gameOver() {
        this.player.stopAllActions();
        cc.director.loadScene('game');
    }
});

cc._RF.pop();