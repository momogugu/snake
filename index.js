var log = console.log.bind('console')

class Snake {
	constructor(width, height) {
		this.Grid = []
		this.foodGrid = []
		this.snakeGrid = []
		//snake 运动方向 向左x=-1，向右x=+1，向上y=-1，向下y=+1
		this.direction = {
			x: -1,
			y: 0
		}
		this.keys = {}
		this.actions = {}
		window.addEventListener('keydown', (event) => {
			// log(event.key)
			this.keys[event.key] = true
		})
		window.addEventListener('keyup', (event) => {
			this.keys[event.key] = false
		})
		this.setup()
		this.init(width, height)
	}
	static new(...args) {
		return new this(...args)
	}
	// 绘制表格
	createGrid(width, height) {
		var table = document.createElement('table')
		var tbody = document.createElement('tbody')
		for (var i = 0; i < width; i++) {
			var tr = document.createElement('tr')
			this.Grid[i] = tr
			for (var j = 0; j < height; j++) {
				var td = document.createElement('td')
				this.Grid[i][j] = td
				tr.appendChild(td)
			}
			// log(tr)
			tbody.appendChild(tr)
		}
		table.appendChild(tbody)
			// log(table)
			// log(this.Grid)
		document.body.appendChild(table)
	}
	// 绘制snake
	drawSnake() {
		var snakeGrid = this.snakeGrid;
		for (var i = 0; i < snakeGrid.length; i++) {
			var p = snakeGrid[i]
			this.Grid[p[0]][p[1]].className = 'black'
		}
		var head = snakeGrid[0]
		this.Grid[head[0]][head[1]].className = 'red'
	}
	// 绘制food
	drawFood() {
		var food = this.foodGrid
		for (var i = 0; i < food.length; i++) {
			var p = food[i]
			this.Grid[p[0]][p[1]].className = 'green'
		}
	}
	// init food
	initFood() {
		this.foodGrid.push([10, 10])
		this.drawFood()
	}
	// init snake
	initSnake() {
		this.snakeGrid.push([1,5])
		this.snakeGrid.push([1,6])
		this.snakeGrid.push([1,7])
		// log(this.snakeGrid)
		this.drawSnake()
	}
	// init
	init(width, height) {
		this.createGrid(width, height)
		this.initSnake()
		this.initFood()
		this.runloop()
	}
	// register events
	registeraction(key, callback) {
		this.actions[key] = callback
	}
	// events
	setup() {
		this.registeraction('d', this.moveRight.bind(this))
		this.registeraction('a', this.moveLeft.bind(this))
		this.registeraction('w', this.moveUp.bind(this))
		this.registeraction('s', this.moveDown.bind(this))
	}
	runloop() {
		setInterval(()=>{
			var keys = Object.keys(this.actions)
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i]
				if (this.keys[key]) {
					this.actions[key]()
				}
			}
		}, 1000/30)
	}
	// snake move
	move(x,y) {
		var snake = this.snakeGrid
		var headX = this.snakeGrid[0][1]
		var headY = this.snakeGrid[0][0]
		headX += x
		headY += y
		// log(headX, headY, x, y)
		if(this.eatFood()) {
			log('food')
		} else {
			// log('move')
			// 撞墙
			if (headX<0  || headY<0 || headX>=20 || headY>=20) {
				log('wall')
				return false
			}
			// snake body position
			for (var i = snake.length-1; i > 0; i--) {
				snake[i] = snake[i-1]
			}
			// snake head position
			snake[0] = [headY, headX]
			// log(snake)
		}
		// clear
		this.clear(['black', 'red'])
		// draw
		this.drawSnake()
	}
	moveRight() {
		if(this.direction.x == -1) return
		this.move(+1, 0)
		this.direction.x = +1
		this.direction.y = 0
	}
	moveLeft() {
		if(this.direction.x == +1) return
		this.move(-1, 0)
		this.direction.x = -1
		this.direction.y = 0
	}
	moveUp() {
		if(this.direction.y == +1) return
		this.move(0, -1)
		this.direction.x = 0
		this.direction.y = -1
	}
	moveDown() {
		if(this.direction.y == -1) return
		this.move(0, +1)
		this.direction.x = 0
		this.direction.y = +1
	}
	eatFood() {
		return false
	}
	eatSelf() {
		return false
	}
	// clear
	clear(classnames) {
		for (var i = 0; i < classnames.length; i++) {
			var classname = classnames[i]
			var e = document.querySelectorAll('.'+classname)
			for (var i = 0; i < e.length; i++) {
				// log(e[i].classList)
				e[i].classList.remove(classname)
			}
		}
	}
}

var snake = Snake.new(20, 20)
