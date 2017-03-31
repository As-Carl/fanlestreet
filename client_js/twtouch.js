

	function TWTouch(_args1){
		var defalut = {
			element: null,
			toLeft: null,
			toRight: null,
			toTop: null,
			toBottom: null
		}

		this.opts = {};

		for(var key in defalut){
			if(typeof _args1 == 'object' &&  _args1[key]){
				this.opts[key] = _args1[key];
			} else{
				this.opts[key] = defalut[key];
			}
		}

		this.init();
	}



  TWTouch.prototype.init = function(_args1){
    var startX = 0;
    var startY = 0;
    document.addEventListener('touchstart', function(event){
      startX = event.touches[0].pageX;
      startY = event.touches[0].pageY;
    });

    var self = this;
    var boolR, boolL , boolB, boolT;
    document.addEventListener('touchmove', function(event){
      var x=startX - event.touches[0].pageX;
      var y=startY - event.touches[0].pageY;
        if(startX - event.touches[0].pageX < 0&&Math.abs(x) > Math.abs(y)){
          // self.toRight();
           boolR = true;
        } else if(startX - event.touches[0].pageX > 0&&Math.abs(x) > Math.abs(y)){
          // self.toLeft();
          boolL = true;
        }

        if(startY - event.touches[0].pageY < 0&&Math.abs(x) < Math.abs(y)){
          // self.toBottom();
          // console.log(startY - event.touches[0].pageY)

          boolB = true;
        } else if(startY - event.touches[0].pageY > 0&&Math.abs(x) < Math.abs(y)){
            // self.toTop();
            // console.log(startY - event.touches[0].pageY)
            boolT = true;
        }

   })
    document.addEventListener('touchend', function(event){
           if(boolT){
              self.toTop();
              boolT = false;
           }
            if(boolL){
              self.toLeft();
              boolL = false;
           }
            if(boolB){
              self.toBottom();
              boolB = false;
           }
            if(boolR){
              self.toRight();
              boolR = false;
           }
    })
  }
	TWTouch.prototype.toLeft = function(){
		if(typeof this.opts.toLeft == 'function'){
			this.opts.toLeft();
		}
	}
	TWTouch.prototype.toRight = function(_callback){
		if(typeof this.opts.toRight == 'function'){
			this.opts.toRight();
		}
	}
	TWTouch.prototype.toBottom = function(_callback){
		if(typeof this.opts.toBottom == 'function'){
			this.opts.toBottom();
		}
	}
	TWTouch.prototype.toTop = function(_callback){
		if(typeof this.opts.toTop == 'function'){
			this.opts.toTop();
		}
	}
