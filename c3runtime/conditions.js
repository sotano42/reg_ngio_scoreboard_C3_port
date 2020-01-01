"use strict";

{
	C3.Plugins.Rex_NGIO_Scoreboard.Cnds =
	{
		OnGetBoardsSuccess()
		{
			return true;
		},
		
		OnGetBoardsError(){
			return true;
		},
		
		ForEachBoard(){
			if (!this.lastBoards)
				return false;

			const runtime = this._runtime;
			const eventSheetManager = runtime.GetEventSheetManager();
			const currentEvent = runtime.GetCurrentEvent();
			const solModifiers = currentEvent.GetSolModifiers();
			const eventStack = runtime.GetEventStack();

			// Get current stack frame and push new one
			const oldFrame = eventStack.GetCurrentStackFrame();
			const newFrame = eventStack.Push(currentEvent);

			var i, cnt = this.lastBoards.length;
			for (i = 0; i < cnt; i++) {
				
				// Push a copy of the current SOL
				eventSheetManager.PushCopySol(solModifiers);

				// Retrigger the current event, running a single loop iteration
				this.exp_LoopIndex = i;
				this.exp_CurBoard = this.lastBoards[this.exp_LoopIndex];
				/*window["lastBoards"]=this.lastBoards;
				window["curBoard"]=this.lastBoards[this.exp_LoopIndex];*/

				currentEvent.Retrigger(oldFrame, newFrame);

				// Pop the current SOL
				eventSheetManager.PopSol(solModifiers);
			}

			// Pop the event stack frame
			eventStack.Pop();

			// Return false since event already executed
			return false;
		},
		
		OnPostScoreSuccess(){
			return true;
		},
		
		OnPostScoreError(){
			return true;
		},
		
		OnGetScoresSuccess(){
			return true;
		},
		
		OnGetScoresError(){
			return true;
		},
		
		ForEachScore(start, end){
			var clamp = function (a,b,c){
				return Math.max(b,Math.min(c,a));
			};

			if (!this.lastScores)
					return false;

			var r0 = this.lastScoresStartIndex;
			var r1 = this.lastScores.length + r0;
			if (start == null)
				start = r0;
			else
				start = clamp(start, r0, r1);

			if (end == null)
				end = r1;
			else
				end = clamp(end, r0, r1);
			
			const runtime = this._runtime;
			const eventSheetManager = runtime.GetEventSheetManager();
			const currentEvent = runtime.GetCurrentEvent();
			const solModifiers = currentEvent.GetSolModifiers();
			const eventStack = runtime.GetEventStack();

			// Get current stack frame and push new one
			const oldFrame = eventStack.GetCurrentStackFrame();			
			const newFrame = eventStack.Push(currentEvent);
			
			//alert("ForEachScore "+start+" "+end);

			var i, cnt = end - start;
						
			for (i = start; i < cnt; i++) {
				
				// Push a copy of the current SOL
				eventSheetManager.PushCopySol(solModifiers);

				// Retrigger the current event, running a single loop iteration
				this.exp_LoopIndex = i - start;
				this.exp_CurScore = this.lastScores[this.exp_LoopIndex];
				console.log(JSON.stringify(this.exp_CurScore));

				currentEvent.Retrigger(oldFrame, newFrame);

				// Pop the current SOL
				eventSheetManager.PopSol(solModifiers);
			}

			// Pop the event stack frame
			eventStack.Pop();

			return false;			
		}	
	};
}