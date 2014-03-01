var addClass = function(el, className) {
  if (el.classList)
    el.classList.add(className);
  else
    el.className += ' ' + className;
};

var removeClass = function(el, className) {
  if (el.classList)
    el.classList.remove(className);
  else
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
};

function UUModal(options) {
  this.el = options.el;
  this.visible = false;
  this.closeBtn = this.el.querySelector('.uu-close');
  this.closeBtn.addEventListener('click', this.hide.bind(this));
  this.handlers = {
    keyup: this.keyUp.bind(this),
    click: this.documentClick.bind(this),
    touchstart: this.documentClick.bind(this),
    transitionend: this.transitionEnd.bind(this)
  }
}

UUModal.prototype.show = function() {
  removeClass(this.el, 'not-active');
  addClass(this.el, 'is-active');
  this.addOrRemoveEventHandlers('add');
};

UUModal.prototype.hide = function() {
  removeClass(this.el, 'is-active');
  addClass(this.el, 'not-active');
  this.addOrRemoveEventHandlers('remove');
  this.visible = false;
};

UUModal.prototype.addOrRemoveEventHandlers = function(action) {
  var fn = action === 'add' ? document.addEventListener : document.removeEventListener;
  for(var evtType in this.handlers) {
    var handlerFn = this.handlers[evtType];
    fn(evtType, handlerFn, false);
  }
};

UUModal.prototype.keyUp = function(event) {
  // hide if esc
  if (event.keyCode === 27) {
    this.hide();
  }
};

UUModal.prototype.documentClick = function(event) {
  if (!this.visible) return;
  //hide if clicked outside
  if (event.target !== this.el) {
    this.hide();
  }
};

UUModal.prototype.transitionEnd = function(event) {
  this.visible = !this.visible;
}

module.exports = UUModal;