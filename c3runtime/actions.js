"use strict";

{
	C3.Plugins.Rex_NGIO_Scoreboard.Acts =
	{		
		SetBoardID(id)
		{
			this.scoreboardID = id;
		},
		
		SetTag(tag){
			this.tag = tag;
		},
		
		GetBoards(){
			var self = this;
			var getBoards = function (result) {
				if (result["success"]) {
					self.lastBoards = [];
					var boards = result["scoreboards"], board;
					
					var i, cnt = boards.length;
					for (i = 0; i < cnt; i++) {
						board = boards[i];
						self.lastBoards.push({
							"id": board["id"],
							"name": board["name"]
						})
					}
				}
				else
					self.lastBoards = null;
			};

			var callback = this.getHandler(this, C3.Plugins.Rex_NGIO_Scoreboard.Cnds.OnGetBoardsSuccess, C3.Plugins.Rex_NGIO_Scoreboard.Cnds.OnGetBoardsError, getBoards);
			this.GetNGIO()["callComponent"]("ScoreBoard.getBoards", {}, callback);
		},
		
		PostScore(name, val, tag){
			if (val==0) return;

			var callback = this.getHandler(this, C3.Plugins.Rex_NGIO_Scoreboard.Cnds.OnPostScoreSuccess, C3.Plugins.Rex_NGIO_Scoreboard.Cnds.OnPostScoreError);
			var param = {
				//"scoreBoardName": name,
				"value": val,
				"id": this.scoreboardID,
				//"score_value": value,
				"tag": tag
			};

			if (this.tag !== "")
				param["tag"] = this.tag;
			
			this.GetNGIO().debug = this.debug;
			this.GetNGIO()["callComponent"]("ScoreBoard.postScore", param, callback);
		},
		
		SetPeriod(period) {
			if (typeof (period) === "number")
				period = this.periodCode[period];
			this.period = period;
		},
		
		RequestInRange(skip, limit) {
			this.GetScoresInRange(skip, limit);
		},
		
		RequestTurnToPage(pageIndex) {
			this.pageIndex = pageIndex;
			var skip = this.GetSkip();
			this.GetScoresInRange(skip, this.limit);
		},
		
		RequestUpdateCurrentPage() {
			var skip = this.GetSkip();
			this.GetScoresInRange(skip, this.limit);
		},
		
		RequestTurnToNextPage() {
			this.pageIndex += 1;
			var skip = this.GetSkip();
			this.GetScoresInRange(skip, this.limit);
		},
		
		RequestTurnToPreviousPage() {
			this.pageIndex -= 1;
			if (this.pageIndex < 0)
				this.pageIndex = 0;
			var skip = this.GetSkip();
			this.GetScoresInRange(skip, this.limit);
		},
		
		ShowAll() {
			this.socialUser = null;
		},
		
		ShowUser(user) {
			this.socialUser = user;  // userID or userName
		}
	};
}