// Js library

var Myevent = {
	/**
	* Here I define a listen event which is reusable and cross borowser efficient.
	* 'addEventListener' is a standard in the DOM level 2 and most browsers like IE8 doesn't support it.
	* 'attachEvent' is only supported by IE8
	* The last should be supported by all older browsers.
	*/
	listenEvent: function(eventTarget, eventType, eventHandler){
		/*
		The offset here is used to set if the event is bubble up or cascade-down.
		- bubble up means if the element experiancing the event is nested, the element in question will
		first react to the event before propagating it to its parent.
		- cascade-down mean the parent will first react to the event before the element in question.
		*/
		if (eventTarget.addEventListener){
			eventTarget.addEventListener(eventType, eventHandler, false);
		// 'attachEvent' doesn't have an offset to control if bubble up or cascade-down, hence it is by default
		// only supports bubble up.
		} else if (eventTarget.attachEvent){
			eventType = "on"+eventTarget;
			eventTarget.attachEvent(eventType, eventHandler);
		} else {
			eventTarget["on"+eventType] = eventHandler;
		}
	},

	stopListenEvent: function(eventTarget, eventType, eventHandler){
		if (eventTarget.removeEventListener){
			eventTarget.removeEventListener(eventType, eventHandler, false);

		} else if (eventTarget.detachEvent){
			eventType = "on"+eventTarget;
			eventTarget.detachEvent(eventType, eventHandler);
		} else {
			eventTarget["on"+eventType] = null;
		}		
	},

	cancelEvent: function(event){
		/**
		* Prevent an event from been fired. For example form submition event will be fired by default
		* when a form is submited, we could prevent that by using this reusable function
		*- It is not used to prevent user-defined event but used to prevent object default build-in events.
		*/
		if (event.preventDefault){
			event.preventDefault();
		} else{
			even.returnValue = false;
		}
	},
	objEvent: function(event){
		/**
		* In IE, event is handle by the window rather than the DOM.
		*/
		return event?event: window.event;
	},
	cancelPropagationEvent: function(event){
		/**
		* In situations where there are nested element listening to the same event, triggering the inner
		* element event will propagate to the outer element which will also trigger his own event. To prevent
		* this, we need to stop the event propagation.
		*/
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}
}