"use strict";

{
	C3.Plugins.Rex_NGIO_Scoreboard.Exps =
	{
		ErrorMessage()
		{
			var val;
			if (this.lastResult && this.lastResult["error"])
				val = this.lastResult["error"]["message"];
			return(val || "");
		},
		
		BoardID() {
			return (this.scoreboardID);
		},
		
		Period(){
			return this.period;
		},
		
		Tag(){
			return this.tag;
		},
		
		PageIndex(){
			return this.pageIndex;
		},
		
		LoopIndex(){
			return this.exp_LoopIndex;
		},
		
		BoardsAsJSON(){
			var val;
			if (this.lastBoards)
				val = JSON.stringify(this.lastBoards);
			return (val || "");
		},
		
		CurBoardID(){
			var val;

			if (this.exp_CurBoard)
				val = this.exp_CurBoard["id"];
			return (val || 0);
		},
		
		CurBoardName(){
			var val;
			if (this.exp_CurBoard)
				val = this.exp_CurBoard["name"];
			return (val || "");
		},
		
		Index2BoardID(){
			var val;
			if (this.lastBoards && this.lastBoards[index])
				val = this.lastBoards[index]["id"];
			return (val || 0);
		},
		
		Index2BoardName(){
			var val;
			if (this.lastBoards && this.lastBoards[index])
				val = this.lastBoards[index]["name"];
			return(val || "");
		},
		
		BoardsCount(){
			var val;
			if (this.lastBoards)
				val = this.lastBoards.length;
			return (val || 0);
		},
		
		ScoresAsJSON(){
			var val;
			if (this.lastScores)
				val = JSON.stringify(this.lastScores);
			return (val || "");
		},
		
		CurFormattedValue(){
			var val;
			if (this.exp_CurScore)
				val = this.exp_CurScore["formatted_value"];
			return (val || "");
		},
		
		CurUserName(){
			var val;
			if (this.exp_CurScore)
				val = this.exp_CurScore["user"]["name"];
			return (val || "");
		},
		
		CurUserID(){
			var val;
			if (this.exp_CurScore)
				val = this.exp_CurScore["user"]["id"];
			return(val || 0);
		},
		
		CurValue(){
			var val;
			if (this.exp_CurScore)
				val = this.exp_CurScore["value"];
			return(val || 0);
		},
		
		IndexFormattedValue(index){
			var val;
			if (this.lastScores && this.lastScores[index])
				val = this.lastScores[index]["formatted_value"];
			return(val || "");
		},
		
		IndexUserName(index){
			var val;
			if (this.lastScores && this.lastScores[index])
				val = this.lastScores[index]["user"]["name"];
			return (val || "");
		},
		
		IndexUserID(index){
			var val;
			if (this.lastScores && this.lastScores[index])
				val = this.lastScores[index]["user"]["id"];
			return (val || 0);
		},
		
		IndexValue(index){
			var val;
			if (this.lastScores && this.lastScores[index])
				val = this.lastScores[index]["value"];
			return(val || 0);
		},
		
		CurScoresCount(){
			var val;
			if (this.lastScores)
				val = this.lastScores.length;
			return(val || 0);
		},
		
		CurStartIndex(){
			return(this.lastScoresStartIndex);
		},
		
		ScoresCount(){
			return (this.lastScoresStartIndex);
		}
	};
}