/**
 * 别踩白块儿
 * 点击 game start 开始 然后创建row row里面分4个div 可以点击。点击成功的加clickSuccess，点击失败则弹出框并且清空数据
 * 计分：num
 * row 最多出现 5个。 并且是放在数组里面保存  如果数组里面的length 大于6 可判断游戏失败
 * 数组里面push的时间是根据 定时器判断的 num的个数每隔10 可加快速度。
 *
 */

(function (win,doc) {
    function startGame() {
        this.arr = []; //展现row的储存;
        this.num = 0;//计分：num;
        this.speed = 5; //速度
        this.off = true;//  开关
        this.clickOff = true;
        this.timer = null;// 控制定时器
        this.main = doc.querySelector("#main");// 外层容器
        this.go = doc.querySelector("#go"); //开始游戏按钮
        this.speedNum = doc.querySelector(".speedNum"); //速度展现
        this.startGameFun(); //开始进程
    };
    // 开始进程
    startGame.prototype.startGameFun = function () {
        this.startFun();
    };
    startGame.prototype.startFun = function () {
        this.go.addEventListener("click", function () {
            this.speedNum.innerHTML = this.speed;
                this.setIntervalFun();
                this.addEventFun();
            this.off = true;
            this.clickOff = true;
                this.go.style.display = "none";
        }.bind(this));
    };
    startGame.prototype.nodeFun = function () {
        let randomNum = Math.floor(Math.random() * 4); //随机clickSuccess
        let html = document.createElement("div");
        html.classList.add("row");
        let htmlChildren = "";
        for (let i = 0; i < 4; i++) {
            if (i == randomNum) {
                htmlChildren += "<div class='clickSuccess'></div>";
            } else {
            htmlChildren += "<div class='clickFail'></div>";
            }
        }
        html.innerHTML = htmlChildren;
        this.arr.push(html);
        if (this.main.children.length == 0) {
            this.main.appendChild(html);
        } else {
            this.main.insertBefore(html, this.main.children[0]);
        }
        if (this.arr.length == 6) {
            let thisNode = this.main.children[this.arr.length - 1];
            for (let i = 0; i < 4; i++){
                if (thisNode.children[i].classList.contains("clickSuccess")) {
                    this.off = false;
                    this.clickOff = false;
                    clearInterval(this.timer);
                    alert(`你已超神，当前得分为：${this.num}`);
                    this.arr = [];
                    this.num = 0;
                    this.speed = 5;
                    this.main.innerHTML = "";
                    this.go.style.display = "block";
                    this.speedNum.innerHTML = "--";
                }
            }
            if (this.off) {
                this.arr.pop();
                this.main.removeChild(thisNode);
            }
        }
    };
    startGame.prototype.setIntervalFun = function () {
        this.timer = setInterval(function () {
            let top = parseInt(window.getComputedStyle(this.main, null)["top"]);
            if (top >= 0) {
                this.nodeFun();
                top = -150;
            }
            this.main.style.top = top+this.speed+"px";
        }.bind(this),20)
    };
    startGame.prototype.addEventFun = function () {
        if (this.clickOff) {
        this.main.addEventListener("click", function (e) {
            setColor(this, e);
            }.bind(this));
        }
    };
    function setColor(that, e) {
        if (e.target.className === "clickSuccess") {
            e.target.classList.remove("clickSuccess");
            e.target.style.backgroundColor = "#aaa";
            that.num++;
            if (that.num % 10 == 0) {
                that.speed+=1;
            }
            that.speedNum.innerHTML = that.speed;
        } else if(e.target.className==="clickFail") {
            clearInterval(that.timer);
            alert(`你已超神，当前得分为：${that.num}`);
            that.clickOff = false;
            that.arr = [];
            that.num = 0;
            that.speed = 5;
            that.main.innerHTML = "";
            that.go.style.display = "block";
            that.off = false;
            that.speedNum.innerHTML = "--";
        }
    };
    win.startGame = startGame;
})(window,document);
